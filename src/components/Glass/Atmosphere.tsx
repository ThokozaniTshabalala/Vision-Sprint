import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

// Brand tokens as RGB triplets for canvas drawing (same values as glass.css).
const ACCENT = '249, 115, 22'; // #f97316
const PRIMARY = '252, 100, 4'; // #fc6404
const AMBER = '255, 179, 71'; // #ffb347
const DOT_COLORS = [ACCENT, PRIMARY, AMBER];

// ── Film grain ──────────────────────────────────────────────────────────────
export function NoiseOverlay() {
  return (
    <svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] h-full w-full opacity-[0.04] mix-blend-overlay">
      <filter id="vs-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#vs-noise)" />
    </svg>
  );
}

// ── Volumetric light leaks (0.1x parallax) ──────────────────────────────────
export function LightLeaks() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * -0.1);
  return (
    <motion.div aria-hidden="true" style={{ y }} className="pointer-events-none fixed inset-0 -z-10 transform-gpu will-change-transform">
      <div className="absolute -left-[18vw] top-[8vh] h-[60vh] w-[55vw] rounded-full bg-orange-400/[0.16] blur-[120px]" />
      <div className="absolute -right-[12vw] top-[45vh] h-[55vh] w-[45vw] rounded-full bg-[#ffb347]/[0.18] blur-[130px]" />
      <div className="absolute left-[30vw] top-[115vh] h-[45vh] w-[50vw] rounded-full bg-[#fc6404]/[0.08] blur-[140px]" />
    </motion.div>
  );
}

// ── Constellation canvas ────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bvx: number; // resting drift the particle eases back to after being pushed
  bvy: number;
  r: number;
  color: string;
}

const LINK_DIST = 120;
const CURSOR_LINK_DIST = 180;
const REPEL_RADIUS = 140;
const MAX_PARTICLES = 90;
const AREA_PER_PARTICLE = 16000;

function makeParticle(w: number, h: number): Particle {
  const bvx = (Math.random() - 0.5) * 0.3;
  const bvy = (Math.random() - 0.5) * 0.3;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: bvx,
    vy: bvy,
    bvx,
    bvy,
    r: 1 + Math.random() * 1.2,
    color: DOT_COLORS[(Math.random() * DOT_COLORS.length) | 0],
  };
}

/** Cursor-repelled particle constellation in the brand oranges. */
export function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let frame = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_PARTICLES, Math.floor((w * h) / AREA_PER_PARTICLE));
      particles = particles.slice(0, count);
      while (particles.length < count) particles.push(makeParticle(w, h));
    }

    function step() {
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < REPEL_RADIUS) {
          const force = (1 - d / REPEL_RADIUS) * 0.9;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx = p.vx * 0.94 + p.bvx * 0.06;
        p.vy = p.vy * 0.94 + p.bvy * 0.06;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 1;
      // ponytail: O(n²) pair scan, fine at ≤90 particles; add a spatial grid if the cap goes up.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx!.strokeStyle = `rgba(${ACCENT}, ${(1 - d / LINK_DIST) * 0.22})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        // Laser traces to the cursor
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < CURSOR_LINK_DIST) {
          ctx!.strokeStyle = `rgba(${PRIMARY}, ${(1 - dm / CURSOR_LINK_DIST) * 0.4})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
        ctx!.fillStyle = `rgba(${a.color}, 0.6)`;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      step();
      draw();
      frame = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onResize() {
      resize();
      if (reduce) draw();
    }

    resize();
    if (reduce) draw();
    else frame = requestAnimationFrame(loop);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}

// ── Live telemetry HUD ──────────────────────────────────────────────────────
/** Viewport size, cursor coordinates and measured frame rate, written straight to the DOM (no re-renders). */
export function Telemetry() {
  const vpRef = useRef<HTMLSpanElement>(null);
  const xyRef = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let frames = 0;
    let last = performance.now();

    function onResize() {
      if (vpRef.current) vpRef.current.textContent = `${window.innerWidth}×${window.innerHeight}`;
    }
    function onMove(e: PointerEvent) {
      if (xyRef.current) xyRef.current.textContent = `[X: ${Math.round(e.clientX)}, Y: ${Math.round(e.clientY)}]`;
    }
    function tick(now: number) {
      frames += 1;
      if (now - last >= 500) {
        if (fpsRef.current) fpsRef.current.textContent = String(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      frame = requestAnimationFrame(tick);
    }

    onResize();
    frame = requestAnimationFrame(tick);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="glass pointer-events-none fixed bottom-4 left-4 z-50 hidden items-center gap-4 rounded-full !bg-white/60 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-gray-500 tabular-nums md:flex"
    >
      <span className="flex items-center gap-2 text-orange-500/80">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> VP <span ref={vpRef} className="text-gray-700" />
      </span>
      <span ref={xyRef} className="text-gray-700">[X: —, Y: —]</span>
      <span>
        <span ref={fpsRef} className="text-gray-700">—</span> FPS
      </span>
    </div>
  );
}

// ── Scroll-velocity skew ────────────────────────────────────────────────────
/** Skews content ±2deg with scroll velocity and springs back to 0 when scrolling stops. */
export function VelocitySkew({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 200, damping: 50 });
  const skewY = useTransform(smooth, [-3000, 0, 3000], [2, 0, -2], { clamp: true });

  return (
    <motion.div style={reduce ? undefined : { skewY }} className="transform-gpu will-change-transform">
      {children}
    </motion.div>
  );
}
