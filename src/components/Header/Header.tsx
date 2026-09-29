import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FOCUS, MagneticLink, trackPointer } from '../Glass/Glass';

interface NavItem {
  label: string;
  href: string;
  internal: boolean; // react-router Link vs. hash anchor on the home page
}

const NAV: NavItem[] = [
  { label: 'Our Services', href: '/#Services', internal: false },
  { label: 'Portfolio', href: '/#Portfolio', internal: false },
  { label: 'Contact Us', href: '/discuss-project', internal: true },
  { label: 'Get Started', href: '/discuss-project', internal: true },
];

const LINK = `text-gray-600 transition-colors duration-300 hover:text-orange-500 ${FOCUS}`;

function NavLink({ item, className }: { item: NavItem; className: string }) {
  return item.internal ? (
    <Link to={item.href} className={className}>{item.label}</Link>
  ) : (
    <a href={item.href} className={className}>{item.label}</a>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="sticky top-0 z-50 w-full px-3 sm:px-6">
      <div
        onPointerMove={trackPointer}
        className="glass mx-auto mt-3 w-full max-w-7xl rounded-2xl !bg-white/60 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className={`flex items-center ${FOCUS}`}>
            <img src="/vision_sprint_logo123.png" alt="logo" className="w-10" />
            <h3 className="ml-4 font-semibold tracking-[-0.02em] text-black">Vision Sprint</h3>
          </Link>

          {/* Desktop navigation, hidden below 815px */}
          <div className="hidden items-center space-x-8 min-[815px]:flex">
            {NAV.map((item) => (
              <NavLink key={item.label} item={item} className={LINK} />
            ))}
          </div>

          <div className="hidden items-center min-[815px]:flex">
            <MagneticLink to="/discuss-project" className="rounded-md bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-2 text-white">
              Discuss a Project
            </MagneticLink>
          </div>

          {/* Mobile menu button, visible below 815px */}
          <div className="min-[815px]:hidden">
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className={`rounded-md p-2 text-gray-600 hover:text-orange-500 ${FOCUS}`}
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, visible below 815px */}
      {isMenuOpen && (
        <div id="mobile-menu" onPointerMove={trackPointer} className="glass absolute left-3 right-3 top-[5.25rem] rounded-2xl !bg-white/80 min-[815px]:hidden sm:left-6 sm:right-6">
          <div className="space-y-4 px-4 pb-4 pt-3">
            {NAV.map((item) => (
              <NavLink key={item.label} item={item} className={`block ${LINK}`} />
            ))}
            <Link
              to="/discuss-project"
              className={`block w-full rounded-md bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-2 text-center text-white active:scale-[0.97] ${FOCUS}`}
            >
              Discuss a Project
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
