import { HERO, LINKS } from '../../data/loan';
import { ButtonLink } from '../ui/Button';
import { ShieldCheck } from '../ui/Icons';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="loan-hero-title">
      <div className={`at-loan-container ${styles.inner}`}>
        <h1 id="loan-hero-title" className={styles.title}>
          {HERO.titleStart} <span className={styles.nowrap}>{HERO.titleLead}</span>{' '}
          <span className={styles.accent}>{HERO.titleAccent}</span>.
        </h1>
        <p className={styles.subtitle}>{HERO.subtitle}</p>

        <div className={styles.note}>
          <span className={styles.noteIcon}>
            <ShieldCheck size={20} />
          </span>
          <p>
            <strong>{HERO.noteStrong}</strong> {HERO.noteRest}
          </p>
        </div>

        <ButtonLink href={LINKS.registerInterest} className={styles.cta}>
          {HERO.cta}
        </ButtonLink>
        <p className={styles.helper}>{HERO.helper}</p>
      </div>
    </section>
  );
}
