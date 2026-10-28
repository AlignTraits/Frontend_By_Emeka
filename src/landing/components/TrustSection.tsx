import cx from 'classnames';
import { TRUST } from '../data/landing-content.ts';
import { TrustCollage } from './TrustCollage.tsx';

/**
 * Bottom padding of each row on a wide screen. The design's third and fifth rows are about 1px
 * taller than their text needs, which puts the rows below them a pixel lower; the rest share one value.
 */
const ROW_PB_XL = ['xl:pb-[23.7px]', 'xl:pb-[23.7px]', 'xl:pb-[24.7px]', 'xl:pb-[23.7px]', 'xl:pb-[24.6px]'];

export function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="bg-white">
      <div
        className={cx(
          'mx-auto w-full max-w-[1294.7px] px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 min-[1360px]:px-0',
          'xl:pb-[112px] xl:pt-[8.9px]',
        )}
      >
        <div className="grid items-start gap-12 xl:grid-cols-[1.161fr_1fr] xl:gap-x-6">
          <div className="xl:pt-[1.5px]">
            <h2 id="trust-heading" className="font-at-head text-at-h2 font-semibold text-at-ink">
              {TRUST.heading}
            </h2>

            <ul className="mt-8 border-b-2 border-at-line xl:mt-[37.5px]">
              {TRUST.rows.map((row, index) => (
                <li
                  key={row.id}
                  className={cx(
                    'grid gap-x-8 gap-y-2 border-t-2 border-at-line py-6 sm:grid-cols-[240px_minmax(0,1fr)] xl:pt-[22.9px]',
                    ROW_PB_XL[index] ?? ROW_PB_XL[0],
                  )}
                >
                  <h3 className="font-at-head text-[18px] font-semibold leading-[25px] text-at-ink">{row.title}</h3>
                  <p className="max-w-[398px] text-[15px] leading-6 text-at-slate xl:pt-px">{row.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <TrustCollage />
        </div>
      </div>
    </section>
  );
}
