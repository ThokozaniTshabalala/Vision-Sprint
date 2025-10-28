import React from 'react';
import { Link } from 'react-router-dom';
import './FooterBanner.css';

const FooterBanner = () => {
  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="flex justify-center items-center px-4">
        <img 
          src="/VISION SPRINT_TRANSFORM_YOUR_BUSINESS_large.png" 
          alt="transform your business" 
          className="banner-image" 
        />
      </div>
      <div className="text-overlay flex flex-col">
        <h2 className="heading-text font-semibold text-white">Let us transform your business</h2>
        <p className="mt-3 body-text text-white">
          Empowering your growth with{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
            tailored designs
          </span>,
        </p>
        <p className="body-text text-white">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-200 bg-clip-text text-transparent">
            business insights
          </span>, and{' '}
          <span className="bg-gradient-to-r from-orange-100 to-yellow-400  bg-clip-text text-transparent">
            data-driven strategies
          </span>
        </p>
        <Link to="/discuss-project">
          <button className="banner-button rounded-md bg-gradient-to-r from-[#fea01b] to-[#ff851a] hover:from-[#ff851a] hover:to-[#fea01b] text-white font-medium transition-all duration-200 w-fit">
            Discuss a Project
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FooterBanner;