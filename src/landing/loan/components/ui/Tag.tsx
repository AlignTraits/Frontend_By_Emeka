import styles from './Tag.module.css';

type TagProps = {
  children: React.ReactNode;
  tone?: 'neutral' | 'highlight';
};

/* Small status pill, for example "Placeholder" or "Illustrative example". */
export function Tag({ children, tone = 'neutral' }: TagProps) {
  return (
    <span className={`${styles.tag} ${tone === 'highlight' ? styles.highlight : styles.neutral}`}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
