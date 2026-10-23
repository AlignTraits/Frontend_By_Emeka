import cx from 'classnames';
import { schoolLeaverPhoto, studentAtDeskPhoto } from '../assets/photos/index.ts';
import { TRUST } from '../data/landing-content.ts';
import { MatchSnapshotCard } from './MatchSnapshotCard.tsx';

/**
 * The navy collage: two photos, the match snapshot card and a pill. At 640px and wider the
 * photos and card hang below the navy panel exactly as in the design (the panel stops 139px
 * short of the bottom); on phones the pieces stack inside the panel instead.
 */
export function TrustCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[588px] xl:mx-0">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[24px] bg-at-panel ring-1 ring-white/10 sm:bottom-[139.2px] sm:rounded-[28px]"
      />

      <div className="relative grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:px-[21px] sm:pb-0 sm:pt-[21px]">
        {/* Girl: tall photo on the left. */}
        <div className="relative order-1 h-[240px] overflow-hidden rounded-[16px] rounded-br-[56px] sm:order-none sm:row-span-2 sm:mt-[98px] sm:h-auto sm:rounded-[20px] sm:rounded-br-[96px]">
          <img
            src={schoolLeaverPhoto.src}
            srcSet={schoolLeaverPhoto.srcSet}
            sizes="(min-width: 1280px) 265px, 45vw"
            width={schoolLeaverPhoto.width}
            height={schoolLeaverPhoto.height}
            alt={TRUST.photos.leaverAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Boy: shorter photo, top right. */}
        <div className="relative order-2 h-[240px] overflow-hidden rounded-[16px] rounded-bl-[56px] sm:order-none sm:h-[322px] sm:rounded-[20px] sm:rounded-bl-[80px]">
          <img
            src={studentAtDeskPhoto.src}
            srcSet={studentAtDeskPhoto.srcSet}
            sizes="(min-width: 1280px) 265px, 45vw"
            width={studentAtDeskPhoto.width}
            height={studentAtDeskPhoto.height}
            alt={TRUST.photos.studentAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>

        <MatchSnapshotCard snapshot={TRUST.snapshot} className="order-4 col-span-2 sm:order-none sm:col-span-1" />

        {/* Pill: over the lower half of the girl photo on wide layouts, centred between photos and card on phones. */}
        <p
          className={cx(
            'order-3 -my-1 inline-flex h-[38px] items-center gap-2 whitespace-nowrap rounded-full bg-at-badge px-[17px] text-[14px] font-medium leading-5 text-white ring-1 ring-white/15',
            'col-span-2 justify-self-center sm:absolute sm:bottom-[124.2px] sm:left-[25px] sm:order-none sm:col-span-1 sm:my-0 sm:justify-self-auto',
          )}
        >
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-at-success" />
          {TRUST.badge}
        </p>
      </div>
    </div>
  );
}
