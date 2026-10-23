import { UNIVERSITY_LOGOS } from '../data/landing-content.ts';

/**
 * Logo strip. The logos keep their own colours and drift from right to left at a steady pace,
 * all the time: the strip has no pause control and does not stop on hover or focus.
 *
 * As in the design, the strip is 960px wide with a soft edge on each side and a 174px step
 * between logos, so about six logos are in view on tablet and desktop. On phones the strip is
 * four logos wide. The track holds two identical copies of the set, so moving it by half its
 * width loops without a jump. Slot width comes from the strip's own width (container query
 * units), so the count in view never depends on the viewport. Visitors who ask for reduced
 * motion see the whole set as a still, wrapped row.
 */
export function LogoMarquee() {
  // 5.5172 = 960 / 174: the strip holds 5.5 slots on tablet and desktop, which is 174px at full width.
  const slot =
    'flex h-[72px] shrink-0 items-center md:h-[88px] justify-center w-[calc(min(960px,100vw-2rem)/var(--at-slots))] supports-[width:1cqw]:w-[calc(100cqw/var(--at-slots))]';

  const renderSet = (hidden: boolean) =>
    UNIVERSITY_LOGOS.map((logo) => (
      <li
        key={`${hidden ? 'copy' : 'set'}-${logo.id}`}
        className={hidden ? `${slot} motion-reduce:hidden` : slot}
        aria-hidden={hidden || undefined}
      >
        <img
          src={logo.logoSrc}
          alt={hidden ? '' : logo.name || 'University logo'}
          width={176}
          height={176}
          decoding="async"
          draggable={false}
          className="h-16 w-16 object-contain md:h-[88px] md:w-[88px]"
        />
      </li>
    ));

  return (
    <div
      role="group"
      aria-label="Universities on AlignTraits"
      className="at-fade-x mx-auto w-full max-w-[960px] overflow-hidden [--at-slots:4] [container-type:inline-size] md:[--at-slots:5.5172] motion-reduce:[-webkit-mask-image:none] motion-reduce:[mask-image:none]"
    >
      <ul className="flex w-max animate-at-marquee [--at-marquee-duration:26s] md:[--at-marquee-duration:42s] xl:[--at-marquee-duration:52s] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {renderSet(false)}
        {renderSet(true)}
      </ul>
    </div>
  );
}
