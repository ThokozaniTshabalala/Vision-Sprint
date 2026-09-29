import { useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE_OUT_EXPO, Glass, LABEL, MagneticLink, MaskReveal, Scramble, SectionMarker, SPRING, useJhbClock } from '../Glass/Glass';

const PHRASES = [
  'You are one application away from achieving digital transformation',
  'You are one design away from creating impact',
  'You are a Sprint away from success',
];

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let i = 0;
    let pause: number | undefined;
    const typing = window.setInterval(() => {
      i += 1;
      setText(phrase.slice(0, i));
      if (i >= phrase.length) {
        window.clearInterval(typing);
        pause = window.setTimeout(() => {
          setText('');
          setPhraseIndex((p) => (p + 1) % phrases.length);
        }, 2000);
      }
    }, 50);
    return () => { window.clearInterval(typing); window.clearTimeout(pause); };
  }, [phraseIndex, phrases]);

  return { text, phraseIndex };
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

const Hero = () => {
  const { text, phraseIndex } = useTypewriter(PHRASES);
  const clock = useJhbClock();
  const { scrollY } = useScroll();
  const planesY = useTransform(scrollY, (v) => v * 0.7); // netted against 1x scroll → 0.3x layer

  return (
    <section className="hero-wrapper relative mx-auto grid max-w-7xl items-end gap-12 px-4 pb-10 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-12 lg:gap-8 lg:px-8">
      {/* Structural glass planes (0.3x parallax) */}
      <motion.div aria-hidden="true" style={{ y: planesY }} className="pointer-events-none absolute inset-0 -z-10 hidden transform-gpu will-change-transform lg:block">
        <div className="glass absolute right-[3%] top-[6%] h-[62%] w-[34%] rotate-[-4deg] rounded-[36px]" />
        <div className="glass absolute right-[26%] top-[48%] h-[36%] w-[20%] rotate-[3deg] rounded-[28px]" />
      </motion.div>

      <div className="text-section lg:col-span-8">
        <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <SectionMarker index={1} name="HERO" />
          <p className="text-base font-semibold text-gray-600 sm:text-lg">Transform your business</p>
        </motion.div>

        <h1 className="mt-6 text-[clamp(2.75rem,8vw,6.75rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          <MaskReveal
            onMount
            delay={0.15}
            lines={[
              'Design & Build',
              <span key="accent" className="text-orange-500">World-Class</span>,
              <span key="accent2" className="text-orange-500">Digital Products</span>,
            ]}
          />
        </h1>

        <motion.p {...fadeUp(0.7)} className="mt-8 max-w-xl text-base text-gray-600 sm:text-lg">
          We design and build powerful native, cross-platform mobile and web applications
          that drive business growth and transformation. We help you achieve your goals.
        </motion.p>

        <motion.div {...fadeUp(0.85)} className="Discuss-project-button mt-8">
          <MagneticLink
            to="/discuss-project"
            className="rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-3 text-base font-medium text-white sm:text-lg"
          >
            Discuss Your Project
          </MagneticLink>
        </motion.div>
      </div>

      {/* Sprint status console: live clock + the rotating typewriter line */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ ...SPRING, delay: 0.5 }}
        style={{ transformPerspective: 1200 }}
        className="transform-gpu will-change-transform lg:col-span-4"
      >
        <Glass tilt={8} corners radius={24} className="!bg-white/40 p-6">
          <div className="flex items-center justify-between">
            <span className={LABEL}>sprint.status</span>
            <span className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-orange-600">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden="true" /> Live
            </span>
          </div>

          <p className="mt-6 min-h-[5.5rem] text-lg font-medium leading-snug tracking-[-0.02em] text-gray-700" aria-live="polite">
            {text}
            <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-pulse bg-orange-500 motion-reduce:animate-none" aria-hidden="true" />
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-orange-500/10">
            {([
              ['Phrase', `${String(phraseIndex + 1).padStart(2, '0')}/${String(PHRASES.length).padStart(2, '0')}`],
              ['Services', <Scramble text="06" />],
              ['SAST', clock.slice(0, 5)],
            ] as [string, ReactNode][]).map(([k, v]) => (
              <div key={k} className="bg-white/70 px-3 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{k}</dt>
                <dd className="mt-1 font-mono text-lg tabular-nums text-gray-900">{v}</dd>
              </div>
            ))}
          </dl>

          <img src="/stars.png" alt="" aria-hidden="true" className="absolute -right-3 -top-3 h-8 w-8" />
        </Glass>
      </motion.div>
    </section>
  );
};

export default Hero;
