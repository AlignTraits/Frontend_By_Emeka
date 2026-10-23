import cx from 'classnames';
import { ChevronDown } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { NAV, NAV_CTA, NAV_LOGIN } from '../data/landing-content.ts';
import type { LinkItem } from '../data/types.ts';
import { useDrawerA11y } from '../hooks/useDrawerA11y.ts';
import { focusLight } from '../lib/styles.ts';
import { SmartLink } from './ui/SmartLink.tsx';

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  /** The hamburger button, so focus can return to it. */
  toggleRef: RefObject<HTMLButtonElement>;
  /** Id referenced by the hamburger button's aria-controls. */
  id: string;
}

const row =
  'flex min-h-12 w-full items-center justify-between rounded-lg px-2 text-left text-[17px] font-medium leading-6 text-at-ink';

interface DrawerGroupProps {
  label: string;
  items: readonly LinkItem[];
  onNavigate: () => void;
}

function DrawerGroup({ label, items, onNavigate }: DrawerGroupProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-b-2 border-at-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cx(row, focusLight)}
      >
        {label}
        <ChevronDown
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className={cx('transition-transform motion-reduce:transition-none', open && 'rotate-180')}
        />
      </button>
      {open ? (
        <ul id={panelId} className="pb-2 pl-4">
          {items.map((item) => (
            <li key={item.label}>
              <SmartLink
                href={item.href}
                onClick={onNavigate}
                className={cx(
                  'flex min-h-11 items-center rounded-lg px-2 text-[15px] leading-6 text-at-warm',
                  focusLight,
                )}
              >
                {item.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/**
 * Full-height drawer under the sticky bar, below the lg breakpoint.
 * Scroll lock, focus trap, Escape and outside-tap closing live in useDrawerA11y.
 */
export function MobileNavDrawer({ open, onClose, toggleRef, id }: MobileNavDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useDrawerA11y({ open, onClose, drawerRef, toggleRef });

  if (!open) return null;

  return (
    <div
      id={id}
      ref={drawerRef}
      className="fixed inset-x-0 bottom-0 top-[calc(66px+env(safe-area-inset-top))] z-40 flex flex-col bg-white lg:hidden"
    >
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 pt-2 sm:px-6">
        <ul>
          {NAV.map((entry) =>
            entry.kind === 'menu' ? (
              <DrawerGroup key={entry.label} label={entry.label} items={entry.items} onNavigate={onClose} />
            ) : (
              <li key={entry.label} className="border-b-2 border-at-line">
                <SmartLink href={entry.href} onClick={onClose} className={cx(row, focusLight)}>
                  {entry.label}
                </SmartLink>
              </li>
            ),
          )}
          <li className="border-b-2 border-at-line">
            <SmartLink href={NAV_LOGIN.href} onClick={onClose} className={cx(row, focusLight)}>
              {NAV_LOGIN.label}
            </SmartLink>
          </li>
        </ul>
      </nav>

      <div className="shrink-0 border-t-2 border-at-line bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
        <SmartLink
          href={NAV_CTA.href}
          onClick={onClose}
          className={cx(
            'flex h-12 w-full items-center justify-center rounded-lg bg-at-navy text-[16px] font-medium text-white',
            focusLight,
          )}
        >
          {NAV_CTA.label}
        </SmartLink>
      </div>
    </div>
  );
}
