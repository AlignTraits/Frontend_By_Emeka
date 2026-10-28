import { ArrowRight, Award, Ban, Lock, ListChecks, Scale, ShieldCheck, Signpost, Tag, Target, Users, Wallet } from 'lucide-react';
import shared from '../../loan/components/loan/shared.module.css';
import { SmartLink } from '../../components/ui/SmartLink';
import { PageShell } from '../../finance/components/PageShell';
import { CtaBandLink, FaqSection, PageHero, Pill, Steps } from '../../finance/components/Sections';
import f from '../../finance/components/finance.module.css';
import heroJpg from '../assets/universities-hero-1120.jpg';
import heroWebp from '../assets/universities-hero-1120.webp';
import heroJpg2x from '../assets/universities-hero-1584.jpg';
import heroWebp2x from '../assets/universities-hero-1584.webp';
import studentsJpg from '../assets/universities-students.jpg';
import studentsWebp from '../assets/universities-students.webp';
import s from '../institutions.module.css';
import { HeroPhoto, NavyCards, Photo, pilotHref } from '../shared';
import { ACCURACY, CTA, FAQ, GET, HERO, KNOW, LINKS, NEUTRAL, OFFERS, PAGE_META, PROBLEM, REQUIREMENTS, SECOND, STAGE, STEPS } from './data';

const GET_ICONS = [Target, Scale, ListChecks, Signpost, Users, Award];

