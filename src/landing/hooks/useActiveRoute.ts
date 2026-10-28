import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Tells the navbar which link belongs to the page on screen, so it can be shown in Blue 600.
 * A link is active on its own path and on any path under it ("/finances/loans/..." keeps Loans
 * active). "#" placeholders are never active, and "/" is active only on the home page.
 */
export function useActiveRoute() {
  const { pathname } = useLocation();
  return useCallback(
    (href: string) => {
      if (!href.startsWith('/')) return false;
      const path = pathname.replace(/\/+$/, '') || '/';
      const target = href.split(/[?#]/)[0];
      // The home page (Students) is only active on the home page itself.
      if (target === '/') return path === '/';
      return path === target || path.startsWith(`${target}/`);
    },
    [pathname],
  );
}
