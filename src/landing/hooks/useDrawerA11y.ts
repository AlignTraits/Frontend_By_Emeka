import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DrawerA11yOptions {
  open: boolean;
  onClose: () => void;
  drawerRef: RefObject<HTMLElement>;
  /** The hamburger button. It stays inside the focus loop so the drawer can always be closed. */
  toggleRef: RefObject<HTMLElement>;
}

/**
 * Accessibility behaviour for the mobile drawer: locks page scroll, moves focus into the
 * drawer, traps Tab, closes on Escape, on a tap outside, or when the viewport grows to
 * desktop width, and returns focus to the hamburger button on close.
 */
export function useDrawerA11y({ open, onClose, drawerRef, toggleRef }: DrawerA11yOptions): void {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.classList.add('overflow-hidden');

    const getFocusables = (): HTMLElement[] => {
      const inside = drawerRef.current
        ? Array.from(drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        : [];
      return toggleRef.current ? [toggleRef.current, ...inside] : inside;
    };

    const [, firstInDrawer] = getFocusables();
    firstInDrawer?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = getFocusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const isInside = active !== null && items.includes(active);

      if (event.shiftKey && (!isInside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!isInside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (drawerRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      onCloseRef.current();
    };

    const media = window.matchMedia('(min-width: 1024px)');
    const onMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) onCloseRef.current();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    media.addEventListener('change', onMediaChange);

    const toggle = toggleRef.current;
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      media.removeEventListener('change', onMediaChange);
      root.classList.remove('overflow-hidden');
      toggle?.focus();
    };
  }, [open, drawerRef, toggleRef]);
}
