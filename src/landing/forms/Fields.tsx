/*
  Form fields for the website forms (ambassador application and pilot request).
  Native inputs underneath, so they work with keyboards, screen readers and autofill.
*/
import { Check } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import s from './form.module.css';

interface FieldShell {
  label: ReactNode;
  help?: ReactNode;
  error?: string;
  optional?: boolean;
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={id} className={s.error}>
      {error}
    </p>
  ) : null;
}

export function TextField({
  name,
  label,
  help,
  error,
  optional,
  value,
  onChange,
  type = 'text',
  autoComplete,
  placeholder,
  inputMode,
  maxLength = 160,
}: FieldShell & {
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'email';
  autoComplete?: string;
  placeholder?: string;
  inputMode?: 'text' | 'email';
  maxLength?: number;
}) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
        {optional && <span className={s.optional}> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={s.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={[help ? helpId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined}
      />
      {help && (
        <p id={helpId} className={s.help}>
          {help}
        </p>
      )}
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

export function PhoneField({
  name,
  label,
  help,
  error,
  value,
  onChange,
  autoComplete = 'tel-national',
  placeholder = '801 234 5678',
}: FieldShell & { name: string; value: string; onChange: (v: string) => void; autoComplete?: string; placeholder?: string }) {
  const id = useId();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={s.phone}>
        <span className={s.cc} aria-hidden="true">
          +234
        </span>
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          className={s.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={20}
          aria-invalid={error ? true : undefined}
          aria-describedby={[help ? helpId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined}
        />
      </div>
      {help && (
        <p id={helpId} className={s.help}>
          {help}
        </p>
      )}
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  error,
  value,
  onChange,
  options,
  placeholder = 'Choose one',
}: FieldShell & { name: string; value: string; onChange: (v: string) => void; options: readonly string[]; placeholder?: string }) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`${s.input} ${s.select} ${value ? '' : s.placeholder}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

/** One-tap choices. Radio buttons for a single answer, checkboxes for several. */
export function Choices({
  name,
  label,
  help,
  error,
  options,
  value,
  onChange,
  multiple = false,
  columns,
}: FieldShell & {
  name: string;
  options: readonly { value: string; label: string }[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multiple?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const chosen = (v: string) => (multiple ? (value as string[]).includes(v) : value === v);
  const toggle = (v: string) => {
    if (!multiple) return onChange(v);
    const list = value as string[];
    onChange(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };
  return (
    <fieldset
      className={s.field}
      aria-invalid={error ? true : undefined}
      aria-describedby={[help ? helpId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined}
    >
      <legend className={s.label}>{label}</legend>
      {help && (
        <p id={helpId} className={s.helpAbove}>
          {help}
        </p>
      )}
      <div className={`${s.chips} ${columns ? s[`cols${columns}`] : ''}`}>
        {options.map((o) => (
          <label key={o.value} className={`${s.chip} ${chosen(o.value) ? s.chipOn : ''}`}>
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={o.value}
              checked={chosen(o.value)}
              onChange={() => toggle(o.value)}
              className={s.chipInput}
            />
            {chosen(o.value) && <Check size={16} strokeWidth={2.6} aria-hidden="true" />}
            {o.label}
          </label>
        ))}
      </div>
      <ErrorText id={errorId} error={error} />
    </fieldset>
  );
}

export function TextArea({
  name,
  label,
  error,
  optional,
  value,
  onChange,
  max,
  placeholder,
}: FieldShell & { name: string; value: string; onChange: (v: string) => void; max: number; placeholder?: string }) {
  const id = useId();
  const errorId = `${id}-error`;
  const countId = `${id}-count`;
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
        {optional && <span className={s.optional}> (optional)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        className={`${s.input} ${s.textarea}`}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        maxLength={max}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${countId}${error ? ` ${errorId}` : ''}`}
      />
      <p id={countId} className={s.help}>
        Up to {max} characters. <span className={s.count}>{value.length} / {max}</span>
      </p>
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

export function Confirm({
  name,
  checked,
  onChange,
  error,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={s.confirm}>
      <label htmlFor={id} className={s.check}>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={s.checkInput}
        />
        <span className={s.box} aria-hidden="true">
          {checked && <Check size={15} strokeWidth={3} />}
        </span>
        <span>{children}</span>
      </label>
      <ErrorText id={errorId} error={error} />
    </div>
  );
}
