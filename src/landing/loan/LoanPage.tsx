import { Footer } from '../components/Footer.tsx';
import { Navbar } from '../components/Navbar.tsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts';
import { focusLight } from '../lib/styles.ts';
import '../styles/landing-fonts.css';
import { BeforeYouApply } from './components/loan/BeforeYouApply';
import { Costs } from './components/loan/Costs';
import { Coverage } from './components/loan/Coverage';
import { CtaBand } from './components/loan/CtaBand';
import { Faq } from './components/loan/Faq';
import { ForParents } from './components/loan/ForParents';
import { Hero } from './components/loan/Hero';
import { HowItWorks } from './components/loan/HowItWorks';
import { WhoProvides } from './components/loan/WhoProvides';
import { PAGE_META } from './data/loan';
import './styles/loan.css';

const skipLink = `sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-at-navy focus:px-4 focus:py-3 focus:font-semibold focus:text-white ${focusLight}`;

/**
 * Finances > Loans page at /finances/loans.
 * Uses the landing page's navbar and footer, so every public page shares one menu.
 * The page's own styles are scoped to the .at-loan wrapper on <main>.
 */
export function LoanPage() {
  useDocumentMeta(PAGE_META);

  return (
    <div className="min-h-dvh overflow-x-clip bg-white font-at-body text-at-ink antialiased">
      <a href="#main" className={skipLink}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="at-loan focus:outline-none">
        <Hero />
        <WhoProvides />
        <Coverage />
        <Costs />
        <HowItWorks />
        <BeforeYouApply />
        <ForParents />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}

// Default export so App.tsx can lazy-load it like the other pages.
export default LoanPage;
