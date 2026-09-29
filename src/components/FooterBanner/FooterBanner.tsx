import { MagneticLink, MaskReveal } from '../Glass/Glass';
import './FooterBanner.css';

const FooterBanner = () => {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="flex items-center justify-center px-4">
        <img src="/VISION SPRINT_TRANSFORM_YOUR_BUSINESS_large.png" alt="transform your business" className="banner-image" />
      </div>
      <div className="text-overlay flex flex-col">
        <h2 className="heading-text font-semibold tracking-[-0.03em] text-white">
          <MaskReveal lines={['Let us transform your business']} />
        </h2>
        <p className="mt-3 body-text text-white">
          Empowering your growth with{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">tailored designs</span>,
        </p>
        <p className="body-text text-white">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-200 bg-clip-text text-transparent">business insights</span>, and{' '}
          <span className="bg-gradient-to-r from-orange-100 to-yellow-400 bg-clip-text text-transparent">data-driven strategies</span>
        </p>
        <div>
          <MagneticLink
            to="/discuss-project"
            className="banner-button w-fit rounded-md bg-gradient-to-r from-[#fea01b] to-[#ff851a] font-medium text-white transition-colors duration-200 hover:from-[#ff851a] hover:to-[#fea01b]"
          >
            Discuss a Project
          </MagneticLink>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
