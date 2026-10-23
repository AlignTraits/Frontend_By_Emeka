import cx from 'classnames';
import { ArrowRight } from 'lucide-react';
import { parentAndStudentPhoto } from '../assets/photos/index.ts';
import { DECISION } from '../data/landing-content.ts';
import { focusLight, pageColumn } from '../lib/styles.ts';
import { SmartLink } from './ui/SmartLink.tsx';

export function DecisionSection() {
  return (
    <section aria-labelledby="decision-heading" className="bg-white">
      <div
        className={cx(
          pageColumn,
          'grid items-center gap-10 pb-14 pt-14 sm:pb-16 sm:pt-16 lg:grid-cols-2 lg:gap-16 xl:py-[112px]',
        )}
      >
        <div>
          <img
            src={parentAndStudentPhoto.src}
            srcSet={parentAndStudentPhoto.srcSet}
            sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, 100vw"
            width={parentAndStudentPhoto.width}
            height={parentAndStudentPhoto.height}
            alt={DECISION.photoAlt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[20px] rounded-tr-[64px] object-cover object-center sm:rounded-[24px] sm:rounded-tr-[96px] xl:rounded-tr-[120px]"
          />
        </div>

        <div className="xl:pt-[1.1px]">
          <h2 id="decision-heading" className="font-at-head text-at-h2 font-semibold text-at-ink">
            {DECISION.heading}
          </h2>
          <p className="mt-5 text-at-body-lg text-at-slate xl:mt-[22.7px]">{DECISION.intro}</p>

          <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:mt-[31px] xl:w-[576px]">
            {DECISION.quotes.map((item) => (
              <li key={item.quote} className="border-l-2 border-at-blue pl-5">
                <blockquote>
                  <p className="font-at-head text-[18px] font-medium leading-[25px] text-at-ink">{item.quote}</p>
                  <footer className="mt-2 text-[14px] leading-5 text-at-slate">{'— '}{item.attribution}</footer>
                </blockquote>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[15px] leading-6 text-at-slate xl:mt-[32.2px]">{DECISION.closing}</p>

          <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-at-mist p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 lg:flex-col lg:items-start xl:mt-10 xl:flex-row xl:items-center">
            <p className="text-[15px] leading-[24.375px] text-at-ink sm:flex-1 lg:flex-none xl:flex-1">
              <strong className="font-semibold">{DECISION.callout.lead}</strong>
              {DECISION.callout.body}
            </p>
            <SmartLink
              href={DECISION.callout.cta.href}
              className={cx(
                'inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-full bg-at-ink px-5 text-[14px] font-semibold leading-5 text-white transition-colors hover:bg-at-panel motion-reduce:transition-none',
                focusLight,
              )}
            >
              {DECISION.callout.cta.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
