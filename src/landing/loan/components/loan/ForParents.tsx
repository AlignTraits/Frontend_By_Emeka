import parents720jpg from '../../assets/parents-720.jpg';
import parents720webp from '../../assets/parents-720.webp';
import parents1200jpg from '../../assets/parents-1200.jpg';
import parents1200webp from '../../assets/parents-1200.webp';
import { PARENTS } from '../../data/loan';
import shared from './shared.module.css';
import styles from './ForParents.module.css';

export function ForParents() {
  return (
    <section className={`${shared.section} ${styles.section}`} aria-labelledby="parents-title">
      <div className="at-loan-container">
        <div className={styles.card}>
          <picture className={styles.media}>
            <source type="image/webp" srcSet={`${parents720webp} 720w, ${parents1200webp} 1200w`} sizes="(max-width: 1023px) 100vw, 504px" />
            <img
              src={parents1200jpg}
              srcSet={`${parents720jpg} 720w, ${parents1200jpg} 1200w`}
              sizes="(max-width: 1023px) 100vw, 504px"
              alt={PARENTS.imageAlt}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className={styles.copy}>
            <h2 id="parents-title" className={`${shared.h2} ${styles.title}`}>
              {PARENTS.title}
            </h2>
            <p className={styles.text}>{PARENTS.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
