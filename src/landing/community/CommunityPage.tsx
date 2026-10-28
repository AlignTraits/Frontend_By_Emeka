import { BookOpen, CalendarDays, CircleCheck, ClipboardList, Gamepad2, Mic, School, ShieldCheck, Trophy, UserCheck, Users } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { SmartLink } from '../components/ui/SmartLink';
import shared from '../loan/components/loan/shared.module.css';
import { ButtonLink } from '../loan/components/ui/Button';
import { ArrowRight } from '../loan/components/ui/Icons';
import { PageShell } from '../finance/components/PageShell';
import { CtaBandLink, FaqSection, Pill, Steps } from '../finance/components/Sections';
import { MessageCircle } from '../finance/components/icons';
import ambassadorsJpg from './assets/ambassadors.jpg';
import ambassadorsWebp from './assets/ambassadors.webp';
import olympicsJpg from './assets/interschool-olympics.jpg';
import olympicsWebp from './assets/interschool-olympics.webp';
import whyJpg from './assets/why-community.jpg';
import whyWebp from './assets/why-community.webp';
import { HeroOrbit } from './HeroOrbit';
import { ACCESS, AMBASSADORS, CTA, FAQ, HERO, HERO_PHOTOS, INSIDE, LINKS, MORE, PAGE_META, POSTS, SAFE, STEPS, WAYS, WHO_FOR, WHY } from './data';
import styles from './Community.module.css';

const icon = { size: 20, strokeWidth: 1.8, 'aria-hidden': true } as const;

const WAY_ICONS: Record<string, ReactNode> = {
  mic: <Mic {...icon} />,
  trophy: <Trophy {...icon} />,
  book: <BookOpen {...icon} />,
  games: <Gamepad2 {...icon} />,
  board: <ClipboardList {...icon} />,
};

const BADGE_ICONS = [<Trophy size={14} key="t" />, <Mic size={14} key="m" />, <BookOpen size={14} key="b" />];

function Photo({ webp, jpg, alt, width, height, className }: { webp: string; jpg: string; alt: string; width: number; height: number; className?: string }) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webp} />
      <img src={jpg} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </picture>
  );
}

function TextLink({ href, children, tone = 'blue' }: { href: string; children: ReactNode; tone?: 'blue' | 'gold' }) {
  return (
    <SmartLink href={href} className={`${styles.textLink} ${tone === 'gold' ? styles.textLinkGold : ''}`}>
      {children}
      <ArrowRight size={14} />
    </SmartLink>
  );
}

