import type { ReactNode } from 'react';
import { Footer } from '../../components/Footer.tsx';
import { Navbar } from '../../components/Navbar.tsx';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.ts';
import { focusLight } from '../../lib/styles.ts';
import '../../styles/landing-fonts.css';
import '../../loan/styles/loan.css';

const skipLink = `sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-at-navy focus:px-4 focus:py-3 focus:font-semibold focus:text-white ${focusLight}`;

interface PageShellProps {
  meta: { title: string; description: string };
  children: ReactNode;
}

/**
 * Frame shared by the Finances pages: the landing page navbar and footer, the brand fonts,
 * the page title, and the scoped page styles (the .at-loan wrapper from the Loan page).
 */
export function PageShell({ meta, children }: PageShellProps) {
  useDocumentMeta(meta);

  return (
    <div className="min-h-dvh overflow-x-clip bg-white font-at-body text-at-ink antialiased">
      <a href="#main" className={skipLink}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="at-loan focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
