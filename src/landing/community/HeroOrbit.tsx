import { useEffect, useRef, type RefObject } from 'react';
import styles from './Community.module.css';

export interface OrbitPhoto {
  src: string;
  caption: string;
}

interface HeroOrbitProps {
  photos: readonly OrbitPhoto[];
  /** The hero's text block. Tiles fade out before they reach it, so the words stay clear. */
  contentRef: RefObject<HTMLElement>;
  /** Where the tiles move: the whole hero on wide screens. */
  stageRef: RefObject<HTMLElement>;
}

/*
  Moving photo tiles behind the Community hero.

  Wide screens (1024px and up): two elliptical rings around the headline. The outer ring turns
  clockwise and the inner ring anticlockwise. Tiles fade out as they near the text, and every
  few seconds a tile fades out and comes back with a different random photo.
  Narrower screens: one row of smaller tiles under the hero text, drifting left, with the same
  random photo changes.

  The tiles are decorative (aria-hidden). The motion stops when the hero is off screen, and is
  replaced by still tiles when the device asks for reduced motion.
*/

const OUTER_COUNT = 12;
const INNER_COUNT = 10;
const ROW_COUNT = 12;
const OUTER_LAP = 120; // seconds per lap, clockwise
const INNER_LAP = 90; // seconds per lap, anticlockwise
const ROW_SPEED = 18; // pixels per second
const CAPTION = 26; // caption height under each tile
const CLEAR = 28; // space kept between a tile and the hero text

type Ring = 'outer' | 'inner' | 'row';

