import { Glass, SectionMarker } from '../Glass/Glass';
import './DeviceDesign.css';

const DeviceDesign = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <SectionMarker index={2} name="RESPONSIVE BUILD" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400">Mobile, tablet, desktop</span>
      </div>
      <Glass scrub tilt={3} corners radius={32} className="p-2 sm:p-3">
        <img src="/VISION SPRINT HERO_FINAL.png" alt="Device Design" className="device-image h-auto w-full rounded-[24px]" />
      </Glass>
    </div>
  );
};

export default DeviceDesign;
