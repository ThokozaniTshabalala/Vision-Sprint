import React from 'react';

const Services = () => {
  const services = [
    {
      href: '',
      imgSrc: '/bulb-svgrepo-com.svg', // Updated icon for Business Analysis
      title: 'Business Analysis',
      description:
        'Develop, grow and improve your business with trained experts',
    },
    {
      href: '',
      imgSrc: '/magic-stick-3-svgrepo-com.svg', // Updated icon for Design Your App
      title: 'Design Your App',
      description:
        'Elevate your digital presence with world-class mobile and web app design.',
    },
    {
      href: '/services/ux-audit',
      imgSrc: '/pen-tool-svgrepo-com.svg', // Updated icon for UX/UI Audit & Redesign
      title: 'UX/UI Audit & Redesign',
      description:
        'Enhance user experience and drive conversions with a comprehensive product audit and redesign.',
    },
    {
      href: '/services/app-development',
      imgSrc: '/phone-modern-svgrepo-com.svg', // Updated icon for Mobile App Development
      title: 'Mobile App Development',
      description:
        'Build fast, functional, and scalable mobile applications that leverage the latest technologies.',
    },
    {
      href: '/services/web-app-development',
      imgSrc: '/web-svgrepo-com.svg', // Updated icon for Web App Development
      title: 'Web App Development',
      description:
        'Develop customised web applications that drive business growth, improve efficiency, and optimise processes.',
    },
    {
      href: '/services/low-code-development',
      imgSrc: '/lightning-svgrepo-com.svg', // Updated icon for Low-/No-Code Development
      title: 'Low-/No-Code Development',
      description:
        'Develop customised systems that drive business growth and improve operational efficiencies.',
    },
  ];

  return (
    <div id="Services" className="bg-white py-0 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-orange-500 uppercase font-semibold text-sm">
          Our Software Services
        </p>
        <h2 className="text-gray-800 font-bold text-2xl sm:text-3xl mt-2">
          Our services are <br /> customised to your needs
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <a
            key={index}
            href={service.href}
            className="group flex flex-col bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon Section */}
            <div
              className="flex items-center justify-center h-40"
              style={{ backgroundColor: '#f97316' }} // Icon section background color
            >
              <img
                src={service.imgSrc}
                alt={service.title}
                className="h-16 w-16 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-orange-500 group-hover:text-orange-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="text-orange-500 font-semibold text-sm group-hover:text-orange-600 transition-colors duration-300">
                Learn More →
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Services;
