import { STEPS } from '../../data/loan';
import shared from './shared.module.css';
import styles from './HowItWorks.module.css';

export function HowItWorks() {
  return (
    <section className={`${shared.section} ${styles.section}`} aria-labelledby="how-title">
      <div className="at-loan-container">
        <h2 id="how-title" className={shared.h2}>
          {STEPS.title}
        </h2>
        <ol className={styles.steps}>
          {STEPS.items.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.marker} aria-hidden="true">
                <span className={styles.number}>{i + 1}</span>
              </span>
              <div className={styles.body}>
                <h3 className={styles.title}>
                  <span className="visually-hidden">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className={styles.text}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
