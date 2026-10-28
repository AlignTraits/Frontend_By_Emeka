import { ArrowRight, Check, CircleCheck } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { ROUTES } from '../../data/routes';
import { SmartLink } from '../../components/ui/SmartLink';
import { PageShell } from '../../finance/components/PageShell';
import { Choices, Confirm, PhoneField, SelectField, TextArea, TextField } from '../../forms/Fields';
import { NIGERIAN_STATES, WHATSAPP_HELP, greetingName, isNigerianPhone } from '../../forms/nigeria';
import { focusFirstProblem, submitForm } from '../../forms/submit';
import s from '../../forms/form.module.css';

const PAGE_META = {
  title: 'Become an ambassador | AlignTraits',
  description: 'Represent AlignTraits at your school. Free to join. If you are under 18, a parent or guardian must agree first.',
} as const;

const AGE = [
  { value: '18_or_older', label: '18 or older' },
  { value: 'under_18', label: 'Under 18' },
];

const CLASSES = [
  { value: 'SS1', label: 'SS1' },
  { value: 'SS2', label: 'SS2' },
  { value: 'SS3', label: 'SS3' },
  { value: 'Finished', label: 'Finished' },
];

const REASON_MAX = 300;

type Values = {
  fullName: string;
  ageGroup: string;
  guardianName: string;
  guardianPhone: string;
  school: string;
  classLevel: string;
  state: string;
  whatsapp: string;
  reason: string;
  confirmed: boolean;
  website: string;
};

const EMPTY: Values = {
  fullName: '',
  ageGroup: '',
  guardianName: '',
  guardianPhone: '',
  school: '',
  classLevel: '',
  state: '',
  whatsapp: '',
  reason: '',
  confirmed: false,
  website: '',
};

function check(v: Values): Record<string, string> {
  const e: Record<string, string> = {};
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
  if (!v.ageGroup) e.ageGroup = 'Tell us if you are 18 or older.';
  if (v.ageGroup === 'under_18') {
    if (!v.guardianName.trim()) e.guardianName = 'Enter your parent or guardian’s name.';
    if (!isNigerianPhone(v.guardianPhone)) e.guardianPhone = 'Enter your parent or guardian’s phone number.';
  }
  if (!v.school.trim()) e.school = 'Enter your school.';
  if (!v.classLevel) e.classLevel = 'Choose your class.';
  if (!v.state) e.state = 'Choose your state.';
  if (!isNigerianPhone(v.whatsapp)) e.whatsapp = 'Enter a Nigerian WhatsApp number, for example 0801 234 5678.';
  if (!v.reason.trim()) e.reason = 'Tell us why you want to be an ambassador.';
  if (!v.confirmed) e.confirmed = 'Please confirm the details are true.';
  return e;
}

