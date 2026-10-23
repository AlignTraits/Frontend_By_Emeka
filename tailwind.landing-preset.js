/**
 * AlignTraits landing page design tokens, measured from the supplied design (1440px reference).
 *
 * Everything is namespaced `at-*` and added under `theme.extend`, so no existing token in the
 * host project is replaced and Tailwind's default `screens` (md 768, lg 1024, xl 1280) are
 * untouched.
 *
 * Use it as a preset:   presets: [landingPreset]
 * or merge `theme.extend` by hand into an existing tailwind.config.js.
 *
 * Large type is fluid: it equals the design at 1440px and scales down linearly to a phone-sized
 * minimum at 375px (see `fluid`). Small type (14-22px) is fixed, as in the design.
 */
import plugin from 'tailwindcss/plugin';

/**
 * CSS clamp() that interpolates linearly between `min` px at `minVw` and `max` px at `maxVw`,
 * and holds at either end. Returns a CSS length.
 */
const fluid = (min, max, minVw = 375, maxVw = 1440) => {
  const slope = (max - min) / (maxVw - minVw);
  const intercept = min - slope * minVw;
  return `clamp(${min}px, ${intercept.toFixed(3)}px + ${(slope * 100).toFixed(4)}vw, ${max}px)`;
};

/**
 * Soft left and right edge for the logo strip. In the design the first and last logos fade in and
 * out along an eased (smoothstep) ramp that is 10% of the strip wide on each side; sampled here as
 * mask stops so it needs no image.
 */
const smoothstep = (t) => t * t * (3 - 2 * t);
const FADE_PERCENT = 10;
const fadeRamp = Array.from({ length: FADE_PERCENT + 1 }, (_, i) => i);
const FADE_MASK = `linear-gradient(to right, ${[
  ...fadeRamp.map((i) => `rgba(0,0,0,${smoothstep(i / FADE_PERCENT).toFixed(3)}) ${i}%`),
  ...[...fadeRamp].reverse().map((i) => `rgba(0,0,0,${smoothstep(i / FADE_PERCENT).toFixed(3)}) ${100 - i}%`),
].join(', ')})`;

export default {
  theme: {
    extend: {
      colors: {
        'at-navy': '#004085', // headline, primary buttons
        'at-ink': '#0a1633', // dark sections, dark text on white
        'at-panel': '#12224a', // cards on ink
        'at-badge': '#1b2e5e', // pill on the navy collage panel
        'at-blue': '#1d6fe0', // quote bars, FAQ icons
        'at-sky': '#9cc4ff', // links and highlight on ink
        'at-gold': '#f5b301', // hero dots, the key statistic
        'at-amber': '#f5a623', // card icons, final call to action
        'at-warm': '#5e5d59', // nav, hero copy
        'at-warm-line': '#e8e6dc', // header rule
        'at-slate': '#5b6680', // body copy on white
        'at-line': '#e3e8f2', // hairlines
        'at-mist': '#f5f7fb', // callout and footer surface
        'at-caption': '#a9aeb8', // line under the video
        'at-frame': '#0b0f17', // video frame
        'at-glyph': '#d9d9d9', // play triangle
        // Match tags: [background, text]
        'at-reach-bg': '#fff4e0',
        'at-reach-fg': '#9a5b00',
        'at-real-bg': '#eaf2ff',
        'at-real-fg': '#1659b8',
        'at-safe-bg': '#e3f6ef',
        'at-safe-fg': '#0f8a66',
        'at-success': '#0f8a66',
      },
      fontFamily: {
        'at-head': ['"AT Lexend"', 'Lexend', 'system-ui', 'sans-serif'],
        'at-body': ['"AT Inter"', 'Inter', 'system-ui', 'sans-serif'],
        'at-caption': ['"AT Open Sans"', '"Open Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Headings: [size, { lineHeight, letterSpacing }]
        'at-h1': [fluid(34, 72), { lineHeight: fluid(38, 75), letterSpacing: '-0.02em' }],
        'at-h2': [fluid(30, 44), { lineHeight: fluid(34, 40), letterSpacing: '-0.025em' }],
        'at-h2-cta': [fluid(32, 52), { lineHeight: fluid(36, 40), letterSpacing: '-0.025em' }],
        'at-h2-stats': [fluid(32, 59.6), { lineHeight: fluid(37, 66) }],
        'at-stat-xl': [fluid(56, 89.4), { lineHeight: '1' }],
        'at-stat-lg': [fluid(40, 59.6), { lineHeight: '1' }],
        // Body copy that scales a little on small screens
        'at-lead': [fluid(17, 21), { lineHeight: fluid(28, 34) }],
        'at-body-lg': [fluid(16, 18), { lineHeight: fluid(26, 29.52) }],
        'at-stat-intro': [fluid(17, 19.9), { lineHeight: fluid(27, 30) }],
        'at-stat-text-xl': [fluid(18, 22.3), { lineHeight: fluid(28, 36.3) }],
        'at-stat-text': [fluid(16, 19.9), { lineHeight: fluid(26, 32.4) }],
      },
      maxWidth: {
        'at-page': '1216px', // 112px side margins at 1440px
        'at-hero': '1160px', // video frame
      },
      keyframes: {
        // Steady right-to-left drift. The track holds two identical halves, so -50% loops seamlessly.
        'at-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'at-marquee': 'at-marquee var(--at-marquee-duration, 52s) linear infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        // Balanced wrapping for headings when they have to wrap on small screens.
        '.at-balance': { 'text-wrap': 'balance' },
        // Eased fade on the left and right edge of the logo strip.
        '.at-fade-x': { '-webkit-mask-image': FADE_MASK, 'mask-image': FADE_MASK },
      });
    }),
  ],
};
