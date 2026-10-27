import { useId, useState } from 'react';
import { FAQ } from '../../data/loan';
import { Close, Plus } from '../ui/Icons';
import shared from './shared.module.css';
import styles from './Faq.module.css';

export function Faq() {
  /* One answer open at a time, the first one open by default */
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className={`${shared.section} ${styles.section}`} aria-labelledby="faq-title">
      <div className={`at-loan-container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 id="faq-title" className={`${shared.h2} ${styles.title}`}>
            {FAQ.title}
          </h2>
          <p className={styles.lead}>{FAQ.body}</p>
        </div>

        <div className={styles.list}>
          {FAQ.items.map((item, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={item.q} className={styles.item}>
                <h3 className={styles.question}>
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.icon} aria-hidden="true">
                      {open ? <Close size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.answer} hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
