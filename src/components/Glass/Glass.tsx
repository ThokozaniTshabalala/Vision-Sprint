import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Transition,
} from 'framer-motion';
import './glass.css';

// ── Motion constants ────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const SPRING_CFG = { stiffness: 140, damping: 20, mass: 0.8 };
export const SPRING: Transition = { type: 'spring', ...SPRING_CFG };
const TILT_SPRING = { stiffness: 200, damping: 25 };
const ELASTIC_SPRING = { stiffness: 200, damping: 11, mass: 0.8 };

/** Monospace technical marker in the brand orange. */
export const LABEL = 'font-mono text-[11px] uppercase tracking-widest text-orange-500/80';
export const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500';

// ── Pointer tracking ────────────────────────────────────────────────────────
/** Writes --x/--y (px, for the rim spotlight) and --px/--py (-1..1, for depth layers). */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.setProperty('--x', `${x}px`);
  el.style.setProperty('--y', `${y}px`);
  el.style.setProperty('--px', ((x / r.width) * 2 - 1).toFixed(3));
  el.style.setProperty('--py', ((y / r.height) * 2 - 1).toFixed(3));
}

// ── Crosshairs ──────────────────────────────────────────────────────────────
const CORNERS: CSSProperties[] = [
  { top: -5, left: -5 },
  { top: -5, right: -5 },
  { bottom: -5, left: -5 },
  { bottom: -5, right: -5 },
];

function Crosshairs() {
  return (
    <>
      {CORNERS.map((pos, i) => (
        <svg key={i} viewBox="0 0 9 9" className="glass-cross" style={pos} aria-hidden="true">
          <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}

// ── Multi-plane glass surface ───────────────────────────────────────────────
interface GlassProps {
  children?: ReactNode;
  className?: string;
  /** Corner radius in px; drives the shell and the inset sub-layer. */
  radius?: number;
  /** Scroll-scrubbed perspective settle (rotateX / translateZ / scale 0.95 → 1). */
  scrub?: boolean;
  /** Max pointer tilt in degrees; 0 disables. */
  tilt?: number;
  /** Hairline `+` crosshairs at the corners. */
  corners?: boolean;
}

export function Glass({ children, className = '', radius = 26, scrub = false, tilt = 0, corners = false }: GlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll settle
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 55%'] });
  const p = useSpring(scrollYProgress, SPRING_CFG);
  const settle = scrub && !reduce;
  const scrollRotate = useTransform(p, [0, 1], settle ? [14, 0] : [0, 0]);
  const z = useTransform(p, [0, 1], settle ? [-90, 0] : [0, 0]);
  const scale = useTransform(p, [0, 1], settle ? [0.95, 1] : [1, 1]);
  const opacity = useTransform(p, [0, 1], settle ? [0.4, 1] : [1, 1]);

  // Pointer tilt
  const tx = useSpring(0, TILT_SPRING);
  const ty = useSpring(0, TILT_SPRING);
  const rotateX = useTransform([scrollRotate, tx], ([a, b]: number[]) => a + b);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    trackPointer(e);
    if (!tilt || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    tx.set(-ny * tilt);
    ty.set(nx * tilt);
  }

  function onPointerLeave(e: PointerEvent<HTMLDivElement>) {
    tx.set(0);
    ty.set(0);
    e.currentTarget.style.setProperty('--px', '0');
    e.currentTarget.style.setProperty('--py', '0');
  }

  function onAnimationEnd(e: AnimationEvent<HTMLDivElement>) {
    if (e.animationName === 'prism-sweep') delete e.currentTarget.dataset.lit;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onAnimationEnd={onAnimationEnd}
      onViewportEnter={() => { if (ref.current) ref.current.dataset.lit = ''; }}
      viewport={{ once: true, amount: 0.4 }}
      style={{
        rotateX,
        rotateY: ty,
        z,
        scale,
        opacity,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        borderRadius: radius,
        ['--r' as string]: `${radius}px`,
      }}
      className={`glass transform-gpu will-change-transform ${className}`}
    >
      <span className="glass-prism" aria-hidden="true" />
      <span className="glass-sub" aria-hidden="true" />
      {corners && <Crosshairs />}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// ── Kinetic mask reveal ─────────────────────────────────────────────────────
interface MaskRevealProps {
  lines: ReactNode[];
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
}

export function MaskReveal({ lines, delay = 0, onMount = false }: MaskRevealProps) {
  const shown = { y: '0%' };
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block transform-gpu will-change-transform"
            initial={{ y: '110%' }}
            {...(onMount ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: '-10% 0px' } })}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// ── Scramble decode ─────────────────────────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*';
const STATIC_CHARS = new Set([' ', '/', '_', '.', ':', '-']);

interface ScrambleProps {
  text: string;
  className?: string;
  /** Total decode time in ms. */
  duration?: number;
}

/** Alphanumeric scramble that decodes left-to-right once scrolled into view. */
export function Scramble({ text, className = '', duration = 800 }: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduce = useReducedMotion();

  // Text is written imperatively so the per-frame scramble never fights React's text node.
  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = text;
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = [...text]
        .map((ch, i) =>
          STATIC_CHARS.has(ch) || t >= (i + 1) / text.length ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0],
        )
        .join('');
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); el.textContent = text; };
  }, [inView, reduce, text, duration]);

  return (
    <span ref={ref} aria-label={text} className={`tabular-nums ${className}`} />
  );
}

// ── Magnetic button ─────────────────────────────────────────────────────────
const MAGNET_RADIUS = 40; // px beyond the button edge where the pull engages

interface MagneticLinkProps {
  to: string;
  children: ReactNode;
  /** Visual styling (colors, padding, radius) — keep the brand's existing classes here. */
  className: string;
}

export function MagneticLink({ to, children, className }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, ELASTIC_SPRING);
  const sy = useSpring(y, ELASTIC_SPRING);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    function onMove(e: globalThis.PointerEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ex = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const ey = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      if (Math.hypot(ex, ey) <= MAGNET_RADIUS) {
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
      } else {
        x.set(0);
        y.set(0);
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, x, y]);

  return (
    <motion.div style={{ x: sx, y: sy }} whileTap={{ scale: 0.97 }} transition={SPRING} className="inline-block transform-gpu will-change-transform">
      <Link
        ref={ref}
        to={to}
        className={`magnetic relative inline-flex items-center justify-center overflow-hidden ${className} ${FOCUS}`}
      >
        <span className="sweep" aria-hidden="true" />
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}

// ── Section index marker ────────────────────────────────────────────────────
export function SectionMarker({ index, name }: { index: number; name: string }) {
  return (
    <span className={LABEL}>
      <Scramble text={`SEC_${String(index).padStart(2, '0')} // ${name}`} />
    </span>
  );
}

// ── Live data ───────────────────────────────────────────────────────────────
const JHB_TIME = new Intl.DateTimeFormat('en-ZA', {
  timeZone: 'Africa/Johannesburg',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** Current Johannesburg time, ticking every second. */
export function useJhbClock() {
  const [now, setNow] = useState(() => JHB_TIME.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setNow(JHB_TIME.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/** Round-trip time of a HEAD request to this site, refreshed every 5s. */
export function useLatency() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    async function ping() {
      const t0 = performance.now();
      try {
        await fetch(window.location.origin, { method: 'HEAD', cache: 'no-store' });
        if (alive) setMs(Math.round(performance.now() - t0));
      } catch {
        if (alive) setMs(null);
      }
    }
    ping();
    const id = window.setInterval(ping, 5000);
    return () => { alive = false; window.clearInterval(id); };
  }, []);
  return ms;
}
