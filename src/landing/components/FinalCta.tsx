import cx from 'classnames';
import { ArrowRight } from 'lucide-react';
import { FINAL_CTA } from '../data/landing-content.ts';
import { focusDark } from '../lib/styles.ts';
import { SmartLink } from './ui/SmartLink.tsx';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 pb-14 sm:px-6 lg:px-8 min-[1360px]:px-0 xl:pb-[95px]">
        <div className="flex flex-col gap-10 rounded-[24px] bg-at-ink px-6 py-12 sm:px-10 sm:py-16 xl:flex-row xl:items-end xl:justify-between xl:rounded-[32px] xl:px-14 xl:pb-[78.8px] xl:pt-[81.2px]">
          <div>
            <h2
              id="final-cta-heading"
              className="max-w-[720px] font-at-head text-at-h2-cta font-semibold text-white"
            >
              {FINAL_CTA.headingLead}
              <span className="text-at-sky">{FINAL_CTA.headingHighlight}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-[26px] text-white/70 sm:mt-6 sm:text-[18px] sm:leading-7">
              {FINAL_CTA.intro}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-center xl:mb-[1.2px] xl:mr-[61.3px]">
            <SmartLink
              href={FINAL_CTA.cta.href}
              className={cx(
                'inline-flex h-[55px] w-full items-center rounded-full bg-at-amber pl-[29.2px] text-[15px] font-semibold leading-6 text-at-ink transition-colors hover:bg-[#ffb73d] motion-reduce:transition-none sm:w-[240px]',
                focusDark,
              )}
            >
              {FINAL_CTA.cta.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-4" />
            </SmartLink>
            <p className="mt-3 text-[14px] leading-5 text-white/55">{FINAL_CTA.microcopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
