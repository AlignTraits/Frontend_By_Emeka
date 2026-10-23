import cx from 'classnames';
import { ArrowRight, GraduationCap, Landmark, Users, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PLATFORM } from '../data/landing-content.ts';
import type { PlatformIcon } from '../data/types.ts';
import { focusDark, pageColumn } from '../lib/styles.ts';
import { SmartLink } from './ui/SmartLink.tsx';

const ICONS: Record<PlatformIcon, LucideIcon> = {
  community: Users,
  schools: GraduationCap,
  universities: Landmark,
  finances: Wallet,
};

export function PlatformCards() {
  return (
    <section aria-labelledby="platform-heading" className="bg-at-ink text-white">
      <div className={cx(pageColumn, 'pb-14 pt-14 sm:pb-16 sm:pt-16 xl:pb-[112.3px] xl:pt-[112.7px]')}>
        <div className="flex flex-col gap-4 sm:gap-6 xl:flex-row xl:items-end">
          <h2 id="platform-heading" className="font-at-head text-at-h2 font-semibold xl:flex-1">
            {PLATFORM.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[560px] text-at-body-lg text-white/70 xl:relative xl:-top-[1.25px] xl:w-[492.7px] xl:max-w-none xl:shrink-0">
            {PLATFORM.intro}
          </p>
        </div>

        <ul className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 xl:mt-[54.6px] xl:gap-y-[20.3px]">
          {PLATFORM.cards.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <li key={card.id} className="flex">
                <article className="flex w-full flex-col rounded-[20px] bg-at-panel p-6 ring-1 ring-white/10 sm:rounded-[24px] sm:p-[33px] sm:pb-[32.58px]">
                  <Icon size={24} strokeWidth={2} aria-hidden="true" className="text-at-amber" />
                  <h3 className="mt-5 font-at-head text-[24px] font-semibold leading-[1.4]">{card.title}</h3>
                  <p className="mt-[10.62px] max-w-[527px] text-[15px] leading-6 text-white/70">{card.body}</p>
                  <SmartLink
                    href={card.link.href}
                    className={cx(
                      '-mb-2.5 mt-3.5 inline-flex w-fit items-center gap-2 py-2.5 text-[14px] font-semibold leading-[21px] text-at-sky hover:text-white',
                      focusDark,
                    )}
                  >
                    {card.link.label}
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </SmartLink>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
