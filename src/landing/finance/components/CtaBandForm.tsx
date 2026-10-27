import { useId, useState, type FormEvent } from 'react';
import api from '../../../api/axios';
import styles from '../../loan/components/loan/CtaBand.module.css';
import buttonStyles from '../../loan/components/ui/Button.module.css';
import { ArrowRight } from '../../loan/components/ui/Icons';

type Status = 'idle' | 'sending' | 'success' | 'duplicate' | 'invalid' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface CtaFormContent {
  titleStart: string;
  titleAccent: string;
  note?: string;
  button: string;
  helper: string;
  form: {
    label: string;
    placeholder: string;
    invalid: string;
    success: string;
    duplicate: string;
    error: string;
  };
}

/**
 * Closing band with a "Register interest" email form.
 * It saves the email on the existing AlignTraits waitlist (POST /waitlist/add-waitlist),
 * so no backend change is needed. The section id is "register-interest", so any button
 * with href="#register-interest" scrolls here.
 */
export function CtaBandForm({ content }: { content: CtaFormContent }) {
  const inputId = useId();
  const messageId = useId();
  const titleId = useId();
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

  const { form } = content;
  const message =
    status === 'success'
      ? form.success
      : status === 'duplicate'
        ? form.duplicate
        : status === 'invalid'
          ? form.invalid
          : status === 'error'
            ? form.error
            : '';
  const isProblem = status === 'invalid' || status === 'error';
  const done = status === 'success' || status === 'duplicate';

  return (
    <section id="register-interest" className={styles.section} aria-labelledby={titleId}>
      <div className="at-loan-container">
        <div className={styles.band}>
          <div className={styles.copy}>
            <h2 id={titleId} className={styles.title}>
              {content.titleStart} <span className={styles.accent}>{content.titleAccent}</span>.
            </h2>
            {content.note && <p className={styles.note}>{content.note}</p>}
          </div>

          <form className={styles.action} onSubmit={handleSubmit} noValidate>
            {!done && (
              <>
                <label htmlFor={inputId} className="visually-hidden">
                  {form.label}
                </label>
                <input
                  id={inputId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={form.placeholder}
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
                  <span>{status === 'sending' ? 'Sending...' : content.button}</span>
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
            <p className={styles.helper}>{content.helper}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
