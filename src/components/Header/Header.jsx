import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="relative bg-white w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <img src="vision_sprint_logo123.png" alt="logo" className="w-10" />
            <h3 className="ml-4 font-semibold text-black">Vision Sprint</h3>
          </div>

          {/* Desktop Navigation - Hidden below 815px */}
          <div className="hidden min-[815px]:flex space-x-8 items-center">
            <a href="" className="text-gray-600 transition-colors duration-300 hover:text-orange-500">
              Our Services
            </a>
            <a href="" className="text-gray-600 transition-colors duration-300 hover:text-orange-500">
              Portfolio
            </a>
            <a href="" className="text-gray-600 transition-colors duration-300 hover:text-orange-500">
              Contact Us
            </a>
            <a href="" className="text-gray-600 transition-colors duration-300 hover:text-orange-500">
              Get Started
            </a>
          </div>

          {/* Desktop Button - Hidden below 815px */}
          <div className="hidden min-[815px]:flex items-center">
            <button className="py-2 px-6 text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-md transition-all duration-300 hover:scale-105 focus:outline-none">
              <a href="">Discuss a Project</a>
            </button>
          </div>

          {/* Mobile menu button - Visible below 815px */}
          <div className="min-[815px]:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              {isMenuOpen ? (
                // X icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Visible below 815px */}
      {isMenuOpen && (
        <div className="min-[815px]:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <a
              href=""
              className="block text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              Our Services
            </a>
            <a
              href=""
              className="block text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              Portfolio
            </a>
            <a
              href=""
              className="block text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              Contact Us
            </a>
            <a
              href=""
              className="block text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              Get Started
            </a>
            <button className="w-full py-2 px-6 text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-md transition-all duration-300 hover:scale-105 focus:outline-none">
              <a href="">Discuss a Project</a>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;