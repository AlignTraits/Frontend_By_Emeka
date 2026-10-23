import cx from 'classnames';
import {
  HERO,
  HERO_VIDEO,
  LOGO_STRIP_CAPTION,
} from '../data/landing-content.ts';
import { focusLight, pageColumn } from '../lib/styles.ts';
import { HeroVideo } from './HeroVideo.tsx';
import { LogoMarquee } from './LogoMarquee.tsx';
import { SmartLink } from './ui/SmartLink.tsx';

/**
 * Spacing of the four trust points on a wide screen, measured from the design: the first row is
 * not centred (it sits 36px right of centre, with a tighter first dot) and the dots are not
 * evenly spaced. Below `xl` the points simply wrap, centred, with even gaps.
 */
const TRUST_ITEM_XL = [
  { item: 'xl:ml-[71.3px]', gap: 'xl:gap-[6.3px]', dot: 'xl:mt-[8.5px]' },
  { item: 'xl:ml-[14.4px]', gap: 'xl:gap-[12.1px]', dot: 'xl:mt-[11.5px]' },
  { item: 'xl:ml-[12.1px]', gap: 'xl:gap-[11.5px]', dot: 'xl:mt-[11.5px]' },
  { item: '', gap: 'xl:gap-[13px]', dot: 'xl:mt-[11.5px]' },
] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-white">
      <div className={cx(pageColumn, 'flex flex-col items-center pb-10 pt-9 text-center sm:pt-12 xl:pb-[53px] xl:pt-[90px]')}>
        <h1
          id="hero-heading"
          className="at-balance font-at-head text-at-h1 font-medium text-at-navy"
        >
          {HERO.headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-3xl text-at-lead text-at-warm sm:mt-7 xl:mt-[29.2px]">{HERO.lead}</p>

        <SmartLink
          href={HERO.cta.href}
          className={cx(
            'mt-7 inline-flex h-[50px] items-center justify-center rounded-lg bg-at-navy px-6 text-[17px] font-semibold leading-6 text-white transition-colors hover:bg-[#00336a] motion-reduce:transition-none sm:mt-9',
            focusLight,
          )}
        >
          {HERO.cta.label}
        </SmartLink>

        <p className="mt-3 text-[14px] leading-5 text-at-warm">{HERO.microcopy}</p>

        <ul className="mt-6 flex max-w-3xl flex-wrap justify-center gap-x-[14px] text-[13px] leading-[23.4px] text-at-warm sm:mt-7 xl:mt-[29px] xl:gap-x-0">
          {HERO.trustItems.map((item, index) => {
            const xl = TRUST_ITEM_XL[index] ?? TRUST_ITEM_XL[1];
            return (
              <li key={item} className={cx('flex items-center gap-3 xl:items-start', xl.item, xl.gap)}>
                <span aria-hidden="true" className={cx('h-1 w-1 shrink-0 rounded-full bg-at-gold', xl.dot)} />
                {item}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 w-full max-w-at-hero sm:mt-12 xl:mt-[47.2px]">
          <HeroVideo config={HERO_VIDEO} />
        </div>

        {/* On a wide screen the design sets this line 19px right of centre. */}
        <p className="mt-9 font-at-caption text-[16.5px] leading-6 text-at-caption sm:mt-14 xl:ml-[37.8px] xl:mt-[56.8px]">
          {LOGO_STRIP_CAPTION}
        </p>

        <div className="mt-5 w-full sm:mt-7 xl:mt-[31.5px]">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
