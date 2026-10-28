import { Compass, FileText, HeartHandshake, MessagesSquare, Sprout } from 'lucide-react';
import shared from '../../loan/components/loan/shared.module.css';
import { PageShell } from '../../finance/components/PageShell';
import { CtaBandLink, FaqSection, PageHero, Pill, Steps } from '../../finance/components/Sections';
import heroJpg from '../assets/schools-hero-1120.jpg';
import heroWebp from '../assets/schools-hero-1120.webp';
import heroJpg2x from '../assets/schools-hero-1584.jpg';
import heroWebp2x from '../assets/schools-hero-1584.webp';
import s from '../institutions.module.css';
import { HeroPhoto, NavyCards, PilotBand, pilotHref } from '../shared';
import { CONVERSATIONS, CTA, DO_THERE, EVENTS, FAQ, HERO, NOT_YET, PAGE_META, STEPS, WHO, WHY } from './data';

const PIN_POSITIONS = [
  { top: '8%', left: '3%' },
  { top: '10%', right: '4%' },
  { bottom: '8%', left: '18%' },
  { bottom: '14%', right: '14%' },
];

const DO_ICONS = [<MessagesSquare size={20} key="m" />, <FileText size={20} key="f" />, <Compass size={20} key="c" />];

/** Institutions > For Schools, at /institutions/schools */
export function SchoolsPage() {
  const href = pilotHref('school');

  return (
    <PageShell meta={PAGE_META}>
      <PageHero
        id="schools-hero-title"
        content={{
          titleStart: HERO.titleStart,
          titleAccent: HERO.titleAccent,
          titleEnd: HERO.titleEnd,
          subtitle: HERO.subtitle,
          points: HERO.points,
          audience: HERO.audience,
          cta: { label: HERO.cta, href },
          helper: HERO.helper,
        }}
        media={
          <HeroPhoto
            photo={{ webp: heroWebp, jpg: heroJpg, webp2x: heroWebp2x, jpg2x: heroJpg2x, alt: HERO.imageAlt, width: 1120, height: 475 }}
            pins={HERO.pins.map((label, i) => ({ label, style: PIN_POSITIONS[i] }))}
          />
        }
      />

      <section className={shared.section} aria-labelledby="why-title">
        <div className={`at-loan-container ${s.split}`}>
          <div>
            <h2 id="why-title" className={shared.h2}>
              {WHY.title}
            </h2>
            <p className={s.lead}>{WHY.body}</p>
          </div>
          <div>
            <ul className={s.bubbles}>
              {WHY.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
            <p className={s.lead}>
              {WHY.textStart} <strong className={s.strongText}>{WHY.textStrong}</strong>
            </p>
          </div>
        </div>
      </section>

      <NavyCards
        id="conversations-title"
        title={CONVERSATIONS.title}
        columns={2}
        cards={[
          { ...CONVERSATIONS.cards[0], icon: <HeartHandshake size={20} /> },
          { ...CONVERSATIONS.cards[1], icon: <Sprout size={20} /> },
        ]}
      />

      <section className={`${shared.section} ${shared.alt}`} aria-labelledby="who-title">
        <div className={`at-loan-container ${s.split}`}>
          <div>
            <h2 id="who-title" className={shared.h2}>
              {WHO.title}
            </h2>
            <p className={s.lead}>{WHO.body}</p>
          </div>
          <ul className={s.chips}>
            {WHO.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
            <li className={s.chipDark}>{WHO.team}</li>
          </ul>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="do-title">
        <div className="at-loan-container">
          <h2 id="do-title" className={shared.h2}>
            {DO_THERE.title}
          </h2>
          <ul className={s.iconCards}>
            {DO_THERE.cards.map((text, i) => (
              <li key={text} className={s.iconCard}>
                <span className={s.iconTile} aria-hidden="true">
                  {DO_ICONS[i]}
                </span>
                <p className={s.iconCardText}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="events-title">
        <div className="at-loan-container">
          <h2 id="events-title" className={shared.h2}>
            {EVENTS.title}
          </h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  {EVENTS.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EVENTS.rows.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <span className={s.eventName}>
                        {row.name}
                        <Pill tone="neutral">{EVENTS.status}</Pill>
                      </span>
                    </td>
                    <td data-label={EVENTS.columns[1]}>{row.date}</td>
                    <td data-label={EVENTS.columns[2]}>{row.state}</td>
                    <td data-label={EVENTS.columns[3]}>{row.seats}</td>
                    <td data-label={EVENTS.columns[4]} className={s.muted}>
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.eventNote}>
            <FileText size={16} aria-hidden="true" />
            {EVENTS.note}
          </p>
        </div>
      </section>

      <Steps id="take-part-title" title={STEPS.title} items={STEPS.items} alt after={<p className={s.afterSteps}>{STEPS.after}</p>} />

      <PilotBand id="not-yet-title" title={NOT_YET.title} body={NOT_YET.body} button={{ label: NOT_YET.button, href }} />

      <FaqSection content={FAQ} />

      <CtaBandLink
        id="schools-cta-title"
        titleStart={CTA.titleStart}
        titleAccent={CTA.titleAccent}
        button={{ label: CTA.button, href }}
        secondary={{ label: CTA.secondary, href }}
        helper={CTA.helper}
      />
    </PageShell>
  );
}

export default SchoolsPage;
