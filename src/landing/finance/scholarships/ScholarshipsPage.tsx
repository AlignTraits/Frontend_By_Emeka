import { SmartLink } from '../../components/ui/SmartLink';
import shared from '../../loan/components/loan/shared.module.css';
import { PageShell } from '../components/PageShell';
import {
  Callout,
  CtaBandLink,
  FaqSection,
  LinkCards,
  PageHero,
  PanelCards,
  Steps,
  WhatsAppButton,
} from '../components/Sections';
import { Award, Building, CalendarClock, Clipboard, HandCoins, Landmark, Send, Trophy, Users, Wallet } from '../components/icons';
import f from '../components/finance.module.css';
import ceremony1120jpg from './assets/award-ceremony-1120.jpg';
import ceremony1120webp from './assets/award-ceremony-1120.webp';
import ceremony1680jpg from './assets/award-ceremony-1680.jpg';
import ceremony1680webp from './assets/award-ceremony-1680.webp';
import { ANATOMY, CTA, FAQ, HERO, LINKS, OFFERING, PAGE_META, SOURCES, STAY_SAFE, STEPS } from './data';
import { ScholarshipList } from './ScholarshipList';
import styles from './Scholarships.module.css';

const ANATOMY_ICONS = [Landmark, Wallet, Users, CalendarClock, Clipboard, Send];

function JoinFreeHelper({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      {HERO.helperStart}{' '}
      <SmartLink href={LINKS.joinFree} className={onDark ? f.helperLinkOnDark : f.helperLink}>
        {HERO.helperLink}
      </SmartLink>{' '}
      {HERO.helperEnd}
    </>
  );
}

/** Finances > Scholarships and awards, at /finances/scholarships */
export function ScholarshipsPage() {
  return (
    <PageShell meta={PAGE_META}>
      <PageHero
        id="scholarships-hero-title"
        content={{
          eyebrow: HERO.eyebrow,
          titleStart: HERO.titleStart,
          titleAccent: HERO.titleAccent,
          titleEnd: HERO.titleEnd,
          subtitle: HERO.subtitle,
          cta: { label: HERO.cta, href: LINKS.seeOpenScholarships },
          helper: <JoinFreeHelper />,
        }}
      />

      <div className={styles.media}>
        <div className="at-loan-container">
          <picture className={styles.photo}>
            <source
              type="image/webp"
              srcSet={`${ceremony1120webp} 1120w, ${ceremony1680webp} 1680w`}
              sizes="(max-width: 1168px) 100vw, 1120px"
            />
            <img
              src={ceremony1680jpg}
              srcSet={`${ceremony1120jpg} 1120w, ${ceremony1680jpg} 1680w`}
              sizes="(max-width: 1168px) 100vw, 1120px"
              alt={HERO.imageAlt}
              width={1680}
              height={720}
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <ScholarshipList />

      <PanelCards
        id="sources-title"
        title={SOURCES.title}
        cards={SOURCES.cards.map((card, i) => ({
          ...card,
          icon: [<Building size={26} key="b" />, <HandCoins size={26} key="h" />, <Trophy size={26} key="t" />][i],
        }))}
      />

      <section className={shared.section} aria-labelledby="anatomy-title">
        <div className={`at-loan-container ${shared.split}`}>
          <div>
            <h2 id="anatomy-title" className={shared.h2}>
              {ANATOMY.title}
            </h2>
            <p className={shared.lead}>{ANATOMY.body}</p>
          </div>
          <ul className={`${shared.card} ${styles.anatomyCard}`}>
            {ANATOMY.items.map((item, i) => {
              const Icon = ANATOMY_ICONS[i];
              return (
                <li key={item.title} className={styles.anatomyItem}>
                  <span className={styles.anatomyIcon} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className={styles.anatomyTitle}>{item.title}</p>
                    <p className={styles.anatomyText}>{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Steps id="apply-steps-title" title={STEPS.title} items={STEPS.items} alt />

      <Callout id="stay-safe-title" icon="shield" title={STAY_SAFE.title}>
        <p>{STAY_SAFE.body}</p>
        <WhatsAppButton href={LINKS.whatsapp} label={STAY_SAFE.button} />
      </Callout>

      <LinkCards
        id="offering-title"
        title={OFFERING.title}
        cards={[
          {
            ...OFFERING.cards[0],
            icon: <Building size={24} />,
            link: { label: OFFERING.cards[0].link, href: LINKS.forUniversities },
          },
          {
            ...OFFERING.cards[1],
            icon: <Award size={24} />,
            link: { label: OFFERING.cards[1].link, href: LINKS.forInvestors },
          },
        ]}
      />

      <FaqSection content={FAQ} />

      <CtaBandLink
        id="scholarships-cta-title"
        titleStart={CTA.titleStart}
        titleAccent={CTA.titleAccent}
        button={{ label: CTA.button, href: LINKS.seeOpenScholarships }}
        helper={<JoinFreeHelper onDark />}
      />
    </PageShell>
  );
}

export default ScholarshipsPage;
