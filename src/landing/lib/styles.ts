/**
 * Shared class strings, built only from the tokens in tailwind.landing-preset.js.
 * Kept here so layout and focus rules are defined once.
 */

/**
 * Page column: 1216px wide at the 1440px design (112px margins), 16px margins on phones,
 * growing to 32px. Content never touches the screen edge.
 */
export const pageColumn = 'mx-auto w-full max-w-at-page px-4 sm:px-6 lg:px-8 xl:px-0';

/** Visible focus ring: 2px blue with offset on light backgrounds, white on the dark ink. */
export const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-at-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white';
export const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-at-ink';
