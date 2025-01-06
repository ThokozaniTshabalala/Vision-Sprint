import React, { useState, useEffect } from 'react';

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
    <section className="hero-wrapper flex flex-col items-center justify-start text-center p-6 mt-9">
      <div className="text-section flex flex-col items-center">
        <h1 className="text-lg text-gray-600 font-semibold">Transform your business</h1>
        <h1 className="text-5xl font-bold">
          Design & Build{' '}
          <span className="text-orange-500">World-Class Digital Products</span>
        </h1>

        <p className="mt-9 text-gray-600 text-lg max-w-xl">
          We design and build powerful native, cross-platform mobile and web applications 
          that drive business growth and transformation. We help you achieve your goals.
        </p>
      </div>

      <div className="Discuss-project-button mt-6">
        <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white 
          text-lg font-medium rounded-lg hover:scale-105 transition-transform">
          Discuss Your Project
        </button>
      </div>

      <div className="mt-5 h-8 font-medium text-gray-700 min-h-[2rem] relative">
        <span className="whitespace-nowrap">{displayedText}</span>
        <img 
          src="/stars.png"
          alt="sparkle cursor"
          className="absolute inline-block h-10 w-10 -right-10 top-1/2 transform -translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default Hero;