/** Institutions > For Universities, at /institutions/universities */
export function UniversitiesPage() {
  const href = pilotHref('university');

  return (
    <PageShell meta={PAGE_META}>
      <PageHero
        id="universities-hero-title"
        content={{
          titleStart: HERO.titleStart,
          titleAccent: HERO.titleAccent,
          titleEnd: (
            <>
              <br />
              No guesswork.
            </>
          ),
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

      <section className={shared.section} aria-labelledby="problem-title">
        <div className={`at-loan-container ${s.split}`}>
          <div>
            <h2 id="problem-title" className={shared.h2}>
              {PROBLEM.title}
            </h2>
            <p className={s.lead}>{PROBLEM.body}</p>
          </div>
          <ul className={s.problemCards}>
            {PROBLEM.cards.map((card, i) => (
              <li key={card.title} className={s.problemCard}>
                <span className={s.problemIcon} aria-hidden="true">
                  {i === 0 ? <Ban size={20} /> : <Wallet size={20} />}
                </span>
                <div>
                  <h3 className={s.problemTitle}>{card.title}</h3>
                  <p className={s.problemText}>{card.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NavyCards
        id="get-title"
        title={GET.title}
        cards={GET.cards.map((card, i) => {
          const Icon = GET_ICONS[i];
          return { ...card, icon: <Icon size={20} /> };
        })}
      />

      <section className={shared.section} aria-labelledby="requirements-title">
        <div className={`at-loan-container ${s.split} ${s.splitWide}`}>
          <div>
            <h2 id="requirements-title" className={shared.h2}>
              {REQUIREMENTS.title}
            </h2>
            <p className={s.lead}>{REQUIREMENTS.body}</p>
            <p className={s.quoteBar}>{REQUIREMENTS.quote}</p>
          </div>
          <div className={s.card}>
            <div className={s.cardHead}>
              <p className={s.cardTitle}>{REQUIREMENTS.card.title}</p>
              <span className={s.tag}>{REQUIREMENTS.card.tag}</span>
            </div>
            <table className={s.reqTable}>
              <thead>
                <tr>
                  {REQUIREMENTS.card.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REQUIREMENTS.card.rows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.met}</td>
                    <td>
                      <span className={`${s.pct} ${row.full ? s.pctFull : s.pctPart}`}>{row.pct}</span>
                    </td>
                    <td>{row.todo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={s.footnote}>{REQUIREMENTS.card.footnote}</p>
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${shared.alt}`} aria-labelledby="second-title">
        <div className={`at-loan-container ${s.split} ${s.splitWide}`}>
          <div>
            <h2 id="second-title" className={shared.h2}>
              {SECOND.title}
            </h2>
            <p className={s.lead}>{SECOND.body}</p>
          </div>
          <div className={s.card}>
            <span className={s.tag}>{SECOND.card.tag}</span>
            <dl className={s.rows}>
              <div>
                <dt>{SECOND.card.appliedLabel}</dt>
                <dd>
                  <strong>{SECOND.card.applied}</strong>
                  {SECOND.card.result}
                </dd>
              </div>
              <div>
                <dt>{SECOND.card.openLabel}</dt>
                <dd>
                  <span className={s.courseChips}>
                    {SECOND.card.courses.map((c) => (
                      <span key={c} className={s.courseChip}>
                        {c}
                      </span>
                    ))}
                  </span>
                  <span className={s.fitPills}>
                    {SECOND.card.fits.map((fit) => (
                      <Pill key={fit} tone="success">
                        {fit}
                      </Pill>
                    ))}
                  </span>
                </dd>
              </div>
              <div>
                <dt>{SECOND.card.nextLabel}</dt>
                <dd>{SECOND.card.next}</dd>
              </div>
            </dl>
            <p className={s.source}>{SECOND.card.footnote}</p>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="know-title">
        <div className={`at-loan-container ${s.split}`}>
          <div>
            <h2 id="know-title" className={shared.h2}>
              {KNOW.title}
            </h2>
            <p className={s.lead}>{KNOW.p1}</p>
            <p className={s.lead}>{KNOW.p2}</p>
            <p className={`${s.lead} ${s.strongText}`}>{KNOW.p3}</p>
          </div>
          <div className={s.photoWrap}>
            <Photo webp={studentsWebp} jpg={studentsJpg} alt={KNOW.imageAlt} width={760} height={943} />
            <span className={s.photoBadge}>
              <Lock size={15} aria-hidden="true" />
              {KNOW.badge}
            </span>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="offers-title">
        <div className="at-loan-container">
          <div className={s.navyBox}>
            <div>
              <h2 id="offers-title" className={s.navyBoxTitle}>
                {OFFERS.title}
              </h2>
              <p className={`${s.lead} ${s.onDarkMuted}`}>{OFFERS.p1}</p>
              <p className={`${s.lead} ${s.onDark}`}>{OFFERS.p2}</p>
              <SmartLink href={LINKS.scholarships} className={s.goldLink}>
                {OFFERS.link}
                <ArrowRight size={16} />
              </SmartLink>
            </div>
            <div className={s.offerCard}>
              <div className={s.offerTop}>
                <span className={s.goldTag}>
                  <Award size={14} aria-hidden="true" />
                  {OFFERS.card.type}
                </span>
                <span className={s.darkTag}>{OFFERS.card.tag}</span>
              </div>
              <p className={s.offerUni}>{OFFERS.card.uni}</p>
              <p className={s.offerCourse}>{OFFERS.card.course}</p>
              <p className={s.offerAward}>{OFFERS.card.award}</p>
              <dl className={s.offerRows}>
                {OFFERS.card.rows.map((row, i) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>
                      {i === 1 && <Tag size={14} aria-hidden="true" />}
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className={s.offerFoot}>{OFFERS.card.footnote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${f.panel}`} aria-labelledby="accuracy-title">
        <div className="at-loan-container">
          <h2 id="accuracy-title" className={`${shared.h2} ${s.onDark}`}>
            {ACCURACY.title}
          </h2>
          <div className={`${s.split} ${s.splitTop} ${s.statRule}`}>
            <p className={s.bigStat}>{ACCURACY.stat}</p>
            <div>
              <p className={s.statText}>{ACCURACY.p1}</p>
              <p className={s.statText}>{ACCURACY.p2}</p>
              <p className={s.statSource}>{ACCURACY.source}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="neutral-title">
        <div className="at-loan-container">
          <div className={s.centred}>
            <span className={s.centredIcon} aria-hidden="true">
              <ShieldCheck size={26} />
            </span>
            <h2 id="neutral-title" className={shared.h2}>
              {NEUTRAL.title}
            </h2>
            <p className={s.lead}>{NEUTRAL.body}</p>
            <p className={s.centredStrong}>{NEUTRAL.strong}</p>
          </div>
        </div>
      </section>

      <Steps id="uni-steps-title" title={STEPS.title} items={STEPS.items} alt />

      <section className={shared.section} aria-labelledby="stage-title">
        <div className={`at-loan-container ${s.split} ${s.splitWide} ${s.splitTop}`}>
          <div>
            <h2 id="stage-title" className={shared.h2}>
              {STAGE.title}
            </h2>
            <p className={s.lead}>{STAGE.body}</p>
          </div>
          <div className={s.tableWrap} style={{ marginTop: 0 }}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">{STAGE.columns[0]}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>
                    {STAGE.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {STAGE.rows.map((row) => (
                  <tr key={row.item} className={s.stageRow}>
                    <td>{row.item}</td>
                    <td>
                      <Pill tone={row.stage.tone}>{row.stage.label}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSection content={FAQ} />

      <CtaBandLink
        id="universities-cta-title"
        titleStart={CTA.titleStart}
        titleAccent={CTA.titleAccent}
        button={{ label: CTA.button, href }}
        secondary={{ label: CTA.secondary, href }}
      />
    </PageShell>
  );
}

export default UniversitiesPage;
