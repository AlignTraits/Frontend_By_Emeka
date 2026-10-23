/** Shared types for the landing page content and components. */

export type MatchLevel = 'reach' | 'realistic' | 'safety';

export interface LinkItem {
  label: string;
  /** "/path" renders as a react-router <Link>; anything else (including "#") as a plain <a>. */
  href: string;
}

export type NavEntry =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'menu'; label: string; items: readonly LinkItem[] };

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export type PlatformIcon = 'community' | 'schools' | 'universities' | 'finances';
export type SocialPlatform = 'linkedin' | 'instagram' | 'tiktok' | 'facebook';

export interface PlatformCardContent {
  id: string;
  icon: PlatformIcon;
  title: string;
  body: string;
  link: LinkItem;
}

export interface UniversityLogo {
  id: string;
  /** Empty when the school could not be identified from the logo; the image is then described generically. */
  name: string;
  logoSrc: string;
}

export interface QuoteContent {
  quote: string;
  attribution: string;
}

export interface TrustRow {
  id: string;
  title: string;
  body: string;
}

export interface SnapshotRow {
  level: MatchLevel;
  tag: string;
  course: string;
  /** Naira per year. */
  feePerYear: number;
}

export interface MatchSnapshot {
  eyebrow: string;
  utmeScore: number;
  /** Naira per year. */
  budgetPerYear: number;
  rows: readonly SnapshotRow[];
}

export interface StatContent {
  id: string;
  figure: string;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterColumn {
  heading: string;
  links: readonly LinkItem[];
}

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

/** One playable file of the hero video (see HERO_VIDEO). */
export interface VideoSource {
  src: string;
  type: string;
}
