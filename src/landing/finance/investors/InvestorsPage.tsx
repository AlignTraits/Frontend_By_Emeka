import shared from '../../loan/components/loan/shared.module.css';
import { PageShell } from '../components/PageShell';
import { Callout, CtaBandLink, FaqSection, PageHero, PanelCards, Pill, Steps } from '../components/Sections';
import { Award, HandCoins, Landmark, Lock } from '../components/icons';
import { CTA, FAQ, HERO, LINKS, PAGE_META, REPORT, RISKS, ROUTES_TO_BACK, STAGE, STEPS, WHY } from './data';
import styles from './Investors.module.css';

const ROUTE_ICONS = [<Landmark size={26} key="l" />, <HandCoins size={26} key="h" />, <Award size={26} key="a" />];

/** Finances > For Investors, at /finances/investors */
export function InvestorsPage() {
  return (
    <PageShell meta={PAGE_META}>
      <PageHero
        id="investors-hero-title"
        content={{
          titleStart: HERO.titleStart,
          titleAccent: HERO.titleAccent,
          titleEnd: HERO.titleEnd,
          subtitle: HERO.subtitle,
          note: { icon: 'shield', text: HERO.note },
          cta: { label: HERO.cta, href: LINKS.expressInterest },
          helper: HERO.helper,
        }}
      />

      <PanelCards
        id="routes-title"
        title={ROUTES_TO_BACK.title}
        cards={ROUTES_TO_BACK.cards.map((card, i) => ({ ...card, icon: ROUTE_ICONS[i] }))}
        note={ROUTES_TO_BACK.note}
      />

      <section className={shared.section} aria-labelledby="why-title">
        <div className={`at-loan-container ${shared.split}`}>
          <div>
            <h2 id="why-title" className={shared.h2}>
              {WHY.title}
            </h2>
            <p className={shared.lead}>{WHY.body}</p>
          </div>
          <div className={styles.stats}>
            {WHY.stats.map((stat, i) => (
              <div key={stat.figure} className={`${styles.stat} ${i === 0 ? styles.statDark : styles.statLight}`}>
                <p className={styles.figure}>{stat.figure}</p>
                <p className={styles.statText}>{stat.text}</p>
              </div>
            ))}
            <p className={styles.source}>{WHY.source}</p>
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${shared.alt}`} aria-labelledby="report-title">
        <div className={`at-loan-container ${shared.split}`}>
          <div>
            <h2 id="report-title" className={shared.h2}>
              {REPORT.title}
            </h2>
            <p className={shared.lead}>{REPORT.body}</p>
            <p className={styles.privacy}>
              <Lock size={18} />
              {REPORT.privacy}
            </p>
          </div>
          <div className={styles.report}>
            <div className={styles.reportHead}>
              <div>
                <p className={styles.reportLabel}>{REPORT.card.label}</p>
                <h3 className={styles.reportTitle}>{REPORT.card.title}</h3>
              </div>
              <Pill tone="gold">{REPORT.card.tag}</Pill>
            </div>
            <ul>
              {REPORT.card.rows.map((row) => (
                <li key={row.name} className={styles.reportRow}>
                  <div>
                    <p className={styles.reportName}>{row.name}</p>
                    <p className={styles.reportDetail}>{row.detail}</p>
                  </div>
                  <Pill tone="success">{row.status}</Pill>
                </li>
              ))}
            </ul>
            <p className={styles.reportFoot}>{REPORT.card.footnote}</p>
          </div>
        </div>
      </section>

      <Steps id="investor-steps-title" title={STEPS.title} items={STEPS.items} />

      <section className={shared.section} aria-labelledby="stage-title" style={{ paddingTop: 0 }}>
        <div className="at-loan-container">
          <div className={styles.stageIntro}>
            <h2 id="stage-title" className={shared.h2}>
              {STAGE.title}
            </h2>
            <p className={shared.lead}>{STAGE.body}</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {STAGE.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAGE.rows.map((row) => (
                  <tr key={row.area}>
                    <td className={styles.area}>{row.area}</td>
                    <td className={styles.statusCell}>
                      <Pill tone={row.status.tone}>{row.status.label}</Pill>
                    </td>
                    <td className={styles.meaning}>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Callout id="risks-title" icon="warning" title={RISKS.title} tone="gold">
        <p>{RISKS.body}</p>
        <p>
          <strong>{RISKS.strong}</strong>
        </p>
      </Callout>

      <FaqSection content={FAQ} />

      <CtaBandLink
        id="investors-cta-title"
        titleStart={CTA.titleStart}
        titleAccent={CTA.titleAccent}
        button={{ label: CTA.button, href: LINKS.expressInterest }}
      />
    </PageShell>
  );
}

export default InvestorsPage;
