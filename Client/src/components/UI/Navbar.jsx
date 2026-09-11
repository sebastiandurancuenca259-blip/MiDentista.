import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ currentPage = 'home', setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setIsMobileMenuOpen(false);
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs border-b border-slate-100">
      {/* Main Navbar Container */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-[#0f172a] group cursor-pointer text-left shrink-0"
          >
            <div className="w-9 h-9 flex items-center justify-center text-[#0f172a] group-hover:scale-105 transition-transform">
              <svg fill="none" viewBox="0 0 48 48" className="w-9 h-9 text-[#0f172a]" xmlns="http://www.w3.org/2000/svg">
                <path 
                  clipRule="evenodd" 
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" 
                  fill="currentColor" 
                  fillRule="evenodd"
                />
                <path 
                  clipRule="evenodd" 
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" 
                  fill="currentColor" 
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-[#0f172a] text-2xl font-serif font-bold tracking-tight">
              DentaPremium
            </h2>
          </button>

          {/* Desktop Links & CTA Right-Aligned */}
          <div className="hidden lg:flex items-center gap-8 ml-auto justify-end">
            <nav className="flex items-center gap-8">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  currentPage === 'home' ? 'text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  currentPage === 'services' ? 'text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Services
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  currentPage === 'about' ? 'text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('team')}
                className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  currentPage === 'team' ? 'text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Our Team
              </button>

              <button
                onClick={() => handleNavClick('reviews')}
                className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  currentPage === 'reviews' ? 'text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Reviews
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  currentPage === 'contact' ? 'text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Contact
              </button>
            </nav>

            <button
              onClick={() => handleNavClick('booking')}
              className={`flex items-center justify-center rounded-full h-11 px-7 text-xs font-semibold tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer ${
                currentPage === 'booking'
                  ? 'bg-[#0ea5e9] text-white ring-2 ring-[#0ea5e9]/50'
                  : 'bg-[#0f172a] text-white hover:bg-[#0ea5e9]'
              }`}
            >
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0f172a] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 pt-4 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left font-medium text-base py-2 border-b border-slate-100 ${
                currentPage === 'home' ? 'text-[#0ea5e9] font-bold' : 'text-[#0f172a]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`text-left font-medium text-base py-2 border-b border-slate-100 ${
                currentPage === 'services' ? 'text-[#0ea5e9] font-bold' : 'text-[#0f172a]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left font-medium text-base py-2 border-b border-slate-100 ${
                currentPage === 'about' ? 'text-[#0ea5e9] font-bold' : 'text-[#0f172a]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className={`text-left font-medium text-base py-2 border-b border-slate-100 ${
                currentPage === 'team' ? 'text-[#0ea5e9] font-bold' : 'text-[#0f172a]'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className={`text-left font-medium text-base py-2 border-b border-slate-100 ${
                currentPage === 'reviews' ? 'text-[#0ea5e9] font-bold' : 'text-[#0f172a]'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left font-medium text-base py-2 border-b border-slate-100 ${
                currentPage === 'contact' ? 'text-[#0ea5e9] font-bold' : 'text-[#0f172a]'
              }`}
            >
              Contact
            </button>
          </nav>

          <button
            onClick={() => handleNavClick('booking')}
            className="flex items-center justify-center w-full rounded-full h-12 px-6 bg-[#0f172a] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#0ea5e9] transition-all shadow-md mt-2"
          >
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;