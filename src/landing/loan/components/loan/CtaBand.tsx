import { useId, useState, type FormEvent } from 'react';
import api from '../../../../api/axios';
import { CTA } from '../../data/loan';
import buttonStyles from '../ui/Button.module.css';
import { ArrowRight } from '../ui/Icons';
import styles from './CtaBand.module.css';

type Status = 'idle' | 'sending' | 'success' | 'duplicate' | 'invalid' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Closing band with the "Register interest" form.
 * Loans are not open yet, so this collects emails on the existing AlignTraits waitlist
 * (POST /waitlist/add-waitlist). No backend change is needed.
 */
export function CtaBand() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      await api.post('/waitlist/add-waitlist', { email: value });
      setStatus('success');
      setEmail('');
    } catch (err: unknown) {
      const code = (err as { response?: { status?: number } })?.response?.status;
      setStatus(code === 409 ? 'duplicate' : 'error');
    }
  }

  const message =
    status === 'success'
      ? CTA.form.success
      : status === 'duplicate'
        ? CTA.form.duplicate
        : status === 'invalid'
          ? CTA.form.invalid
          : status === 'error'
            ? CTA.form.error
            : '';
  const isProblem = status === 'invalid' || status === 'error';
  const done = status === 'success' || status === 'duplicate';

  return (
    <section id="register-interest" className={styles.section} aria-labelledby="cta-title">
      <div className="at-loan-container">
        <div className={styles.band}>
          <div className={styles.copy}>
            <h2 id="cta-title" className={styles.title}>
              {CTA.titleStart} <span className={styles.accent}>{CTA.titleAccent}</span>.
            </h2>
            <p className={styles.note}>{CTA.note}</p>
          </div>

          <form className={styles.action} onSubmit={handleSubmit} noValidate>
            {!done && (
              <>
                <label htmlFor={inputId} className="visually-hidden">
                  {CTA.form.label}
                </label>
                <input
                  id={inputId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={CTA.form.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle' && status !== 'sending') setStatus('idle');
                  }}
                  aria-invalid={status === 'invalid'}
                  aria-describedby={messageId}
                  className={styles.input}
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`${buttonStyles.button} ${buttonStyles.gold} ${styles.submit}`}
                >
                  <span>{status === 'sending' ? 'Sending...' : CTA.button}</span>
                  <ArrowRight size={16} className={buttonStyles.arrow} />
                </button>
              </>
            )}
            <p
              id={messageId}
              role="status"
              aria-live="polite"
              className={`${styles.message} ${isProblem ? styles.messageProblem : ''} ${done ? styles.messageDone : ''}`}
            >
              {message}
            </p>
            <p className={styles.helper}>{CTA.helper}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
