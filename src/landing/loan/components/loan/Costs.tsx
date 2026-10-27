import { COSTS } from '../../data/loan';
import { Tag } from '../ui/Tag';
import shared from './shared.module.css';
import styles from './Costs.module.css';

export function Costs() {
  return (
    <section className={`${shared.section} ${styles.section}`} aria-labelledby="costs-title">
      <div className={`at-loan-container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="costs-title" className={`${shared.h2} ${styles.title}`}>
            {COSTS.title}
          </h2>
          <p className={styles.lead}>{COSTS.body}</p>
        </div>

        <div className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={`${shared.cardHeader} ${styles.header}`}>
              <h3 className={`${shared.cardTitle} ${styles.cardTitle}`}>{COSTS.cardTitle}</h3>
              <Tag tone="highlight">Illustrative example</Tag>
            </div>
            <dl className={styles.rows}>
              {COSTS.rows.map((row) => (
                <div key={row.label} className={styles.row}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className={styles.footnote}>{COSTS.footnote}</p>
        </div>
      </div>
    </section>
  );
}
