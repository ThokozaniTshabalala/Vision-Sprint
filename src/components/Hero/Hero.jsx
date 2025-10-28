import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const phrases = [
    "You are one application away from achieving digital transformation",
    "You are one design away from creating impact",
    "You are a Sprint away from success"
  ];

  useEffect(() => {
    let index = 0;
    let typingInterval;
    let isTyping = true;

    const typeText = () => {
      if (isTyping) {
        if (index < phrases[currentTextIndex].length) {
          setDisplayedText(phrases[currentTextIndex].slice(0, index + 1));
          index++;
        } else {
          isTyping = false;
          setTimeout(() => {
            isTyping = true;
            setCurrentTextIndex((prev) => (prev + 1) % phrases.length);
            index = 0;
            setDisplayedText('');
          }, 2000);
        }
      }
    };

    typingInterval = setInterval(typeText, 50);

    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  return (
    <section className="hero-wrapper flex flex-col items-center justify-start text-center p-4 sm:p-6 mt-6 sm:mt-9">
      <div className="text-section flex flex-col items-center px-4 sm:px-6 md:px-8">
        {/* Subtitle */}
        <h1 className="text-base sm:text-lg text-gray-600 font-semibold">
          Transform your business
        </h1>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4">
          Design & Build{' '}
          <span className="text-orange-500">World-Class Digital Products</span>
        </h1>

        {/* Description */}
        <p className="mt-6 sm:mt-9 text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-lg md:max-w-xl">
          We design and build powerful native, cross-platform mobile and web applications 
          that drive business growth and transformation. We help you achieve your goals.
        </p>
      </div>

      {/* Button */}
      <div className="Discuss-project-button mt-4 sm:mt-6">
        <Link to="/discuss-project">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white 
            text-base sm:text-lg font-medium rounded-lg hover:scale-105 transition-transform">
            Discuss Your Project
          </button>
        </Link>
      </div>

      {/* Typing animation container */}
      <div className="mt-4 sm:mt-5 h-6 sm:h-8 font-medium text-gray-700 min-h-[2rem] relative px-4 sm:px-0">
        <div className="flex items-center justify-center">
          <span className="text-sm sm:text-base md:text-lg whitespace-normal sm:whitespace-nowrap">
            {displayedText}
          </span>
          <img 
            src="/stars.png"
            alt="sparkle cursor"
            className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 -right-8 sm:-right-10 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;