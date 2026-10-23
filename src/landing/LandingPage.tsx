import { DecisionSection } from './components/DecisionSection.tsx';
import { FaqAccordion } from './components/FaqAccordion.tsx';
import { FinalCta } from './components/FinalCta.tsx';
import { Footer } from './components/Footer.tsx';
import { Hero } from './components/Hero.tsx';
import { Navbar } from './components/Navbar.tsx';
import { PlatformCards } from './components/PlatformCards.tsx';
import { ResearchStats } from './components/ResearchStats.tsx';
import { TrustSection } from './components/TrustSection.tsx';
import { PAGE_META, SKIP_LINK_LABEL } from './data/landing-content.ts';
import { useDocumentMeta } from './hooks/useDocumentMeta.ts';
import { focusLight } from './lib/styles.ts';
import './styles/landing-fonts.css';

const skipLink = `sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-at-navy focus:px-4 focus:py-3 focus:font-semibold focus:text-white ${focusLight}`;

/**
 * AlignTraits landing page. Fonts and typography are scoped to this wrapper, so other
 * pages in the app are unaffected.
 */
export function LandingPage() {
  useDocumentMeta(PAGE_META);

  return (
    <div className="min-h-dvh overflow-x-clip bg-white font-at-body text-at-ink antialiased">
      <a href="#main" className={skipLink}>
        {SKIP_LINK_LABEL}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <PlatformCards />
        <DecisionSection />
        <TrustSection />
        <ResearchStats />
        <FaqAccordion />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

// Default export so the host app can use its usual `lazy(() => import(...))` pattern.
export default LandingPage;
