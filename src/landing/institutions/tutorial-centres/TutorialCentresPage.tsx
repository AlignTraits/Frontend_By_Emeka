import { BadgePercent, BellRing, ClipboardCheck, FileText, Handshake, ShieldCheck } from 'lucide-react';
import shared from '../../loan/components/loan/shared.module.css';
import { ButtonLink } from '../../loan/components/ui/Button';
import { PageShell } from '../../finance/components/PageShell';
import { CtaBandLink, FaqSection, PageHero, Steps } from '../../finance/components/Sections';
import heroJpg from '../assets/tutorial-hero-1120.jpg';
import heroWebp from '../assets/tutorial-hero-1120.webp';
import heroJpg2x from '../assets/tutorial-hero-1584.jpg';
import heroWebp2x from '../assets/tutorial-hero-1584.webp';
import pilotJpg from '../assets/tutorial-pilot.jpg';
import pilotWebp from '../assets/tutorial-pilot.webp';
import s from '../institutions.module.css';
import { HeroPhoto, NavyCards, Photo, pilotHref } from '../shared';
import { CTA, FAQ, GETS, HERO, PAGE_META, PILOT, QUESTIONS, SAFE, SEE, STEPS, YOURS } from './data';

const GET_ICONS = [ClipboardCheck, FileText, BellRing, BadgePercent];

/** Institutions > Tutorial centres, at /institutions/tutorial-centres */
export function TutorialCentresPage() {
  const href = pilotHref('tutorial');

  return (
    <PageShell meta={PAGE_META}>
      <PageHero
        id="tutorial-hero-title"
        content={{
          titleStart: HERO.titleStart,
          titleAccent: HERO.titleAccent,
          titleEnd: HERO.titleEnd,
          subtitle: HERO.subtitle,
          audience: HERO.audience,
          cta: { label: HERO.cta, href },
          helper: HERO.helper,
        }}
        media={
          <HeroPhoto
            photo={{ webp: heroWebp, jpg: heroJpg, webp2x: heroWebp2x, jpg2x: heroJpg2x, alt: HERO.imageAlt, width: 1120, height: 475 }}
          />
        }
      />

      <section className={shared.section} aria-labelledby="questions-title">
        <div className="at-loan-container">
          <div className={s.split}>
            <div>
              <h2 id="questions-title" className={shared.h2}>
                {QUESTIONS.title}
              </h2>
              <p className={s.lead}>{QUESTIONS.body}</p>
            </div>
            <ul className={s.questionCards}>
              {QUESTIONS.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
          <figure className={s.research}>
            <p>{QUESTIONS.research}</p>
            <figcaption className={s.source}>{QUESTIONS.source}</figcaption>
          </figure>
        </div>
      </section>

      <NavyCards
        id="centre-gets-title"
        title={GETS.title}
        columns={2}
        cards={GETS.cards.map((card, i) => {
          const Icon = GET_ICONS[i];
          return { ...card, icon: <Icon size={20} /> };
        })}
      />

      <section className={shared.section} aria-labelledby="see-title">
        <div className={`at-loan-container ${s.split} ${s.splitWide}`}>
          <div>
            <h2 id="see-title" className={shared.h2}>
              {SEE.title}
            </h2>
            <p className={s.lead}>{SEE.body}</p>
          </div>
          <div className={s.card}>
            <div className={s.cardHead}>
              <p className={s.cardTitle}>{SEE.card.title}</p>
              <span className={s.tag}>{SEE.card.tag}</span>
            </div>
            <dl className={s.rows}>
              <div>
                <dt>{SEE.card.resultLabel}</dt>
                <dd className={s.resultLine}>
                  <strong>{SEE.card.result}</strong>
                  <span className={`${s.levelPill} ${s.levelStretch}`}>{SEE.card.resultPill}</span>
                </dd>
              </div>
              <div>
                <dt>{SEE.card.whyLabel}</dt>
                <dd>{SEE.card.why}</dd>
              </div>
              <div>
                <dt>{SEE.card.nextLabel}</dt>
                <dd>{SEE.card.next}</dd>
              </div>
            </dl>
            <ul className={s.options}>
              {SEE.card.options.map((o) => (
                <li key={o.name} className={s.option}>
                  <span className={`${s.levelPill} ${o.kind === 'realistic' ? s.levelRealistic : s.levelSafety}`}>{o.level}</span>
                  <p className={s.optionName}>{o.name}</p>
                  <p className={s.optionUni}>{o.uni}</p>
                  <p className={s.optionCost}>{o.cost}</p>
                </li>
              ))}
            </ul>
            <p className={s.footnote}>{SEE.card.footnote}</p>
          </div>
        </div>
      </section>

      <Steps id="tutorial-steps-title" title={STEPS.title} items={STEPS.items} alt />

      <section className={shared.section} aria-labelledby="yours-title">
        <div className={`at-loan-container ${s.stack}`}>
          <div className={s.yoursBox}>
            <span className={s.yoursIcon} aria-hidden="true">
              <Handshake size={26} />
            </span>
            <div>
              <h2 id="yours-title" className={s.yoursTitle}>
                {YOURS.title}
              </h2>
              <p className={s.yoursText}>{YOURS.body}</p>
            </div>
          </div>

          <div className={s.pilotSplit}>
            <div className={s.pilotSplitCopy}>
              <h2 className={s.pilotBandTitle}>{PILOT.title}</h2>
              <p className={s.pilotBandText}>{PILOT.body}</p>
              <ButtonLink href={href}>{PILOT.button}</ButtonLink>
            </div>
            <Photo webp={pilotWebp} jpg={pilotJpg} alt={PILOT.imageAlt} width={1000} height={747} />
          </div>

          <p className={s.safeNote}>
            <ShieldCheck size={20} aria-hidden="true" />
            <span>
              <strong>{SAFE.strong}</strong> {SAFE.body}
            </span>
          </p>
        </div>
      </section>

      <FaqSection content={FAQ} />

      <CtaBandLink
        id="tutorial-cta-title"
        titleStart={CTA.titleStart}
        titleAccent={CTA.titleAccent}
        button={{ label: CTA.button, href }}
        secondary={{ label: CTA.secondary, href }}
        helper={CTA.helper}
      />
    </PageShell>
  );
}

export default TutorialCentresPage;
