import React from 'react';

const FooterBanner = () => {
  return (
    <section className="relative">
      <div className="flex justify-center items-center min-h-screen pt-0 px-4">
        <img src="/VISION SPRINT_TRANSFORM_YOUR_BUSINESS_large.png" alt="transform your business" className="w-500 h-auto" />
      </div>
      <div className="absolute top-1/3 left-32 flex flex-col z-10">
        <h2 className="text-4xl font-semibold text-white">Let us transform your business</h2>
        <p className="mt-3 text-lg text-white">
          Empowering your growth with{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
            tailored designs
          </span>,
        </p>
        <p className="text-lg text-white">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-200 bg-clip-text text-transparent">
            business insights
          </span>, and{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-200 bg-clip-text text-transparent">
            data-driven strategies
          </span>
        </p>
        <button className="mt-24 px-6 py-4 rounded-md bg-gradient-to-r from-[#fea01b] to-[#ff851a] hover:from-[#ff851a] hover:to-[#fea01b] text-white font-medium transition-all duration-200 w-fit">
          Discuss a Project
        </button>
      </div>
    </section>
  );
};

export default FooterBanner;

