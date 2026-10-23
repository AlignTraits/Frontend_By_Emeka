import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { HeroVideoConfig } from '../data/landing-content.ts';
import { focusDark } from '../lib/styles.ts';

type Status = 'loading' | 'playing' | 'paused' | 'unavailable';

/** Reduced-motion and Save-Data visitors get the still frame; one tap starts the video. */
function prefersStillFrame(): boolean {
  if (typeof window === 'undefined') return false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return reduceMotion || connection?.saveData === true;
}

/** The design's play button: a 64px warm-grey disc with a rounded light triangle. */
function PlayGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-at-warm sm:h-16 sm:w-16"
    >
      <svg
        viewBox="0 0 21.1 26.3"
        className="h-auto w-[15.8px] translate-x-[2px] sm:w-[21.1px] sm:translate-x-[2.5px]"
        focusable="false"
      >
        <path
          d="M2 2 L2 24.3 L19.1 13.15 Z"
          fill="#d9d9d9"
          stroke="#d9d9d9"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

interface HeroVideoProps {
  config: HeroVideoConfig;
}

/**
 * The hero video. It starts by itself as soon as the page loads, muted and looping, because
 * muted video is the only kind browsers allow to autoplay. It never waits for a click.
 *
 * - Tap or click the video to pause or resume it.
 * - If no source can play, the frame stays as designed and the play button opens the shared
 *   Drive link in a new tab.
 * - Visitors who ask for reduced motion (or Save-Data) see the still frame and one tap plays.
 */
export function HeroVideo({ config }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  // Decided once, before the first paint, so the `autoplay` attribute is never set for these visitors.
  const [stillFrame] = useState(prefersStillFrame);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably write the `muted` attribute, and browsers only autoplay muted video.
    video.muted = true;
    video.defaultMuted = true;

    if (stillFrame) {
      video.pause();
      setStatus('paused');
      return;
    }

    const attempt = video.play();
    if (attempt !== undefined) {
      attempt.catch(() => {
        // Autoplay refused (battery saver, strict browser settings): show the play button.
        setStatus((current) => (current === 'unavailable' ? current : 'paused'));
      });
    }
  }, [stillFrame]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setStatus('paused'));
    } else {
      video.pause();
    }
  }, []);

  const lastIndex = config.sources.length - 1;

  return (
    <div className="relative isolate aspect-[1160/640.5] w-full overflow-hidden rounded-2xl bg-at-frame sm:rounded-[24px]">
      <video
        ref={videoRef}
        className={cx(
          'absolute inset-0 h-full w-full object-cover',
          status === 'unavailable' && 'hidden',
        )}
        autoPlay={!stillFrame}
        muted
        loop
        playsInline
        preload="auto"
        poster={config.posterSrc ?? undefined}
        aria-label={config.title}
        onPlaying={() => setStatus('playing')}
        onPause={() => setStatus((current) => (current === 'unavailable' ? current : 'paused'))}
      >
        {config.sources.map((source, index) => (
          <source
            key={source.src}
            src={source.src}
            type={source.type}
            onError={index === lastIndex ? () => setStatus('unavailable') : undefined}
          />
        ))}
      </video>

      {status === 'unavailable' ? (
        <a
          href={config.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('absolute inset-0 z-10 flex items-center justify-center', focusDark)}
        >
          <PlayGlyph />
          <span className="sr-only">{config.title}: watch it in a new tab</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-label={status === 'playing' ? 'Pause video' : 'Play video'}
          className={cx('absolute inset-0 z-10 flex items-center justify-center', focusDark)}
        >
          {status === 'playing' ? null : <PlayGlyph />}
        </button>
      )}
    </div>
  );
}
