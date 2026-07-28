import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Building2, UserCheck, Info } from 'lucide-react';
import { NAV_LINKS, ROUTES } from '../../utils/routes';
import { SCHOOL_INFO } from '../../utils/constants';
import { useApp } from '../../context/AppContext';

import schoolLogo from '../../assets/logo.png';

const ABOUT_DROPDOWN_ITEMS = [
  {
    name: 'About Us',
    desc: 'Our 25+ years legacy, vision & leadership',
    path: ROUTES.ABOUT,
    icon: Info
  },
  {
    name: 'Facilities',
    desc: 'Campus infrastructure & amenities',
    path: ROUTES.FACILITIES,
    icon: Building2
  },
  {
    name: 'Faculties',
    desc: 'Teaching mentors & department heads',
    path: ROUTES.FACULTY,
    icon: UserCheck
  }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutExpanded, setIsMobileAboutExpanded] = useState(false);
  
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    closeMobileMenu();
    setIsAboutDropdownOpen(false);
    setIsMobileAboutExpanded(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Sleek Minimal Nav Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-slate-200/80' 
          : 'bg-white/85 backdrop-blur-sm py-4 border-b border-slate-100/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Minimal Logo & Brand */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-0.5 shadow-xs border border-slate-200/80 flex items-center justify-center shrink-0 group-hover:border-[#166534] transition-colors">
              <img
                src={schoolLogo}
                alt={SCHOOL_INFO.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins text-base sm:text-lg font-bold tracking-tight text-[#111827] leading-none">
                APEX <span className="text-[#166534]">SCHOOL</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                International Campus
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {NAV_LINKS.map((link) => {
              const isAboutLink = link.path === ROUTES.ABOUT;
              const isDropdownPageActive = isAboutLink && (
                location.pathname === ROUTES.ABOUT ||
                location.pathname === ROUTES.FACILITIES || 
                location.pathname === ROUTES.FACULTY
              );
              const isActive = location.pathname === link.path || isDropdownPageActive;

              if (isAboutLink) {
                return (
                  <div
                    key={link.path}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsAboutDropdownOpen(true)}
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                      className={`text-xs sm:text-sm font-bold transition-all px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#166534] text-white shadow-xs scale-105'
                          : 'text-[#4B5563] hover:text-[#166534] hover:bg-[#F0FDF4]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* About Us Usable Dropdown Menu with Hover Bridge */}
                    {isAboutDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                          {ABOUT_DROPDOWN_ITEMS.map((item) => {
                            const IconComp = item.icon;
                            const isItemActive = location.pathname === item.path;
                            return (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsAboutDropdownOpen(false)}
                                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors group/item ${
                                  isItemActive ? 'bg-[#F0FDF4] text-[#166534]' : 'hover:bg-[#F0FDF4]'
                                }`}
                              >
                                <div className="p-2 rounded-lg bg-[#F0FDF4] text-[#166534] group-hover/item:bg-[#166534] group-hover/item:text-white transition-colors shrink-0">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="font-poppins text-xs font-bold text-[#111827] group-hover/item:text-[#166534] block">
                                    {item.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 block leading-tight">
                                    {item.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs sm:text-sm font-bold transition-all px-3.5 py-1.5 rounded-full ${
                    isActive
                      ? 'bg-[#166534] text-white shadow-xs scale-105'
                      : 'text-[#4B5563] hover:text-[#166534] hover:bg-[#F0FDF4]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Apply CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={ROUTES.ADMISSION}
              className="bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Controls (Hamburger) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-[#111827] hover:bg-[#F0FDF4] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 py-4 px-6 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isAboutLink = link.path === ROUTES.ABOUT;
              const isActive = location.pathname === link.path;

              if (isAboutLink) {
                return (
                  <div key={link.path} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setIsMobileAboutExpanded(!isMobileAboutExpanded)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between w-full ${
                        isActive
                          ? 'bg-[#166534] text-white shadow-xs'
                          : 'text-[#4B5563] hover:bg-[#F0FDF4] hover:text-[#166534]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMobileAboutExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Submenu Accordion */}
                    {isMobileAboutExpanded && (
                      <div className="pl-4 py-2 space-y-1 bg-slate-50 rounded-xl my-1 border border-slate-200/60">
                        {ABOUT_DROPDOWN_ITEMS.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#4B5563] hover:text-[#166534]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#166534] text-white shadow-xs'
                      : 'text-[#4B5563] hover:bg-[#F0FDF4] hover:text-[#166534]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}
            
            <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-2">
              <Link
                to={ROUTES.ADMISSION}
                onClick={closeMobileMenu}
                className="w-full text-center bg-[#166534] text-white text-sm font-bold py-2.5 rounded-xl shadow-xs"
              >
                Apply Online 2026-27
              </Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
