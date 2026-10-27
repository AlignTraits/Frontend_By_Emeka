import type { ReactNode } from 'react';
import { SmartLink } from '../../../components/ui/SmartLink';
import { ArrowRight } from './Icons';
import styles from './Button.module.css';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'gold';
  arrow?: boolean;
  className?: string;
};

/** In-app paths ("/...") move with react-router, without reloading the page. */
export function ButtonLink({ href, children, variant = 'primary', arrow = true, className }: ButtonProps) {
  return (
    <SmartLink href={href} className={`${styles.button} ${styles[variant]} ${className ?? ''}`}>
      <span>{children}</span>
      {arrow && <ArrowRight size={16} className={styles.arrow} />}
    </SmartLink>
  );
}
