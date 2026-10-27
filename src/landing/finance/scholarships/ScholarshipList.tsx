import { useMemo, useState } from 'react';
import { SCHOLARSHIPS, formatDate, getScholarshipStatus } from '../../../data/scholarships';
import shared from '../../loan/components/loan/shared.module.css';
import { Pill, type PillTone } from '../components/Sections';
import { COVER_TYPES, FEATURED, LIST, type CoverType } from './data';
import styles from './Scholarships.module.css';

type Filter = 'All' | CoverType;

interface Card {
  id: string;
  name: string;
  link: string;
  funder: string;
  covers: CoverType[];
  whatItCovers: string;
  whoCanApply: string;
  whatYouNeed: string;
  howToApply: string;
  statusPill: { tone: PillTone; label: string };
  datePill?: { tone: PillTone; label: string };
  order: number;
}

const ORDER = { 'closing-soon': 0, open: 1, 'opens-soon': 2, standing: 4, recurring: 4 } as const;

/** Cards for the featured scholarships, with live status from the dates in src/data/scholarships.ts. */
function buildCards(today: Date): Card[] {
  const cards: Card[] = [];
  FEATURED.forEach((item, index) => {
    const s = SCHOLARSHIPS.find((row) => row.id === item.id);
    if (!s) return;
    const status = getScholarshipStatus(s, today);
    let statusPill: Card['statusPill'];
    let datePill: Card['datePill'];
    switch (status.code) {
      case 'closing-soon':
        statusPill = { tone: 'success', label: 'Open now' };
        datePill = { tone: 'danger', label: `Closes on ${formatDate(s.closes)}` };
        break;
      case 'open':
        statusPill = { tone: 'success', label: 'Open now' };
        datePill = s.closes ? { tone: 'gold', label: `Closes on ${formatDate(s.closes)}` } : undefined;
        break;
      case 'opens-soon':
        statusPill = { tone: 'gold', label: 'Opens soon' };
        datePill = { tone: 'neutral', label: `Opens ${formatDate(s.opens)}` };
        break;
      case 'standing':
        statusPill = { tone: 'success', label: 'Always open' };
        break;
      default:
        statusPill = { tone: 'neutral', label: 'Recurring' };
        datePill = { tone: 'gold', label: item.window };
    }
    cards.push({
      id: s.id,
      name: s.name,
      link: s.link,
      funder: item.funder,
      covers: item.covers,
      whatItCovers: item.whatItCovers,
      whoCanApply: item.whoCanApply,
      whatYouNeed: item.whatYouNeed,
      howToApply: item.howToApply,
      statusPill,
      datePill,
      order: ORDER[status.code] * 100 + index,
    });
  });
  return cards.sort((a, b) => a.order - b.order);
}

export function ScholarshipList() {
  const [filter, setFilter] = useState<Filter>('All');
  const cards = useMemo(() => buildCards(new Date()), []);
  const visible = filter === 'All' ? cards : cards.filter((c) => c.covers.includes(filter));
  const filters: Filter[] = ['All', ...COVER_TYPES];

  return (
    <section className={shared.section} aria-labelledby="scholarship-list-title" id="scholarships">
      <div className="at-loan-container">
        <div className={styles.listHeader}>
          <div>
            <h2 id="scholarship-list-title" className={shared.h2}>
              {LIST.title}
            </h2>
            <p className={styles.listBody}>{LIST.body}</p>
          </div>
          <div className={styles.filters} role="group" aria-label="Filter by what the scholarship covers">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className={`${styles.chip} ${filter === name ? styles.chipActive : ''}`}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className={styles.empty}>{LIST.empty}</p>
        ) : (
          <ul className={styles.grid}>
            {visible.map((card) => (
              <li key={card.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <Pill tone={card.statusPill.tone}>{card.statusPill.label}</Pill>
                  {card.datePill && <Pill tone={card.datePill.tone}>{card.datePill.label}</Pill>}
                </div>
                <h3 className={styles.cardTitle}>{card.name}</h3>
                <p className={styles.funder}>{card.funder}</p>

                <dl className={styles.fields}>
                  <div>
                    <dt>What it covers</dt>
                    <dd>{card.whatItCovers}</dd>
                  </div>
                  <div>
                    <dt>Who can apply</dt>
                    <dd>{card.whoCanApply}</dd>
                  </div>
                  <div>
                    <dt>What you need</dt>
                    <dd>{card.whatYouNeed}</dd>
                  </div>
                  <div>
                    <dt>How to apply</dt>
                    <dd>{card.howToApply}</dd>
                  </div>
                </dl>

                <a href={card.link} target="_blank" rel="noopener noreferrer" className={styles.details}>
                  {LIST.viewDetails}
                  <span className="visually-hidden"> about {card.name} (opens the official page)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