/** Community > Become an ambassador, at /community/ambassadors */
export function AmbassadorPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'busy' | 'failed'>('idle');
  const [sentAs, setSentAs] = useState<{ name: string; under18: boolean } | null>(null);

  const set = <K extends keyof Values>(key: K) => (value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = check(values);
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      focusFirstProblem(formRef.current);
      return;
    }
    setStatus('sending');
    const under18 = values.ageGroup === 'under_18';
    const result = await submitForm('/forms/ambassador', {
      ...values,
      guardianName: under18 ? values.guardianName : undefined,
      guardianPhone: under18 ? values.guardianPhone : undefined,
    });
    if (result.ok) {
      setSentAs({ name: greetingName(values.fullName), under18 });
      setValues(EMPTY);
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (result.kind === 'fields') {
      setErrors(result.errors);
      setStatus('idle');
      focusFirstProblem(formRef.current);
      return;
    }
    setStatus(result.kind);
  }

  return (
    <PageShell meta={PAGE_META}>
      <section className={s.page} aria-labelledby="ambassador-title">
        <div className="at-loan-container">
          <div className={s.head}>
            <span className={s.eyebrow}>AlignTraits Ambassadors</span>
            <h1 id="ambassador-title" className={s.title}>
              Represent AlignTraits <span className={s.accent}>at your school.</span>
            </h1>
            <p className={s.sub}>Tell us a little about you. It takes about two minutes.</p>
            <ul className={s.trust}>
              {['Free to join', 'We reply on WhatsApp', 'Consent first if you are under 18'].map((t) => (
                <li key={t}>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.card}>
            {status === 'done' && sentAs ? (
              <div className={s.done} role="status">
                <span className={s.doneIcon} aria-hidden="true">
                  <CircleCheck size={32} />
                </span>
                <h2 className={s.doneTitle}>Thank you, {sentAs.name}.</h2>
                <p className={s.doneText}>We have your application. We will message you on WhatsApp.</p>
                {sentAs.under18 && (
                  <p className={s.doneNext}>
                    Because you are under 18, we will call your parent or guardian to ask for their consent before you start.
                  </p>
                )}
                <SmartLink href={ROUTES.community} className={s.doneLink}>
                  Back to the Community
                  <ArrowRight size={16} />
                </SmartLink>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Ambassador application">
                <TextField name="fullName" label="Your full name" value={values.fullName} onChange={set('fullName')} autoComplete="name" error={errors.fullName} maxLength={120} />

                <Choices
                  name="ageGroup"
                  label="How old are you?"
                  options={AGE}
                  value={values.ageGroup}
                  onChange={(v) => set('ageGroup')(v as string)}
                  columns={2}
                  error={errors.ageGroup}
                />
                {values.ageGroup === 'under_18' && (
                  <div className={s.reveal}>
                    <p className={s.revealTitle}>Your parent or guardian</p>
                    <p className={s.revealLead}>We will call them to ask for consent before you start.</p>
                    <div className={s.row}>
                      <TextField name="guardianName" label="Their name" value={values.guardianName} onChange={set('guardianName')} autoComplete="off" error={errors.guardianName} maxLength={120} />
                      <PhoneField name="guardianPhone" label="Their phone number" value={values.guardianPhone} onChange={set('guardianPhone')} autoComplete="off" error={errors.guardianPhone} />
                    </div>
                  </div>
                )}

                <TextField name="school" label="Your school" placeholder="For example, Queen’s College, Yaba" value={values.school} onChange={set('school')} error={errors.school} />

                <Choices
                  name="classLevel"
                  label="Your class"
                  options={CLASSES}
                  value={values.classLevel}
                  onChange={(v) => set('classLevel')(v as string)}
                  columns={4}
                  error={errors.classLevel}
                />

                <div className={s.row}>
                  <SelectField name="state" label="State" placeholder="Choose your state" options={NIGERIAN_STATES} value={values.state} onChange={set('state')} error={errors.state} />
                  <PhoneField name="whatsapp" label="WhatsApp number" value={values.whatsapp} onChange={set('whatsapp')} error={errors.whatsapp} />
                </div>

                <TextArea
                  name="reason"
                  label="Why do you want to be an ambassador?"
                  placeholder="One or two sentences is enough."
                  value={values.reason}
                  onChange={set('reason')}
                  max={REASON_MAX}
                  error={errors.reason}
                />

                <div className={s.trap} aria-hidden="true">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website')(e.target.value)} />
                  </label>
                </div>

                <Confirm name="confirmed" checked={values.confirmed} onChange={set('confirmed')} error={errors.confirmed}>
                  The details above are true. If I am under 18, I understand a parent or guardian must agree.
                </Confirm>
                <p className={s.privacy}>
                  We only use your details to review your application and contact you.{' '}
                  <SmartLink href="/privacy-policy">Privacy policy</SmartLink>
                </p>

                <button type="submit" className={s.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send my application'}
                  {status !== 'sending' && <ArrowRight size={16} aria-hidden="true" />}
                </button>

                {(status === 'busy' || status === 'failed') && (
                  <p className={s.formProblem} role="alert">
                    {status === 'busy'
                      ? 'Too many tries from this connection. Please wait a few minutes and try again.'
                      : 'We could not send your application. Check your connection and try again, or '}
                    {status === 'failed' && (
                      <a href={WHATSAPP_HELP} target="_blank" rel="noopener noreferrer">
                        message us on WhatsApp
                      </a>
                    )}
                    {status === 'failed' && '.'}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default AmbassadorPage;
