import React from 'react';
import './Header.css';

function Header() {
    return (
        <section className='h-wrapper'>
            <div className="h-container w-container mx-auto flex justify-between items-center"> {/* 100% width container, centered */}
                
                {/* Logo section */}
                <div className="logo-section flex items-center">
                    <img src="vision_sprint_logo123.png" alt="logo" className="w-10" /> {/* Adjusted width */}
                    <h3 className="ml-4 font-semibold text-black">Vision Sprint</h3>
                </div>

                {/* Navigation menu */}
                <div className="flex space-x-8 items-center"> {/* Space between links */}
                    <a href="" className="text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500">Our Services</a>
                    <a href="" className="text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500">Portfolio</a>
                    <a href="" className="text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500">Contact Us</a>
                    <a href="" className="text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500">Get Started</a>
                </div>

                {/* Button section */}
                <div className="flex items-center ml-8"> {/* Left-aligned with space to the right */}
                    <button className="py-2 px-6 text-orange-500 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
                        <a href="" className="text-white">Discuss a Project</a>
                    </button>
                </div> 
            </div>
        </section>
    );
}

export default Header;
