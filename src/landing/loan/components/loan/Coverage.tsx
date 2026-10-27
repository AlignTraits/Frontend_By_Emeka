import { COVERAGE } from '../../data/loan';
import { CheckCircle, MinusCircle } from '../ui/Icons';
import shared from './shared.module.css';
import styles from './Coverage.module.css';

export function Coverage() {
  return (
    <section className={`${shared.section} ${shared.alt}`} aria-labelledby="coverage-title">
      <div className="at-loan-container">
        <h2 id="coverage-title" className={shared.h2}>
          {COVERAGE.title}
        </h2>
        <ul className={styles.grid}>
          {COVERAGE.items.map((item) => (
            <li key={item.text} className={item.covered ? styles.card : styles.cardOff}>
              <p className={item.covered ? styles.status : styles.statusOff}>
                {item.covered ? <CheckCircle size={20} /> : <MinusCircle size={20} />}
                {item.covered ? 'Covered' : 'Not covered'}
              </p>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
