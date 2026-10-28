import { ArrowRight, Check, CircleCheck, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../data/routes';
import { SmartLink } from '../../components/ui/SmartLink';
import { PageShell } from '../../finance/components/PageShell';
import { Choices, Confirm, PhoneField, SelectField, TextArea, TextField } from '../../forms/Fields';
import { EMAIL_PATTERN, NIGERIAN_STATES, WHATSAPP_HELP, greetingName, isNigerianPhone } from '../../forms/nigeria';
import { focusFirstProblem, submitForm } from '../../forms/submit';
import s from '../../forms/form.module.css';

const PAGE_META = {
  title: 'Request a pilot | AlignTraits',
  description:
    'Test AlignTraits with real students before you commit. A pilot is a small trial with one class or one programme. We reply within two working days.',
} as const;

type InstitutionType = 'secondary_school' | 'tutorial_centre' | 'university' | 'other';

const TYPES: { value: InstitutionType; label: string }[] = [
  { value: 'secondary_school', label: 'Secondary school' },
  { value: 'tutorial_centre', label: 'Tutorial centre' },
  { value: 'university', label: 'University' },
  { value: 'other', label: 'Other' },
];

/* The ?type= value on links from the Schools, Universities and Tutorial centres pages. */
const FROM_LINK: Record<string, InstitutionType> = {
  school: 'secondary_school',
  tutorial: 'tutorial_centre',
  university: 'university',
};

/* The questions change with the type of institution. */
const BY_TYPE: Record<InstitutionType, { roles: string[]; participants: string[]; countLabel: string }> = {
  secondary_school: {
    roles: ['Principal', 'Vice principal', 'Proprietor', 'Head of guidance', 'Counsellor', 'Teacher', 'Other'],
    participants: ['SS1', 'SS2', 'SS3'],
    countLabel: 'About how many students?',
  },
  tutorial_centre: {
    roles: ['Centre owner', 'Centre manager', 'Tutor', 'Counsellor', 'Other'],
    participants: ['JAMB candidates', 'Re-sitting candidates', 'SS3 students'],
    countLabel: 'About how many students?',
  },
  university: {
    roles: ['Registrar', 'Admissions officer', 'Head of enrolment', 'Dean or head of department', 'Other'],
    participants: [],
    countLabel: 'About how many applicants?',
  },
  other: {
    roles: ['Founder or director', 'Manager', 'Counsellor', 'Teacher', 'Other'],
    participants: ['SS students', 'JAMB candidates', 'University students'],
    countLabel: 'About how many students?',
  },
};

const RANGES = [
  { value: 'under_50', label: 'Under 50' },
  { value: '50_to_200', label: '50 to 200' },
  { value: 'over_200', label: 'Over 200' },
];

const STARTS = [
  { value: 'this_term', label: 'This term' },
  { value: 'next_term', label: 'Next term' },
  { value: 'exploring', label: 'Just exploring' },
];

const STEPS = [
  { title: 'We talk', body: 'We agree the scope: which class or programme, how many students and how long.' },
  { title: 'We set up', body: 'Students use AlignTraits under your pilot. For universities, we screen against the criteria you share.' },
  { title: 'Your team reviews', body: 'Counsellors, tutors or admissions staff look at the results and the reasoning behind each one.' },
  { title: 'We report back', body: 'We share what we measured and how. Then you decide whether to continue. There is no obligation.' },
];

type Values = {
  institutionType: InstitutionType | '';
  institutionName: string;
  state: string;
  fullName: string;
  role: string;
  workEmail: string;
  whatsapp: string;
  participants: string[];
  programmes: string;
  studentRange: string;
  startWhen: string;
  note: string;
  authorised: boolean;
  website: string;
};

const EMPTY: Values = {
  institutionType: '',
  institutionName: '',
  state: '',
  fullName: '',
  role: '',
  workEmail: '',
  whatsapp: '',
  participants: [],
  programmes: '',
  studentRange: '',
  startWhen: '',
  note: '',
  authorised: false,
  website: '',
};

function check(v: Values): Record<string, string> {
  const e: Record<string, string> = {};
  if (!v.institutionType) e.institutionType = 'Choose the type of institution.';
  if (!v.institutionName.trim()) e.institutionName = 'Enter the name of your institution.';
  if (!v.state) e.state = 'Choose a state.';
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
  if (!v.role) e.role = 'Choose your role.';
  if (!EMAIL_PATTERN.test(v.workEmail.trim())) e.workEmail = 'Enter a valid email, for example name@school.edu.ng.';
  if (!isNigerianPhone(v.whatsapp)) e.whatsapp = 'Enter a Nigerian WhatsApp number, for example 0801 234 5678.';
  if (v.institutionType === 'university') {
    if (!v.programmes.trim()) e.programmes = 'Tell us which programmes.';
  } else if (v.institutionType && v.participants.length === 0) {
    e.participants = 'Choose who would take part.';
  }
  if (!v.studentRange) e.studentRange = 'Choose about how many students.';
  if (!v.startWhen) e.startWhen = 'Choose when you would like to start.';
  if (!v.authorised) e.authorised = 'Please confirm you can request a pilot for your institution.';
  return e;
}

/** Institutions > Request a pilot, at /institutions/request-a-pilot (?type=school | tutorial | university) */
export function PilotPage() {
  const [params] = useSearchParams();
  const linkedType = FROM_LINK[params.get('type') ?? ''];
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({ ...EMPTY, institutionType: linkedType ?? '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [noteOpen, setNoteOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'busy' | 'failed'>('idle');
  const [sent, setSent] = useState<{ name: string; institution: string; email: string } | null>(null);

  // A link from another page can change the type while this page is open.
  useEffect(() => {
    if (linkedType) setValues((prev) => ({ ...prev, institutionType: linkedType }));
  }, [linkedType]);

  const config = values.institutionType ? BY_TYPE[values.institutionType] : null;
  const participantOptions = useMemo(() => (config?.participants ?? []).map((p) => ({ value: p, label: p })), [config]);

  const set = <K extends keyof Values>(key: K) => (value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  function changeType(type: InstitutionType) {
    setValues((prev) => {
      const next = BY_TYPE[type];
      return {
        ...prev,
        institutionType: type,
        role: next.roles.includes(prev.role) ? prev.role : '',
        participants: prev.participants.filter((p) => next.participants.includes(p)),
      };
    });
    setErrors((prev) => ({ ...prev, institutionType: '', role: '', participants: '', programmes: '' }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = check(values);
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      focusFirstProblem(formRef.current);
      return;
    }
    setStatus('sending');
    const university = values.institutionType === 'university';
    const result = await submitForm('/forms/pilot', {
      ...values,
      participants: university ? [] : values.participants,
      programmes: university ? values.programmes : undefined,
      note: values.note || undefined,
      source: params.get('type') ? `link from ${params.get('type')} page` : undefined,
    });
    if (result.ok) {
      setSent({ name: greetingName(values.fullName), institution: values.institutionName.trim(), email: values.workEmail.trim() });
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
      <section className={s.page} aria-labelledby="pilot-title">
        <div className={`at-loan-container ${s.splitPage}`}>
          <div className={s.head}>
            <span className={s.eyebrow}>Request a pilot</span>
            <h1 id="pilot-title" className={s.title}>
              Test AlignTraits with <span className={s.accent}>real students</span> before you commit.
            </h1>
            <p className={s.sub}>
              A pilot is a small trial with one class or one programme. Your team reviews the results, and we show you how we measured them.
            </p>
            <ul className={s.trust}>
              {['About two minutes', 'We reply within two working days', 'No obligation'].map((t) => (
                <li key={t}>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.card}>
            {status === 'done' && sent ? (
              <div className={s.done} role="status">
                <span className={s.doneIcon} aria-hidden="true">
                  <CircleCheck size={32} />
                </span>
                <h2 className={s.doneTitle}>Thank you, {sent.name}.</h2>
                <p className={s.doneText}>
                  We have your pilot request for {sent.institution}. We will reply within two working days, and we have sent a copy to {sent.email}.
                </p>
                <p className={s.doneNext}>Next, we agree the scope with you: which class or programme, how many students and how long.</p>
                <SmartLink href={ROUTES.home} className={s.doneLink}>
                  Back to AlignTraits
                  <ArrowRight size={16} />
                </SmartLink>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Pilot request">
                <div className={s.group}>
                  <p className={s.groupTitle}>Your institution</p>
                  <Choices
                    name="institutionType"
                    label="Type of institution"
                    options={TYPES}
                    value={values.institutionType}
                    onChange={(v) => changeType(v as InstitutionType)}
                    columns={2}
                    error={errors.institutionType}
                  />
                  <div className={s.row}>
                    <TextField
                      name="institutionName"
                      label="Institution name"
                      value={values.institutionName}
                      onChange={set('institutionName')}
                      autoComplete="organization"
                      error={errors.institutionName}
                    />
                    <SelectField name="state" label="State" placeholder="Choose a state" options={NIGERIAN_STATES} value={values.state} onChange={set('state')} error={errors.state} />
                  </div>
                </div>

                <div className={s.group}>
                  <p className={s.groupTitle}>You</p>
                  <div className={s.row}>
                    <TextField name="fullName" label="Your full name" value={values.fullName} onChange={set('fullName')} autoComplete="name" error={errors.fullName} maxLength={120} />
                    <SelectField
                      name="role"
                      label="Your role"
                      options={config?.roles ?? BY_TYPE.other.roles}
                      value={values.role}
                      onChange={set('role')}
                      error={errors.role}
                    />
                  </div>
                  <div className={s.row}>
                    <TextField
                      name="workEmail"
                      type="email"
                      inputMode="email"
                      label="Work email"
                      placeholder="name@school.edu.ng"
                      value={values.workEmail}
                      onChange={set('workEmail')}
                      autoComplete="email"
                      error={errors.workEmail}
                    />
                    <PhoneField name="whatsapp" label="WhatsApp number" value={values.whatsapp} onChange={set('whatsapp')} error={errors.whatsapp} />
                  </div>
                </div>

                <div className={s.group}>
                  <p className={s.groupTitle}>The pilot</p>
                  {values.institutionType === 'university' ? (
                    <TextField
                      name="programmes"
                      label="Which programmes?"
                      placeholder="For example, Pharmacy, Nursing"
                      value={values.programmes}
                      onChange={set('programmes')}
                      error={errors.programmes}
                      maxLength={300}
                    />
                  ) : (
                    <Choices
                      name="participants"
                      label="Who would take part?"
                      help={values.institutionType ? 'Choose all that apply.' : 'Choose the type of institution first.'}
                      options={participantOptions}
                      value={values.participants}
                      onChange={(v) => set('participants')(v as string[])}
                      multiple
                      error={errors.participants}
                    />
                  )}
                  <Choices
                    name="studentRange"
                    label={config?.countLabel ?? 'About how many students?'}
                    options={RANGES}
                    value={values.studentRange}
                    onChange={(v) => set('studentRange')(v as string)}
                    columns={3}
                    error={errors.studentRange}
                  />
                  <Choices
                    name="startWhen"
                    label="When would you like to start?"
                    options={STARTS}
                    value={values.startWhen}
                    onChange={(v) => set('startWhen')(v as string)}
                    columns={3}
                    error={errors.startWhen}
                  />
                  {noteOpen ? (
                    <TextArea
                      name="note"
                      label="Anything we should know?"
                      optional
                      value={values.note}
                      onChange={set('note')}
                      max={500}
                    />
                  ) : (
                    <button type="button" className={s.addNote} onClick={() => setNoteOpen(true)}>
                      <Plus size={16} aria-hidden="true" />
                      Add a note <span>(optional)</span>
                    </button>
                  )}
                </div>

                <div className={s.trap} aria-hidden="true">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website')(e.target.value)} />
                  </label>
                </div>

                <Confirm name="authorised" checked={values.authorised} onChange={set('authorised')} error={errors.authorised}>
                  I can request a pilot on behalf of my institution.
                </Confirm>
                <p className={s.privacy}>
                  We only use your details to reply about your pilot. <SmartLink href="/privacy-policy">Privacy policy</SmartLink>
                </p>

                <button type="submit" className={s.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request my pilot'}
                  {status !== 'sending' && <ArrowRight size={16} aria-hidden="true" />}
                </button>
                <p className={s.after}>We reply within two working days.</p>

                {(status === 'busy' || status === 'failed') && (
                  <p className={s.formProblem} role="alert">
                    {status === 'busy'
                      ? 'Too many tries from this connection. Please wait a few minutes and try again.'
                      : 'We could not send your request. Check your connection and try again, or '}
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
          <div className={s.steps}>
            <h2 className={s.stepsTitle}>What happens in a pilot</h2>
            <ol className={s.stepList}>
              {STEPS.map((step, i) => (
                <li key={step.title} className={s.step}>
                  <span className={s.num} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className={s.stepTitle}>
                      <span className="visually-hidden">Step {i + 1}: </span>
                      {step.title}
                    </p>
                    <p className={s.stepText}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default PilotPage;
