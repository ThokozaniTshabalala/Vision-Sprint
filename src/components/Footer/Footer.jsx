import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-black via-gray-900 to-black py-8 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       
                <div className="flex flex-col items-start">
                  {/* Logo Section */}
                  <div className="logo flex items-center justify-start">
                    <Link to="/" aria-label="Vision Sprint Home">
                      <img
                      src="/vision_sprint_logo123.png"
                      alt="logo"
                      className="w-10"
                      />
                    </Link>
                   <h2 className="ml-5">Vision Sprint</h2>
                  </div>

                   {/* Footer Print Section */}
                  <div className="mt-5 md:mt-0 md:ml-10 group relative">
                    <img
                    src="/footer_print02_NO_BACKGROUND.png"
                    alt="footer print"
                    />
                  
                  </div>
                </div>


                    {/* Area 2: About Vision Sprint */}
                    <div className="about">
                        <h2 className="text-lg font-semibold mb-4">Vision Sprint</h2>
                        <ul className="space-y-2">
                            <li><a href="/#About" className="hover:text-gray-400">About</a></li>
                            <li><a href="/#Services" className="hover:text-gray-400">Our Services</a></li>
                            <li><a href="/#Portfolio" className="hover:text-gray-400">Portfolio</a></li>
                            <li><Link to="/discuss-project" className="hover:text-gray-400">Contact Us</Link></li>
                            <li><Link to="/discuss-project" className="hover:text-gray-400">Careers</Link></li>
                            <li><a href="/#About" className="hover:text-gray-400">Blog</a></li>
                        </ul>
                    </div>

                    {/* Area 3: Connect */}
                    <div className="connect">
                        <h2 className="text-lg font-semibold mb-4">Connect</h2>
                        <ul className="space-y-2">
                            <li><a href="/#Services" className="hover:text-gray-400">Our Services</a></li>
                            <li><Link to="/discuss-project" className="hover:text-gray-400">Contact Us</Link></li>
                            <li><Link to="/discuss-project" className="hover:text-gray-400">Get Started</Link></li>
                            <li><a href="/#About" className="hover:text-gray-400">Privacy Policy</a></li>
                            <li><a href="/#About" className="hover:text-gray-400">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Area 4: Social Media */}
                   
                    <div className="social-media">
      <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
      <ul className="space-y-4">
        <li>
          <a href="#" className="flex items-center space-x-2 text-white hover:text-gray-400">
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm285.8 243H352.1v-101c0-24.4-8.6-41.1-30.1-41.1c-16.4 0-26.1 11.2-30.4 22.1c-1.6 4-2 9.6-2 15.2V416H220.2c.4-163.8-.2-199.2-.2-213.8h62.6v30.3l.4 .5c8.3-12.8 23.2-31.1 56.5-31.1c41.3 0 72.3 27.1 72.3 85.3V416z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center space-x-2 text-white hover:text-gray-400">
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-49.4 150.7c.2 2.8 .2 5.7 .2 8.5c0 87.1-66.4 187.5-187.5 187.5c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34z" />
            </svg>
            <span>Twitter</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center space-x-2 text-white hover:text-gray-400">
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" />
              <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor" />
            </svg>
            <span>Instagram</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center space-x-2 text-white hover:text-gray-400">
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-124.5 43h-42.3c-35.8 0-59.1 24.4-59.1 62.8v24.4h-35.7c-5.3 0-9.6 4.3-9.6 9.6v39.4c0 5.3 4.3 9.6 9.6 9.6h35.7v129.8c0 5.3 4.3 9.6 9.6 9.6h48.4c5.3 0 9.6-4.3 9.6-9.6V269.8h41.2c5.3 0 9.6-4.3 9.6-9.6v-39.4c0-5.3-4.3-9.6-9.6-9.6h-41.2v-18.6c0-14.6 3.5-20.6 20.6-20.6h20.7c5.3 0 9.6-4.3 9.6-9.6V132c0-5.3-4.3-9.6-9.6-9.6z" />
            </svg>
            <span>Facebook</span>
          </a>
        </li>
      </ul>
    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
