import { Glass, LABEL, MaskReveal, Scramble, SectionMarker } from '../Glass/Glass';

interface Service {
  code: string;
  href: string;
  imgSrc: string;
  title: string;
  description: string;
  /** Asymmetric placement in the staggered column on lg screens. */
  layout: string;
}

const SERVICES: Service[] = [
  {
    code: 'SVC/BA',
    href: '',
    imgSrc: '/bulb-svgrepo-com.svg',
    title: 'Business Analysis',
    description: 'Develop, grow and improve your business with trained experts',
    layout: 'lg:w-[82%]',
  },
  {
    code: 'SVC/DSN',
    href: '',
    imgSrc: '/magic-stick-3-svgrepo-com.svg',
    title: 'Design Your App',
    description: 'Elevate your digital presence with world-class mobile and web app design.',
    layout: 'lg:ml-auto lg:w-[68%] lg:-mt-10',
  },
  {
    code: 'SVC/AUD',
    href: '/services/ux-audit',
    imgSrc: '/pen-tool-svgrepo-com.svg',
    title: 'UX/UI Audit & Redesign',
    description: 'Enhance user experience and drive conversions with a comprehensive product audit and redesign.',
    layout: 'lg:ml-[8%] lg:w-[74%] lg:-mt-6',
  },
  {
    code: 'SVC/MOB',
    href: '/services/app-development',
    imgSrc: '/phone-modern-svgrepo-com.svg',
    title: 'Mobile App Development',
    description: 'Build fast, functional, and scalable mobile applications that leverage the latest technologies.',
    layout: 'lg:ml-auto lg:w-[62%] lg:-mt-14',
  },
  {
    code: 'SVC/WEB',
    href: '/services/web-app-development',
    imgSrc: '/web-svgrepo-com.svg',
    title: 'Web App Development',
    description: 'Develop customised web applications that drive business growth, improve efficiency, and optimise processes.',
    layout: 'lg:w-[78%] lg:-mt-4',
  },
  {
    code: 'SVC/LCD',
    href: '/services/low-code-development',
    imgSrc: '/lightning-svgrepo-com.svg',
    title: 'Low-/No-Code Development',
    description: 'Develop customised systems that drive business growth and improve operational efficiencies.',
    layout: 'lg:ml-auto lg:w-[66%] lg:-mt-10',
  },
];

const Services = () => {
  return (
    <section id="Services" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Sticky anchor */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionMarker index={3} name="SERVICES" />
            <p className={`mt-3 ${LABEL}`}>Our Software Services</p>
            <p aria-hidden="true" className="mt-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-[7rem] font-bold leading-none tracking-[-0.06em] text-transparent lg:text-[10rem]">
              <Scramble text="06" duration={1000} />
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-gray-800 sm:text-5xl">
              <MaskReveal lines={['Our services are', 'customised to', 'your needs']} />
            </h2>
          </div>
        </div>

        {/* Staggered, overlapping glass column */}
        <div className="space-y-6 lg:col-span-8 lg:space-y-0">
          {SERVICES.map((service, i) => (
            <a key={service.code} href={service.href} className={`group relative block rounded-[26px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 ${service.layout}`} style={{ zIndex: i + 1 }}>
              <Glass scrub tilt={6} corners radius={26} className="!bg-white/50 p-6 sm:p-8">
                <div className="flex items-start gap-6">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]" style={{ backgroundColor: '#f97316' }}>
                    <img src={service.imgSrc} alt="" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Scramble
                      text={`${String(i + 1).padStart(2, '0')} / ${service.code}`}
                      className="font-mono text-[11px] uppercase tracking-widest text-gray-400"
                    />
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-orange-500 group-hover:text-orange-600 sm:text-3xl">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 max-w-[48ch] text-sm text-gray-600 sm:text-base">{service.description}</p>
                <div className="mt-5 text-sm font-semibold text-orange-500 transition-colors duration-300 group-hover:text-orange-600">
                  Learn More →
                </div>
              </Glass>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
