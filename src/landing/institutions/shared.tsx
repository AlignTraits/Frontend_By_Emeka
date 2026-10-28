/*
  Pieces shared by the Institutions pages (For Schools, For Universities, Tutorial centres).
*/
import { MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { ROUTES } from '../data/routes';
import shared from '../loan/components/loan/shared.module.css';
import { ButtonLink } from '../loan/components/ui/Button';
import f from '../finance/components/finance.module.css';
import s from './institutions.module.css';

export type InstitutionType = 'school' | 'university' | 'tutorial';

/** Every partner and pilot button opens the pilot form, with the institution type filled in. */
export const pilotHref = (type: InstitutionType) => `${ROUTES.requestPilot}?type=${type}`;

interface PhotoProps {
  webp: string;
  jpg: string;
  /** Larger versions for wide or sharp screens. */
  webp2x?: string;
  jpg2x?: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
  sizes?: string;
}

export function Photo({ webp, jpg, webp2x, jpg2x, alt, width, height, eager = false, sizes }: PhotoProps) {
  const set = (one: string, two?: string) => (two ? `${one} ${width}w, ${two} ${Math.round(width * 1.414)}w` : undefined);
  return (
    <picture>
      <source type="image/webp" srcSet={set(webp, webp2x) ?? webp} sizes={sizes} />
      <img
        src={jpg}
        srcSet={set(jpg, jpg2x)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}

/** The wide photo under each hero, with optional place pins. */
export function HeroPhoto({ photo, pins }: { photo: PhotoProps; pins?: { label: string; style: React.CSSProperties }[] }) {
  return (
    <div className={s.heroPhoto}>
      <Photo {...photo} eager sizes="(max-width: 1168px) 100vw, 1120px" />
      {pins?.map((pin) => (
        <span key={pin.label} className={s.pin} style={pin.style} aria-hidden="true">
          <MapPin size={15} />
          {pin.label}
        </span>
      ))}
    </div>
  );
}

/** Navy section with two or three cards, each with a gold icon. */
export function NavyCards({
  id,
  title,
  cards,
  columns = 3,
}: {
  id: string;
  title: string;
  cards: { icon: ReactNode; title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <section className={`${shared.section} ${f.panel}`} aria-labelledby={id}>
      <div className="at-loan-container">
        <h2 id={id} className={`${shared.h2} ${s.onDark}`}>
          {title}
        </h2>
        <ul className={`${s.navyGrid} ${columns === 2 ? s.navyGrid2 : ''}`}>
          {cards.map((card) => (
            <li key={card.title} className={s.navyCard}>
              <span className={s.navyIcon} aria-hidden="true">
                {card.icon}
              </span>
              <h3 className={s.navyCardTitle}>{card.title}</h3>
              <p className={s.navyCardText}>{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Light blue band: "Not a partner yet? Start with a pilot." */
export function PilotBand({ id, title, body, button }: { id: string; title: string; body: string; button: { label: string; href: string } }) {
  return (
    <section className={shared.section} aria-labelledby={id}>
      <div className="at-loan-container">
        <div className={s.pilotBand}>
          <div>
            <h2 id={id} className={s.pilotBandTitle}>
              {title}
            </h2>
            <p className={s.pilotBandText}>{body}</p>
          </div>
          <ButtonLink href={button.href}>{button.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
