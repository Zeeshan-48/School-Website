import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, ROUTES } from '../../utils/routes';
import { SCHOOL_INFO } from '../../utils/constants';
import schoolLogo from '../../assets/logo.png';

export const Footer = () => {
  return (
    <footer className="bg-[#0f3d21] text-white pt-16 pb-8 border-t border-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-green-800/60">

          {/* Column 1 & 2: School Identity & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-1 shadow-md border border-green-700/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={schoolLogo}
                  alt={SCHOOL_INFO.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight block">
                  APEX <span className="text-[#22C55E]">SCHOOL</span>
                </span>
                <span className="text-[10px] sm:text-xs text-lime-400 font-bold tracking-wider uppercase mt-0.5 block">
                  International Campus
                </span>
              </div>
            </Link>
            <p className="text-green-100/80 text-sm leading-relaxed max-w-sm">
              Empowering students through academic excellence, character building, innovation, and global values since {SCHOOL_INFO.established}.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://google.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-900/60 border border-green-700/60 flex items-center justify-center text-green-200 hover:text-slate-950 hover:bg-[#84CC16] hover:border-[#84CC16] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
              </a>
              <a href={SCHOOL_INFO.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-900/60 border border-green-700/60 flex items-center justify-center text-green-200 hover:text-slate-950 hover:bg-[#84CC16] hover:border-[#84CC16] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={SCHOOL_INFO.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-900/60 border border-green-700/60 flex items-center justify-center text-green-200 hover:text-slate-950 hover:bg-[#84CC16] hover:border-[#84CC16] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-poppins text-white text-base font-bold tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: ROUTES.HOME },
                { name: 'About', path: ROUTES.ABOUT },
                { name: 'Facilities', path: ROUTES.FACILITIES },
                { name: 'Admissions', path: ROUTES.ADMISSION },
                { name: 'Sign In', path: ROUTES.SIGN_IN }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-green-100/80 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Wings */}
          <div className="space-y-4">
            <h4 className="font-poppins text-white text-base font-bold tracking-wider uppercase">Academic Wings</h4>
            <ul className="space-y-2.5 text-sm text-green-100/80">
              <li>
                <Link to={ROUTES.ACADEMICS} className="hover:text-white transition-colors">Pre-Primary (Nursery - UKG)</Link>
              </li>
              <li>
                <Link to={ROUTES.ACADEMICS} className="hover:text-white transition-colors">Primary Wing (Grades 1 - 5)</Link>
              </li>
              <li>
                <Link to={ROUTES.ACADEMICS} className="hover:text-white transition-colors">Secondary Wing (Grades 6 - 10)</Link>
              </li>
              <li>
                <Link to={ROUTES.ACADEMICS} className="hover:text-white transition-colors">Senior Secondary (Grades 11 & 12)</Link>
              </li>
              <li>
                <Link to={ROUTES.ADMISSION} className="hover:text-white transition-colors inline-flex items-center gap-1 text-lime-400 font-semibold">
                  <span>Admissions 2026-27</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-poppins text-white text-base font-bold tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-green-100/80">
                <MapPin className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                <a
                  href={SCHOOL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors"
                >
                  {SCHOOL_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-3 text-green-100/80">
                <Phone className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-green-100/80">
                <Mail className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-green-200/70 gap-4 text-center">
          {/* Left: Copyright */}
          <p className="md:w-1/3 md:text-left">
            © {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved.
          </p>

          {/* Center: Developer Credit */}
          <div className="md:w-1/3 flex items-center justify-center">
            <a 
              href="https://bnintelhub.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-green-200/90 hover:text-lime-400 transition-colors font-medium inline-flex items-center gap-1"
            >
              <span>Developed By</span>
              <span className="text-lime-400 font-bold hover:underline">BN IntelHub</span>
            </a>
          </div>

          {/* Right: Legal Links */}
          <div className="md:w-1/3 flex items-center justify-center md:justify-end gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
