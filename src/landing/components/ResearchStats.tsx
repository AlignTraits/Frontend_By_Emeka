import cx from 'classnames';
import { RESEARCH } from '../data/landing-content.ts';
import { pageColumn } from '../lib/styles.ts';

export function ResearchStats() {
  return (
    <section aria-labelledby="research-heading" className="bg-at-ink text-white">
      <div className={cx(pageColumn, 'pb-14 pt-14 sm:pb-16 sm:pt-16 xl:pb-[110.7px] xl:pt-[112.4px]')}>
        <h2 id="research-heading" className="font-at-head text-at-h2-stats font-medium">
          {RESEARCH.heading}
        </h2>
        <p className="mt-6 max-w-3xl text-at-stat-intro text-white/70 sm:mt-8 xl:mt-14">{RESEARCH.intro}</p>

        <dl className="mt-12 grid gap-10 sm:mt-14 xl:mt-[99px] xl:grid-cols-[1.4fr_1fr_1fr] xl:gap-x-[59.6px]">
          {RESEARCH.stats.map((stat, index) => (
            <div key={stat.id} className="border-t-[2.5px] border-white/20 pt-6 xl:pt-[29.6px]">
              <dt
                className={cx(
                  'font-at-head font-normal',
                  index === 0 ? 'text-at-stat-xl text-at-gold' : 'text-at-stat-lg text-white',
                )}
              >
                {stat.figure}
              </dt>
              <dd
                className={cx(
                  'mt-4 xl:mt-[21.3px]',
                  index === 0 ? 'text-at-stat-text-xl text-white' : 'text-at-stat-text text-white/75',
                )}
              >
                {stat.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