/** Community, at /community */
export function CommunityPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  return (
    <PageShell meta={PAGE_META}>
      {/* ---------- Hero ---------- */}
      <section ref={heroRef} className={styles.hero} aria-labelledby="community-hero-title">
        <div ref={heroContentRef} className={styles.heroContent}>
          <h1 id="community-hero-title" className={styles.heroTitle}>
            {HERO.titleStart} <br className={styles.heroBreak} />
            <span className={styles.heroAccent}>{HERO.titleAccent}</span> {HERO.titleEnd}
          </h1>
          <p className={styles.heroSubtitle}>{HERO.subtitle}</p>
          <ButtonLink href={LINKS.join} arrow={false} className={styles.heroCta}>
            {HERO.cta}
          </ButtonLink>
          <p className={styles.heroHelper}>{HERO.helper}</p>
          <ul className={styles.heroPills}>
            {HERO.pills.map((pill) => (
              <li key={pill}>{pill}</li>
            ))}
          </ul>
        </div>
        <HeroOrbit photos={HERO_PHOTOS} contentRef={heroContentRef} stageRef={heroRef} />
      </section>

      {/* ---------- Why a community ---------- */}
      <section className={`${shared.section} ${shared.alt}`} aria-labelledby="why-title">
        <div className={`at-loan-container ${styles.whyGrid}`}>
          <div className={styles.whyMedia}>
            <Photo webp={whyWebp} jpg={whyJpg} alt={WHY.imageAlt} width={928} height={984} className={styles.whyPhoto} />
            {WHY.badges.map((badge, i) => (
              <span key={badge} className={`${styles.badge} ${styles[`badge${i}`]}`}>
                <span className={styles.badgeIcon} aria-hidden="true">
                  {BADGE_ICONS[i]}
                </span>
                {badge}
              </span>
            ))}
          </div>
          <div>
            <h2 id="why-title" className={shared.h2}>
              {WHY.title}
            </h2>
            <p className={styles.body}>{WHY.body}</p>
            <figure className={styles.quote}>
              <blockquote>
                <p>{WHY.quote}</p>
              </blockquote>
              <figcaption>{WHY.quoteSource}</figcaption>
            </figure>
            <p className={styles.body}>{WHY.body2}</p>
            <p className={styles.source}>{WHY.source}</p>
          </div>
        </div>
      </section>

      {/* ---------- What is inside (feature cards) ---------- */}
      <section className={shared.section} aria-labelledby="inside-title">
        <div className="at-loan-container">
          <h2 id="inside-title" className={shared.h2}>
            {INSIDE.title}
          </h2>
          <div className={styles.insideGrid}>
            <article className={styles.olympics}>
              <Photo
                webp={olympicsWebp}
                jpg={olympicsJpg}
                alt={INSIDE.olympics.imageAlt}
                width={1376}
                height={768}
                className={styles.olympicsPhoto}
              />
              <div className={styles.olympicsBody}>
                <span className={styles.darkTag}>{INSIDE.olympics.pill}</span>
                <h3 className={styles.olympicsTitle}>{INSIDE.olympics.title}</h3>
                <p className={styles.olympicsText}>
                  {INSIDE.olympics.bodyStart} <strong>{INSIDE.olympics.date}</strong>
                  {INSIDE.olympics.bodyEnd}
                </p>
              </div>
            </article>

            <article className={styles.board}>
              <span className={styles.liveBar}>
                <span className={styles.liveDot} aria-hidden="true" />
                {INSIDE.board.pill}
              </span>
              <h3 className={styles.boardTitle}>{INSIDE.board.title}</h3>
              <p className={styles.boardText}>{INSIDE.board.body}</p>
              <p className={styles.exampleLabel}>{INSIDE.board.exampleLabel}</p>
              <div className={styles.example}>
                <p className={styles.exampleType}>{INSIDE.board.example.type}</p>
                <p className={styles.exampleTitle}>{INSIDE.board.example.title}</p>
                <dl className={styles.exampleRows}>
                  {INSIDE.board.example.rows.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </div>

          <ul className={styles.columns}>
            {INSIDE.columns.map((col) => (
              <li key={col.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{col.title}</h3>
                <p className={styles.columnText}>{col.body}</p>
                <Pill tone={col.pill.tone} dot={col.pill.dot}>
                  {col.pill.label}
                </Pill>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Ambassadors ---------- */}
      <section className={`${shared.section} ${shared.alt}`} aria-labelledby="ambassadors-title">
        <div className={`at-loan-container ${styles.ambGrid}`}>
          <div>
            <p className={styles.ambEyebrow}>{AMBASSADORS.eyebrow}</p>
            <h2 id="ambassadors-title" className={styles.ambTitle}>
              {AMBASSADORS.title}
            </h2>
            <p className={styles.ambBody}>{AMBASSADORS.body}</p>
            <p className={styles.ambStrong}>{AMBASSADORS.strong}</p>
            <ButtonLink href={LINKS.applyAmbassador} className={styles.ambCta}>
              {AMBASSADORS.cta}
            </ButtonLink>
            <p className={styles.ambHelper}>{AMBASSADORS.helper}</p>
            <ul className={styles.ambPoints}>
              {AMBASSADORS.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <Photo
            webp={ambassadorsWebp}
            jpg={ambassadorsJpg}
            alt={AMBASSADORS.imageAlt}
            width={928}
            height={1152}
            className={styles.ambPhoto}
          />
        </div>
      </section>

      {/* ---------- What is inside (five ways) ---------- */}
      <section className={`${shared.section} ${styles.ways}`} aria-labelledby="ways-title">
        <div className="at-loan-container">
          <div className={styles.waysHead}>
            <h2 id="ways-title" className={`${shared.h2} ${styles.onDark}`}>
              {WAYS.title}
            </h2>
            <p className={styles.waysIntro}>{WAYS.body}</p>
          </div>
          <ul className={styles.waysGrid}>
            {WAYS.cards.map((card) => (
              <li key={card.title} className={`${styles.wayCard} ${'wide' in card ? styles.wayCardWide : ''}`}>
                <div className={styles.wayTop}>
                  <span className={styles.wayIcon}>{WAY_ICONS[card.icon]}</span>
                  <Pill tone={card.pill.tone} onDark>
                    {card.pill.label}
                  </Pill>
                </div>
                <h3 className={styles.wayTitle}>{card.title}</h3>
                <p className={styles.wayText}>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Every opportunity, posted once ---------- */}
      <section className={shared.section} aria-labelledby="posts-title">
        <div className="at-loan-container">
          <div className={styles.postsHead}>
            <div>
              <h2 id="posts-title" className={shared.h2}>
                {POSTS.title}
              </h2>
              <p className={styles.postsIntro}>{POSTS.body}</p>
            </div>
            <span className={styles.sampleTag}>{POSTS.tag}</span>
          </div>
          <ul className={styles.postsPanel}>
            {POSTS.items.map((post) => (
              <li key={post.title} className={styles.post}>
                <span className={`${styles.postType} ${styles[`postType_${post.tone}`]}`}>{post.type}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postBy}>{post.by}</p>
                <dl className={styles.postRows}>
                  <div>
                    <dt>
                      <Users size={16} aria-hidden="true" />
                      {POSTS.whoLabel}
                    </dt>
                    <dd>{post.who}</dd>
                  </div>
                  <div>
                    <dt>
                      <CalendarDays size={16} aria-hidden="true" />
                      {POSTS.deadlineLabel}
                    </dt>
                    <dd>{post.deadline}</dd>
                  </div>
                </dl>
                <p className={styles.postSource}>
                  <CircleCheck size={15} aria-hidden="true" />
                  {POSTS.source}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Who it is for ---------- */}
      <section className={shared.section} aria-labelledby="who-title">
        <div className="at-loan-container">
          <div className={styles.whoBox}>
            <div>
              <h2 id="who-title" className={shared.h2}>
                {WHO_FOR.title}
              </h2>
              <p className={styles.whoText}>{WHO_FOR.body}</p>
            </div>
            <ul className={styles.whoChips}>
              {WHO_FOR.groups.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Free for everyone, more for partner schools ---------- */}
      <section className={shared.section} aria-labelledby="access-title">
        <div className="at-loan-container">
          <h2 id="access-title" className={`${shared.h2} ${styles.accessTitle}`}>
            {ACCESS.title}
          </h2>
          <ul className={styles.pair}>
            <li className={styles.lightCard}>
              <span className={styles.cardIconLight}>
                <UserCheck {...icon} />
              </span>
              <h3 className={styles.cardTitle}>{ACCESS.free.title}</h3>
              <p className={styles.cardText}>{ACCESS.free.body}</p>
              <TextLink href={LINKS.join}>{ACCESS.free.link}</TextLink>
            </li>
            <li className={styles.darkCard}>
              <span className={styles.cardIconDark}>
                <School {...icon} />
              </span>
              <h3 className={`${styles.cardTitle} ${styles.onDark}`}>{ACCESS.partner.title}</h3>
              <p className={`${styles.cardText} ${styles.onDarkMuted}`}>{ACCESS.partner.body}</p>
              <TextLink href={LINKS.forSchools} tone="gold">
                {ACCESS.partner.link}
              </TextLink>
            </li>
          </ul>
        </div>
      </section>

      <Steps id="community-steps-title" title={STEPS.title} items={STEPS.items} />

      {/* ---------- Insider and ambassador ---------- */}
      <section className={shared.section} aria-label="More ways in">
        <div className="at-loan-container">
          <ul className={`${styles.pair} ${styles.pairFlush}`}>
            <li className={styles.insiderCard}>
              <h2 className={styles.moreTitle}>{MORE.insider.title}</h2>
              <p className={styles.cardText}>{MORE.insider.body}</p>
              <ButtonLink href={LINKS.insiders} className={styles.moreCta}>
                {MORE.insider.cta}
              </ButtonLink>
            </li>
            <li className={styles.darkCard}>
              <h2 className={`${styles.moreTitle} ${styles.onDark}`}>{MORE.ambassador.title}</h2>
              <p className={`${styles.cardText} ${styles.onDarkMuted}`}>{MORE.ambassador.body}</p>
              <ButtonLink href={LINKS.applyAmbassador} variant="gold" className={styles.moreCta}>
                {MORE.ambassador.cta}
              </ButtonLink>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Safe by design ---------- */}
      <section className={shared.section} aria-labelledby="safe-title">
        <div className="at-loan-container">
          <div className={styles.safeBox}>
            <div>
              <span className={styles.safeIcon} aria-hidden="true">
                <ShieldCheck size={22} strokeWidth={1.8} />
              </span>
              <h2 id="safe-title" className={`${shared.h2} ${styles.safeTitle}`}>
                {SAFE.title}
              </h2>
            </div>
            <div>
              <p className={styles.safeLead}>{SAFE.lead}</p>
              <p className={styles.safeText}>{SAFE.body}</p>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.safeLink}>
                <MessageCircle size={16} />
                {SAFE.link}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBandLink
        id="community-cta-title"
        titleStart={CTA.titleStart}
        titleAccent={CTA.titleAccent}
        button={{ label: CTA.button, href: LINKS.applyAmbassador }}
        helper={CTA.helper}
      />

      <FaqSection content={FAQ} />
    </PageShell>
  );
}

export default CommunityPage;
