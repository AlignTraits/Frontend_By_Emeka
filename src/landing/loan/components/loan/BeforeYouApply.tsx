import { PREPARE } from '../../data/loan';
import { Check } from '../ui/Icons';
import { Tag } from '../ui/Tag';
import shared from './shared.module.css';
import styles from './BeforeYouApply.module.css';

export function BeforeYouApply() {
  return (
    <section className={`${shared.section} ${shared.alt} ${styles.section}`} aria-labelledby="prepare-title">
      <div className={`at-loan-container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="prepare-title" className={shared.h2}>
            {PREPARE.title}
          </h2>
          <p className={shared.lead}>{PREPARE.body}</p>
        </div>

        <div className={`${shared.card} ${styles.card}`}>
          <div className={`${shared.cardHeader} ${styles.header}`}>
            <h3 className={shared.cardTitle}>{PREPARE.cardTitle}</h3>
            <Tag>{PREPARE.tag}</Tag>
          </div>
          <ul className={styles.list}>
            {PREPARE.items.map((item) => (
              <li key={item} className={styles.item}>
                <span className={styles.box} aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
