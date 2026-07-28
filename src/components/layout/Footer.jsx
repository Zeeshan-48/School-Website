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
              <a href={SCHOOL_INFO.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-900/60 border border-green-700/60 flex items-center justify-center text-green-200 hover:text-slate-950 hover:bg-[#84CC16] hover:border-[#84CC16] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href={SCHOOL_INFO.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-900/60 border border-green-700/60 flex items-center justify-center text-green-200 hover:text-slate-950 hover:bg-[#84CC16] hover:border-[#84CC16] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href={SCHOOL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-900/60 border border-green-700/60 flex items-center justify-center text-green-200 hover:text-slate-950 hover:bg-[#84CC16] hover:border-[#84CC16] transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-poppins text-white text-base font-bold tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.slice(0, 5).map((link) => (
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
                <span>{SCHOOL_INFO.address}</span>
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-green-200/70 gap-4">
          <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
