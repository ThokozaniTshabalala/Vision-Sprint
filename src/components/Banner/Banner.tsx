import { useJhbClock, useLatency } from '../Glass/Glass';

const MARKER = 'font-mono text-[11px] uppercase tracking-widest tabular-nums text-orange-300/80';

function Banner() {
  const clock = useJhbClock();
  const latency = useLatency();

  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black" style={{ height: '40px' }}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 md:justify-between lg:px-8">
        <span className={`hidden md:inline ${MARKER}`}>26.2041° S / 28.0473° E</span>
        <h1
          className="text-sm font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(72.83deg, #ff7f32 11.63%, #ffb347 40.43%, #ff5e00 68.07%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          Design and builds delivered faster.
        </h1>
        <span className={`hidden items-center gap-3 md:flex ${MARKER}`}>
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
          </span>
          <span>JHB {clock}</span>
          <span className="text-gray-500">RTT {latency === null ? '—' : `${latency}ms`}</span>
        </span>
      </div>
    </section>
  );
}

export default Banner;
