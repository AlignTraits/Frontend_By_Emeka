import cx from 'classnames';
import { formatNaira, formatNairaShort } from '../lib/format.ts';
import type { MatchLevel, MatchSnapshot } from '../data/types.ts';

const TAG_STYLES: Record<MatchLevel, { pill: string; dot: string }> = {
  reach: { pill: 'bg-at-reach-bg text-at-reach-fg', dot: 'bg-at-amber' },
  realistic: { pill: 'bg-at-real-bg text-at-real-fg', dot: 'bg-at-blue' },
  safety: { pill: 'bg-at-safe-bg text-at-safe-fg', dot: 'bg-at-safe-fg' },
};

interface MatchSnapshotCardProps {
  snapshot: MatchSnapshot;
  className?: string;
}

/** The white "Your match snapshot" card in the collage. */
export function MatchSnapshotCard({ snapshot, className }: MatchSnapshotCardProps) {
  return (
    <div className={cx('rounded-[20px] bg-white px-5 pb-[10.3px] pt-[20.3px]', className)}>
      <p className="text-[12px] font-semibold leading-4 text-at-slate">{snapshot.eyebrow}</p>
      <p className="mt-[1.4px] font-at-head text-[16px] font-semibold leading-6 text-at-ink">
        {`UTME ${snapshot.utmeScore} · Budget ${formatNairaShort(snapshot.budgetPerYear)}/yr`}
      </p>

      <ul className="mt-[11.3px]">
        {snapshot.rows.map((row) => {
          const style = TAG_STYLES[row.level];
          return (
            <li key={row.course} className="border-t-2 border-at-line pb-[10.6px] pt-[12.75px]">
              <span
                className={cx(
                  'flex h-[21px] w-fit items-center gap-1.5 rounded-full px-2 text-[11px] font-semibold leading-none',
                  style.pill,
                )}
              >
                <span aria-hidden="true" className={cx('h-1.5 w-1.5 rounded-full', style.dot)} />
                {row.tag}
              </span>
              <p className="mt-[1.85px] text-[13px] font-semibold leading-5 text-at-ink">{row.course}</p>
              <p className="mt-[0.7px] text-[12px] leading-4 text-at-slate">
                {`${formatNaira(row.feePerYear)}/yr · within budget`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
