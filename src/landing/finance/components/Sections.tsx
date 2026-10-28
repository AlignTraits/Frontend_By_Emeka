/*
  Reusable sections for the Finances pages. Each one takes its words as props, and borrows the
  Loan page styles so every Finances page shares the same type, spacing and colours.
*/
import { useId, useState, type ReactNode } from 'react';
import heroStyles from '../../loan/components/loan/Hero.module.css';
import shared from '../../loan/components/loan/shared.module.css';
import faqStyles from '../../loan/components/loan/Faq.module.css';
import costStyles from '../../loan/components/loan/Costs.module.css';
import ctaStyles from '../../loan/components/loan/CtaBand.module.css';
import { ButtonLink } from '../../loan/components/ui/Button';
import { ArrowRight, Close, Plus, ShieldCheck } from '../../loan/components/ui/Icons';
import { SmartLink } from '../../components/ui/SmartLink';
import { Check } from 'lucide-react';
import { Info, Lock, MessageCircle, Warning } from './icons';
import f from './finance.module.css';
import stepStyles from './Steps.module.css';

/* ---------------- Status pill ---------------- */

export type PillTone = 'success' | 'gold' | 'neutral' | 'danger' | 'info';

const PILL_TONE: Record<PillTone, string> = {
  success: f.pillSuccess,
  gold: f.pillGold,
  neutral: f.pillNeutral,
  danger: f.pillDanger,
  info: f.pillInfo,
};