interface Tile {
  el: HTMLElement;
  img: HTMLImageElement;
  cap: HTMLElement;
  ring: Ring;
  index: number;
  photo: number;
  ready: boolean;
  opacity: number;
  /* Random fade cycle */
  shown: boolean;
  nextChange: number;
  hiddenUntil: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function HeroOrbit({ photos, contentRef, stageRef }: HeroOrbitProps) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbitEl = orbitRef.current;
    const rowEl = rowRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!orbitEl || !rowEl || !stage || !content) return;

    const wideQuery = window.matchMedia('(min-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const collect = (root: HTMLElement, ring: (i: number) => Ring): Tile[] =>
      Array.from(root.querySelectorAll<HTMLElement>('[data-tile]')).map((el, index) => ({
        el,
        img: el.querySelector('img') as HTMLImageElement,
        cap: el.querySelector('figcaption') as HTMLElement,
        ring: ring(index),
        index,
        photo: -1,
        ready: false,
        opacity: 0,
        shown: true,
        nextChange: 0,
        hiddenUntil: 0,
      }));

    const orbitTiles = collect(orbitEl, (i) => (i < OUTER_COUNT ? 'outer' : 'inner'));
    const rowTiles = collect(rowEl, () => 'row');
    /* Inner ring first, so the outer ring can step aside where the two cross. */
    const orbitOrder = [...orbitTiles.filter((t) => t.ring === 'inner'), ...orbitTiles.filter((t) => t.ring === 'outer')];
    const inUse = new Set<number>();

    const release = (tile: Tile) => {
      if (tile.photo >= 0) inUse.delete(tile.photo);
      tile.photo = -1;
      tile.ready = false;
    };

    const assign = (tile: Tile) => {
      release(tile);
      const free = photos.map((_, i) => i).filter((i) => !inUse.has(i));
      const pool = free.length ? free : photos.map((_, i) => i);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      tile.photo = pick;
      inUse.add(pick);
      tile.img.src = photos[pick].src;
      tile.cap.textContent = photos[pick].caption;
      const done = () => {
        if (tile.photo === pick) tile.ready = true;
      };
      if (tile.img.decode) tile.img.decode().then(done, done);
      else done();
    };

    /* ---------- Geometry ---------- */
    let mode: 'orbit' | 'row' = wideQuery.matches ? 'orbit' : 'row';
    let reduced = motionQuery.matches;
    const geo = {
      w: 0,
      h: 0,
      cx: 0,
      cy: 0,
      half: 0,
      textTop: 0,
      textBottom: 0,
      inner: 0,
      outer: 0,
      innerRx: 0,
      innerRy: 0,
      outerRx: 0,
      outerRy: 0,
      rowW: 0,
      rowTile: 0,
      rowGap: 0,
    };

    const measure = () => {
      if (mode === 'orbit') {
        const s = stage.getBoundingClientRect();
        /* The text block's real width: the widest of its lines, not its max-width box. */
        let left = Infinity;
        let right = -Infinity;
        let top = Infinity;
        let bottom = -Infinity;
        for (const child of Array.from(content.children)) {
          const r = child.getBoundingClientRect();
          if (!r.width) continue;
          const range = document.createRange();
          range.selectNodeContents(child);
          const t = range.getBoundingClientRect();
          const box = t.width ? t : r;
          left = Math.min(left, box.left);
          right = Math.max(right, box.right);
          top = Math.min(top, r.top);
          bottom = Math.max(bottom, r.bottom);
        }
        geo.w = s.width;
        geo.h = s.height;
        geo.cx = (left + right) / 2 - s.left;
        geo.cy = (top + bottom) / 2 - s.top;
        geo.half = (right - left) / 2;
        geo.textTop = top - s.top;
        geo.textBottom = bottom - s.top;
        const big = geo.w >= 1280;
        geo.inner = big ? 116 : 96;
        geo.outer = big ? 100 : 84;
        const side = Math.max(0, geo.w / 2 - geo.half);
        geo.innerRx = geo.half + side * 0.48;
        geo.outerRx = geo.w / 2 - 20;
        const roomUp = geo.cy - 20 - geo.outer / 2;
        const roomDown = geo.h - geo.cy - 20 - geo.outer / 2 - CAPTION;
        geo.outerRy = Math.max(120, Math.min(roomUp, roomDown));
        geo.innerRy = geo.outerRy * 0.8;
        for (const t of orbitTiles) {
          const size = t.ring === 'outer' ? geo.outer : geo.inner;
          t.el.style.setProperty('--tile', `${size}px`);
        }
      } else {
        const r = rowEl.getBoundingClientRect();
        geo.rowW = r.width;
        geo.rowTile = r.width >= 640 ? 88 : 76;
        geo.rowGap = geo.rowTile + 28;
        for (const t of rowTiles) t.el.style.setProperty('--tile', `${geo.rowTile}px`);
      }
    };

    /* ---------- Per-frame update ---------- */
    let time = rand(0, 40); // start somewhere along the rings, so no two visits look the same
    let last = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;

    const fadeCycle = (tile: Tile, now: number, visible: boolean) => {
      if (reduced) return 1;
      if (tile.shown) {
        if (visible && now > tile.nextChange) tile.shown = false;
        return 1;
      }
      /* Fading out: once gone, swap the photo, wait a moment, then fade back in. */
      if (tile.opacity < 0.02 && tile.hiddenUntil === 0) {
        assign(tile);
        tile.hiddenUntil = now + rand(0.4, 2.2);
      }
      if (tile.hiddenUntil && now > tile.hiddenUntil && tile.ready) {
        tile.shown = true;
        tile.hiddenUntil = 0;
        /* The row already changes photos as tiles wrap round, so it swaps less often. */
        tile.nextChange = now + (tile.ring === 'row' ? rand(12, 24) : rand(7, 16));
        return 1;
      }
      return 0;
    };

    const place = (tile: Tile, x: number, y: number, size: number, target: number, dt: number) => {
      const ease = reduced ? 1 : clamp01(dt * 3.2);
      tile.opacity += (target - tile.opacity) * ease;
      if (tile.opacity < 0.005) tile.opacity = 0;
      tile.el.style.transform = `translate3d(${(x - size / 2).toFixed(1)}px, ${(y - size / 2).toFixed(1)}px, 0)`;
      tile.el.style.opacity = tile.opacity.toFixed(3);
    };

    const frameOrbit = (dt: number) => {
      const { cx, cy, half } = geo;
      const boxes: { x: number; y: number; s: number }[] = [];

      for (const tile of orbitOrder) {
        const outer = tile.ring === 'outer';
        const count = outer ? OUTER_COUNT : INNER_COUNT;
        const i = outer ? tile.index : tile.index - OUTER_COUNT;
        const size = outer ? geo.outer : geo.inner;
        const rx = outer ? geo.outerRx : geo.innerRx;
        const ry = outer ? geo.outerRy : geo.innerRy;
        const offset = outer ? 0 : Math.PI / count;
        const turn = outer ? (time / OUTER_LAP) * Math.PI * 2 : -(time / INNER_LAP) * Math.PI * 2;
        const angle = offset + (i / count) * Math.PI * 2 + turn;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);

        /* Keep clear of the text: fade over 56px as a tile nears the text column. */
        const limit = half + size / 2 + CLEAR;
        const dx = Math.abs(x - cx);
        const zone = clamp01((dx - limit) / 56);
        const top = y - size / 2;
        const bottom = y + size / 2 + CAPTION;
        const edge = clamp01(Math.min(top - 6, geo.h - 6 - bottom) / 40);

        /* Load a photo just before a tile comes into view, and let it go once it is well hidden. */
        if (zone === 0) {
          if (dx > limit - 90 && tile.photo < 0) assign(tile);
          if (dx < limit - 140 && tile.photo >= 0) {
            release(tile);
            tile.shown = true;
            tile.hiddenUntil = 0;
          }
        } else if (tile.photo < 0) {
          assign(tile);
        }

        /* An outer tile steps aside while it crosses an inner one. */
        let clearOfOthers = 1;
        if (outer) {
          for (const b of boxes) {
            if (Math.abs(b.x - x) < (b.s + size) / 2 + 12 && Math.abs(b.y - y) < (b.s + size) / 2 + CAPTION) clearOfOthers = 0;
          }
        }

        if (tile.nextChange === 0) tile.nextChange = time + rand(3, 14);
        const visible = zone * edge > 0.5;
        const cycle = fadeCycle(tile, time, visible);
        const base = outer ? 0.62 : 1;
        const target = base * zone * edge * clearOfOthers * cycle * (tile.ready ? 1 : 0);
        place(tile, x, y, size, target, dt);
        if (!outer && tile.opacity > 0.05) boxes.push({ x, y, s: size });
      }
    };

    const frameRow = (dt: number) => {
      const size = geo.rowTile;
      const gap = geo.rowGap;
      const length = ROW_COUNT * gap;
      for (const tile of rowTiles) {
        const raw = tile.index * gap - (reduced ? 0 : time * ROW_SPEED);
        const pos = ((raw % length) + length) % length; // 0 .. length
        const x = pos - gap + size / 2 + (geo.rowW - Math.min(geo.rowW, length - gap)) / 2;
        const prev = Number(tile.el.dataset.pos ?? pos);
        tile.el.dataset.pos = String(pos);
        /* A tile that just wrapped round to the far right is off screen: give it a new photo. */
        if (pos > prev + gap || tile.photo < 0) assign(tile);
        if (tile.nextChange === 0) tile.nextChange = time + rand(6, 24);
        const onRow = x > -size && x < geo.rowW + size;
        const cycle = fadeCycle(tile, time, onRow);
        place(tile, x, size / 2, size, cycle * (tile.ready ? 1 : 0), dt);
      }
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0.016;
      last = now;
      time += dt;
      if (mode === 'orbit') frameOrbit(dt);
      else frameRow(dt);
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      last = 0;
    };

    const start = () => {
      if (running || reduced || !onScreen) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    /* Still tiles for reduced motion: one frame, photos settled. */
    const still = () => {
      stop();
      measure();
      for (let k = 0; k < 3; k++) {
        if (mode === 'orbit') frameOrbit(1);
        else frameRow(1);
      }
      /* Photos decode asynchronously, so draw again as they become ready. */
      for (const delay of [300, 1000, 2500]) {
        window.setTimeout(() => {
          if (!reduced) return;
          if (mode === 'orbit') frameOrbit(1);
          else frameRow(1);
        }, delay);
      }
    };

    const reset = () => {
      for (const t of [...orbitTiles, ...rowTiles]) {
        release(t);
        t.opacity = 0;
        t.shown = true;
        t.hiddenUntil = 0;
        t.nextChange = 0;
        t.el.style.opacity = '0';
        delete t.el.dataset.pos;
      }
      mode = wideQuery.matches ? 'orbit' : 'row';
      reduced = motionQuery.matches;
      measure();
      if (reduced) still();
      else {
        stop();
        start();
      }
    };

    const resize = new ResizeObserver(() => {
      measure();
      if (reduced) still();
    });
    resize.observe(stage);
    resize.observe(content);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(stage);

    wideQuery.addEventListener('change', reset);
    motionQuery.addEventListener('change', reset);
    reset();

    return () => {
      stop();
      resize.disconnect();
      io.disconnect();
      wideQuery.removeEventListener('change', reset);
      motionQuery.removeEventListener('change', reset);
    };
  }, [photos, contentRef, stageRef]);

  const tile = (key: string) => (
    <figure key={key} data-tile className={styles.tile}>
      <img alt="" width={256} height={256} decoding="async" draggable={false} />
      <figcaption />
    </figure>
  );

  return (
    <>
      <div ref={orbitRef} className={styles.orbit} aria-hidden="true">
        {Array.from({ length: OUTER_COUNT }, (_, i) => tile(`o${i}`))}
        {Array.from({ length: INNER_COUNT }, (_, i) => tile(`i${i}`))}
      </div>
      <div ref={rowRef} className={styles.row} aria-hidden="true">
        {Array.from({ length: ROW_COUNT }, (_, i) => tile(`r${i}`))}
      </div>
    </>
  );
}
