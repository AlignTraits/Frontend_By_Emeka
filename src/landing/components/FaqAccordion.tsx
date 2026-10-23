import cx from 'classnames';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { FAQ } from '../data/landing-content.ts';
import { focusLight, pageColumn } from '../lib/styles.ts';

/**
 * Accordion. The first answer starts open, as in the design. Each question is a real button
 * (Enter and Space work) that controls its answer region; several can be open at once.
 */
export function FaqAccordion() {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set([FAQ.items[0].id]));

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-white">
      <div
        className={cx(
          pageColumn,
          'grid gap-8 pb-14 pt-14 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_2fr] lg:gap-x-8 xl:pb-[112px] xl:pt-[111px]',
        )}
      >
        <div className="xl:pt-[2.1px]">
          <h2 id="faq-heading" className="font-at-head text-at-h2 font-semibold text-at-ink">
            {FAQ.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-[360px] text-[16px] leading-6 text-at-slate xl:mt-[19px]">{FAQ.intro}</p>
        </div>

        <ul className="border-b-2 border-at-line">
          {FAQ.items.map((item) => {
            const open = openIds.has(item.id);
            const buttonId = `${baseId}-q-${item.id}`;
            const panelId = `${baseId}-a-${item.id}`;
            return (
              <li key={item.id} className="border-t-2 border-at-line xl:last:pb-px">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className={cx(
                      'flex w-full items-center justify-between gap-6 rounded-md py-6 text-left font-at-head text-[18px] font-semibold leading-[27px] text-at-ink',
                      focusLight,
                    )}
                  >
                    <span>{item.question}</span>
                    <Plus
                      size={20}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={cx(
                        'shrink-0 text-at-blue transition-transform duration-200 motion-reduce:transition-none',
                        open && 'rotate-45',
                      )}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p className="max-w-[672px] pb-6 pt-[0.9px] text-[15px] leading-6 text-at-slate">{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
