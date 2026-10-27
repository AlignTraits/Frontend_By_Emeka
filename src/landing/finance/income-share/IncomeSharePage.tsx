import shared from '../../loan/components/loan/shared.module.css';
import { CtaBandForm } from '../components/CtaBandForm';
import { PageShell } from '../components/PageShell';
import { BenefitCards, Callout, FaqSection, PageHero, Pill, Steps, TableCardSection } from '../components/Sections';
import { Compass, HeartHandshake } from '../components/icons';
import f from '../components/finance.module.css';
import { BENEFITS, CTA, EXAMPLE, FAQ, HERO, LINKS, PAGE_META, PROVIDER, STEPS, WHO_FOR } from './data';

/** Finances > Income-Share Plan, at /finances/income-share-plan */
export function IncomeSharePage() {
  return (
    <PageShell meta={PAGE_META}>
      <PageHero
        id="isa-hero-title"
        content={{
          eyebrow: HERO.eyebrow,
          titleStart: HERO.titleStart,
          titleAccent: HERO.titleAccent,
          titleEnd: HERO.titleEnd,
          subtitle: HERO.subtitle,
          note: { icon: 'info', text: HERO.note },
          cta: { label: HERO.cta, href: LINKS.seeIfIQualify },
          helper: HERO.helper,
        }}
      />

      <Steps id="isa-steps-title" title={STEPS.title} items={STEPS.items} />

      <TableCardSection
        id="isa-example-title"
        title={EXAMPLE.title}
        body={EXAMPLE.body}
        cardTitle={EXAMPLE.cardTitle}
        tag={EXAMPLE.tag}
        rows={EXAMPLE.rows}
      />

      <BenefitCards
        id="isa-benefits-title"
        title={BENEFITS.title}
        cards={[
          { ...BENEFITS.cards[0], icon: <Compass size={20} /> },
          { ...BENEFITS.cards[1], icon: <HeartHandshake size={20} /> },
        ]}
      />

      <section className={`${shared.section} ${shared.alt}`} aria-labelledby="isa-who-title">
        <div className={`at-loan-container ${shared.split}`}>
          <div className={f.tagTitle}>
            <Pill tone="neutral">{WHO_FOR.tag}</Pill>
            <h2 id="isa-who-title" className={shared.h2}>
              {WHO_FOR.title}
            </h2>
          </div>
          <p className={f.splitText}>{WHO_FOR.body}</p>
        </div>
      </section>

      <Callout id="isa-provider-title" icon="shield" title={PROVIDER.title} tag={PROVIDER.tag}>
        <p>{PROVIDER.body}</p>
      </Callout>

      <FaqSection content={FAQ} />

      <CtaBandForm content={CTA} />
    </PageShell>
  );
}

export default IncomeSharePage;
