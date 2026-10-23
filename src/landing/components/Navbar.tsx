import cx from 'classnames';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import logoUrl from '../assets/brand/aligntraits-logo.svg';
import { NAV, NAV_CTA, NAV_LOGIN } from '../data/landing-content.ts';
import { ROUTES } from '../data/routes.ts';
import type { LinkItem } from '../data/types.ts';
import { focusLight } from '../lib/styles.ts';
import { MobileNavDrawer } from './MobileNavDrawer.tsx';
import { SmartLink } from './ui/SmartLink.tsx';

const navItem = cx(
  'inline-flex h-11 items-center gap-1 rounded-md text-[15px] font-normal leading-6 text-at-warm transition-colors hover:text-at-ink motion-reduce:transition-none',
  focusLight,
);

/**
 * Space before each item. At 1280px and wider these are the design's own gaps, measured from
 * the 1440px layout; below that the nav uses an even 28px.
 */
const gapBefore = {
  community: 'ml-7 xl:ml-[72.7px]',
  institutions: 'ml-7 xl:ml-[82.4px]',
  finances: 'ml-7 xl:ml-[75.3px]',
  login: 'ml-7 xl:ml-[41.6px]',
  cta: 'ml-7 xl:ml-[74.2px]',
} as const;

const GAP_BY_LABEL: Record<string, string> = {
  Students: '',
  Community: gapBefore.community,
  Institutions: gapBefore.institutions,
  Finances: gapBefore.finances,
};

interface DesktopDropdownProps {
  label: string;
  items: readonly LinkItem[];
  className?: string;
}

/** Click or keyboard disclosure menu (Enter, Space, Escape). No hover-only behaviour. */
function DesktopDropdown({ label, items, className }: DesktopDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className={cx('relative', className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={navItem}
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={cx('transition-transform motion-reduce:transition-none', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <ul
          id={menuId}
          className="absolute left-0 top-full z-50 mt-1 min-w-56 rounded-xl border-2 border-at-line bg-white p-2 shadow-[0_12px_32px_rgba(10,22,51,0.12)]"
        >
          {items.map((item) => (
            <li key={item.label}>
              <SmartLink
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  'flex min-h-11 items-center rounded-lg px-3 text-[15px] leading-6 text-at-warm hover:bg-at-mist hover:text-at-ink',
                  focusLight,
                )}
              >
                {item.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-at-warm-line bg-white pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 w-full max-w-[1176px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8 xl:px-0">
        <SmartLink
          href={ROUTES.home}
          aria-label="AlignTraits home"
          className={cx('inline-flex h-11 shrink-0 items-center rounded-md', focusLight)}
        >
          <img
            src={logoUrl}
            alt="AlignTraits"
            width={2459}
            height={322}
            className="h-auto w-[168px] sm:w-[190px] xl:h-7 xl:w-[209.6px]"
          />
        </SmartLink>

        <nav aria-label="Main" className="hidden items-center lg:flex xl:pr-[17.3px]">
          {NAV.map((entry) =>
            entry.kind === 'menu' ? (
              <DesktopDropdown
                key={entry.label}
                label={entry.label}
                items={entry.items}
                className={GAP_BY_LABEL[entry.label]}
              />
            ) : (
              <SmartLink
                key={entry.label}
                href={entry.href}
                className={cx(navItem, GAP_BY_LABEL[entry.label])}
              >
                {entry.label}
              </SmartLink>
            ),
          )}
          <SmartLink href={NAV_LOGIN.href} className={cx(navItem, gapBefore.login)}>
            {NAV_LOGIN.label}
          </SmartLink>
          <SmartLink
            href={NAV_CTA.href}
            className={cx(
              'inline-flex h-[39px] items-center rounded-lg bg-at-navy px-4 text-[15px] font-medium leading-6 text-white transition-colors hover:bg-[#00336a] motion-reduce:transition-none',
              focusLight,
              gapBefore.cta,
            )}
          >
            {NAV_CTA.label}
          </SmartLink>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setDrawerOpen((value) => !value)}
          className={cx(
            '-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-at-navy hover:bg-at-mist lg:hidden',
            focusLight,
          )}
        >
          {drawerOpen ? (
            <X size={24} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Menu size={24} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>

      <MobileNavDrawer id={drawerId} open={drawerOpen} onClose={closeDrawer} toggleRef={toggleRef} />
    </header>
  );
}
