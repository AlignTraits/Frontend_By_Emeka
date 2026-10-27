import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Stroke>
);

export const ChevronDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);

export const ShieldCheck = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);

export const CheckCircle = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);

export const MinusCircle = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
  </Stroke>
);

export const Check = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Stroke>
);

export const Plus = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Stroke>
);

export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Stroke>
);

export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </Stroke>
);

/* Social marks (filled) */
function Fill({ size = 18, children, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

export const LinkedIn = (p: IconProps) => (
  <Fill {...p}>
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.5 13.4c0-3.1-1.65-5.15-4.36-5.15-1.56 0-2.6.86-3.03 1.66V8.5H9.86V20h3.38v-5.7c0-1.5.28-2.96 2.14-2.96 1.83 0 1.86 1.72 1.86 3.06V20h3.26v-6.6Z" />
  </Fill>
);

export const Instagram = (p: IconProps) => (
  <Fill {...p}>
    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm5.1-4.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" fillRule="evenodd" />
  </Fill>
);

export const XLogo = (p: IconProps) => (
  <Fill {...p}>
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
  </Fill>
);

export const Facebook = (p: IconProps) => (
  <Fill {...p}>
    <path d="M13.5 21v-7.6h2.56l.38-2.97H13.5V8.54c0-.86.24-1.45 1.47-1.45h1.57V4.43a21 21 0 0 0-2.29-.12c-2.27 0-3.82 1.38-3.82 3.93v2.19H7.86v2.97h2.57V21h3.07Z" />
  </Fill>
);
