import { PARTNER, WHO_PROVIDES } from '../../data/loan';
import { Tag } from '../ui/Tag';
import shared from './shared.module.css';
import styles from './WhoProvides.module.css';

export function WhoProvides() {
  return (
    <section className={`${shared.section} ${styles.section}`} aria-labelledby="who-provides-title">
      <div className={`at-loan-container ${shared.split}`}>
        <div className={styles.copy}>
          <h2 id="who-provides-title" className={shared.h2}>
            {WHO_PROVIDES.title}
          </h2>
          <p className={shared.lead}>{WHO_PROVIDES.body}</p>
        </div>

        <div className={`${shared.card} ${styles.card}`}>
          <div className={`${shared.cardHeader} ${styles.header}`}>
            <h3 className={shared.cardTitle}>{PARTNER.title}</h3>
            <Tag>Placeholder</Tag>
          </div>
          <dl className={styles.fields}>
            {PARTNER.fields.map((field) => (
              <div key={field.label} className={styles.field}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