export function Pill({
  tone,
  onDark = false,
  dot = true,
  children,
}: {
  tone: PillTone;
  onDark?: boolean;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={`${f.pill} ${PILL_TONE[tone]} ${onDark ? f.pillOnDark : ''}`}>
      {dot && <span className={f.pillDot} aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ---------------- Hero ---------------- */

export interface HeroContent {
  eyebrow?: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: ReactNode;
  subtitle: string;
  /* Extra lines under the subtitle, each with a tick. */
  points?: string[];
  /* Who the page is for, in a short bold line. */
  audience?: string;
  note?: { icon: 'shield' | 'info'; text: string };
  cta: { label: string; href: string };
  helper?: ReactNode;
}

/** `media` (a photo, say) sits under the hero text, inside the hero, so it shares the hero's spacing. */
export function PageHero({ content, id, media }: { content: HeroContent; id: string; media?: ReactNode }) {
  const { eyebrow, titleStart, titleAccent, titleEnd, subtitle, points, audience, note, cta, helper } = content;
  return (
    <section className={heroStyles.hero} aria-labelledby={id}>
      <div className={`at-loan-container ${heroStyles.inner}`}>
        {eyebrow && <p className={f.eyebrow}>{eyebrow}</p>}
        <h1 id={id} className={heroStyles.title}>
          {titleStart} <span className={heroStyles.accent}>{titleAccent}</span>
          {titleEnd ?? ''}
        </h1>
        <p className={heroStyles.subtitle}>{subtitle}</p>
        {points && points.length > 0 && (
          <ul className={f.heroPoints}>
            {points.map((point) => (
              <li key={point}>
                <Check size={16} />
                {point}
              </li>
            ))}
          </ul>
        )}
        {audience && <p className={f.heroAudience}>{audience}</p>}

        {note && (
          <div className={heroStyles.note}>
            <span className={heroStyles.noteIcon}>{note.icon === 'shield' ? <ShieldCheck size={20} /> : <Info size={20} />}</span>
            <p>{note.text}</p>
          </div>
        )}

        <ButtonLink href={cta.href} className={heroStyles.cta}>
          {cta.label}
        </ButtonLink>
        {helper && <p className={heroStyles.helper}>{helper}</p>}
      </div>
      {media && <div className={`at-loan-container ${f.heroMedia}`}>{media}</div>}
    </section>
  );
}

/* ---------------- Steps ---------------- */

export function Steps({
  id,
  title,
  items,
  alt = false,
  after,
}: {
  id: string;
  title: string;
  items: { title: string; body: string }[];
  alt?: boolean;
  /* Anything to show under the steps, such as a short note. */
  after?: ReactNode;
}) {
  return (
    <section className={`${shared.section} ${alt ? shared.alt : ''}`} aria-labelledby={id}>
      <div className="at-loan-container">
        <h2 id={id} className={shared.h2}>
          {title}
        </h2>
        <ol className={`${stepStyles.steps} ${stepStyles[`cols${items.length}`] ?? ''}`}>
          {items.map((step, i) => (
            <li key={step.title} className={stepStyles.step}>
              <span className={stepStyles.marker} aria-hidden="true">
                <span className={stepStyles.number}>{i + 1}</span>
              </span>
              <div className={stepStyles.body}>
                <h3 className={stepStyles.title}>
                  <span className="visually-hidden">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className={stepStyles.text}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {after}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

export interface FaqContent {
  title: string;
  body: string;
  /* `draft: true` marks answers written for review before launch. */
  items: { q: string; a: string; draft?: boolean }[];
}

export function FaqSection({ content }: { content: FaqContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const titleId = `${baseId}-title`;

  return (
    <section className={`${shared.section} ${faqStyles.section}`} aria-labelledby={titleId}>
      <div className={`at-loan-container ${faqStyles.layout}`}>
        <div className={faqStyles.intro}>
          <h2 id={titleId} className={`${shared.h2} ${faqStyles.title}`}>
            {content.title}
          </h2>
          <p className={faqStyles.lead}>{content.body}</p>
        </div>

        <div className={faqStyles.list}>
          {content.items.map((item, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={item.q} className={faqStyles.item}>
                <h3 className={faqStyles.question}>
                  <button
                    id={buttonId}
                    type="button"
                    className={faqStyles.trigger}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className={faqStyles.icon} aria-hidden="true">
                      {open ? <Close size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={faqStyles.answer} hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Navy section with a table card (Costs layout) ---------------- */

export function TableCardSection({
  id,
  title,
  body,
  cardTitle,
  tag,
  rows,
  footnote,
}: {
  id: string;
  title: string;
  body: string;
  cardTitle: string;
  tag: string;
  rows: { label: string; value: string }[];
  footnote?: string;
}) {
  return (
    <section className={`${shared.section} ${costStyles.section}`} aria-labelledby={id}>
      <div className={`at-loan-container ${costStyles.layout}`}>
        <div className={costStyles.copy}>
          <h2 id={id} className={`${shared.h2} ${costStyles.title}`}>
            {title}
          </h2>
          <p className={costStyles.lead}>{body}</p>
        </div>
        <div>
          <div className={costStyles.card}>
            <div className={`${shared.cardHeader} ${costStyles.header}`}>
              <h3 className={`${shared.cardTitle} ${costStyles.cardTitle}`}>{cardTitle}</h3>
              <Pill tone="gold">{tag}</Pill>
            </div>
            <dl className={costStyles.rows}>
              {rows.map((row) => (
                <div key={row.label} className={costStyles.row}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {footnote && <p className={costStyles.footnote}>{footnote}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Callout box ---------------- */

export function Callout({
  id,
  icon,
  title,
  tag,
  tone = 'mist',
  children,
}: {
  id: string;
  icon: 'shield' | 'warning' | 'lock';
  title: string;
  tag?: string;
  tone?: 'mist' | 'gold';
  children: ReactNode;
}) {
  return (
    <section className={f.calloutSection} aria-labelledby={id}>
      <div className="at-loan-container">
        <div className={`${f.callout} ${tone === 'gold' ? f.calloutGold : ''}`}>
          <span className={f.calloutIcon}>
            {icon === 'shield' ? <ShieldCheck size={20} /> : icon === 'warning' ? <Warning size={20} /> : <Lock size={20} />}
          </span>
          <div>
            <div className={f.calloutTitleRow}>
              <h2 id={id} className={f.calloutTitle}>
                {title}
              </h2>
              {tag && <Pill tone="neutral">{tag}</Pill>}
            </div>
            <div className={f.calloutBody}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={f.whatsapp}>
      <MessageCircle size={16} />
      {label}
    </a>
  );
}

/* ---------------- Navy panel with three cards ---------------- */

export function PanelCards({
  id,
  title,
  cards,
  note,
}: {
  id: string;
  title: string;
  cards: { icon: ReactNode; title: string; body: string; pill?: { tone: PillTone; label: string } }[];
  note?: string;
}) {
  return (
    <section className={`${shared.section} ${f.panel}`} aria-labelledby={id}>
      <div className="at-loan-container">
        <h2 id={id} className={`${shared.h2} ${f.panelTitle}`}>
          {title}
        </h2>
        <ul className={f.panelGrid}>
          {cards.map((card) => (
            <li key={card.title} className={f.panelCard}>
              <div className={f.panelCardTop}>
                <span aria-hidden="true">{card.icon}</span>
                {card.pill && (
                  <Pill tone={card.pill.tone} onDark>
                    {card.pill.label}
                  </Pill>
                )}
              </div>
              <h3 className={f.panelCardTitle}>{card.title}</h3>
              <p className={f.panelCardText}>{card.body}</p>
            </li>
          ))}
        </ul>
        {note && <p className={f.panelNote}>{note}</p>}
      </div>
    </section>
  );
}

/* ---------------- Two dark cards with a link ---------------- */

export function LinkCards({
  id,
  title,
  cards,
}: {
  id: string;
  title: string;
  cards: { icon: ReactNode; title: string; body: string; link: { label: string; href: string } }[];
}) {
  return (
    <section className={shared.section} aria-labelledby={id}>
      <div className="at-loan-container">
        <h2 id={id} className={shared.h2}>
          {title}
        </h2>
        <ul className={f.linkGrid}>
          {cards.map((card) => (
            <li key={card.title} className={f.linkCard}>
              <span className={f.linkCardIcon} aria-hidden="true">
                {card.icon}
              </span>
              <h3 className={f.linkCardTitle}>{card.title}</h3>
              <p className={f.linkCardText}>{card.body}</p>
              <SmartLink href={card.link.href} className={f.linkCardLink}>
                {card.link.label}
                <ArrowRight size={14} />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Two white benefit cards ---------------- */

export function BenefitCards({
  id,
  title,
  cards,
}: {
  id: string;
  title: string;
  cards: { icon: ReactNode; title: string; body: string }[];
}) {
  return (
    <section className={shared.section} aria-labelledby={id}>
      <div className="at-loan-container">
        <h2 id={id} className={shared.h2}>
          {title}
        </h2>
        <ul className={f.benefitGrid}>
          {cards.map((card) => (
            <li key={card.title} className={f.benefitCard}>
              <span className={f.benefitIcon} aria-hidden="true">
                {card.icon}
              </span>
              <h3 className={f.benefitTitle}>{card.title}</h3>
              <p className={f.benefitText}>{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Closing band with a button ---------------- */

export function CtaBandLink({
  id,
  titleStart,
  titleAccent,
  titleEnd = '.',
  button,
  secondary,
  helper,
}: {
  id: string;
  titleStart: string;
  titleAccent: string;
  titleEnd?: string;
  button: { label: string; href: string };
  /* A quieter second link beside the button, e.g. "Request a pilot". */
  secondary?: { label: string; href: string };
  helper?: ReactNode;
}) {
  return (
    <section className={ctaStyles.section} aria-labelledby={id}>
      <div className="at-loan-container">
        <div className={ctaStyles.band}>
          <div className={ctaStyles.copy}>
            <h2 id={id} className={ctaStyles.title}>
              {titleStart} <span className={ctaStyles.accent}>{titleAccent}</span>
              {titleEnd}
            </h2>
          </div>
          <div className={`${ctaStyles.action} ${secondary ? f.ctaActionWide : ''}`}>
            <div className={f.ctaButtons}>
              <ButtonLink href={button.href} variant="gold" className={ctaStyles.submit}>
                {button.label}
              </ButtonLink>
              {secondary && (
                <SmartLink href={secondary.href} className={f.ctaSecondary}>
                  {secondary.label}
                </SmartLink>
              )}
            </div>
            {helper && <p className={ctaStyles.helper}>{helper}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
