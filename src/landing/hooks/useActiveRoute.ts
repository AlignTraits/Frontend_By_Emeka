import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Tells the navbar which link belongs to the page on screen, so it can be shown in Blue 600.
 * A link is active on its own path and on any path under it ("/finances/loans/..." keeps Loans
 * active). "#" placeholders and the home link are never active.
 */
export function useActiveRoute() {
  const { pathname } = useLocation();
  return useCallback(
    (href: string) => {
      if (!href.startsWith('/') || href === '/') return false;
      const path = pathname.replace(/\/+$/, '') || '/';
      return path === href || path.startsWith(`${href}/`);
    },
    [pathname],
  );
}
