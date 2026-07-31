import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../utils/routes';

const PAGE_NAMES = {
  [ROUTES.ABOUT]: 'About',
  [ROUTES.ACADEMICS]: 'Academics',
  [ROUTES.FACILITIES]: 'Facilities',
  [ROUTES.FACULTY]: 'Faculties & Staff',
  [ROUTES.GALLERY]: 'Media Gallery',
  [ROUTES.ADMISSION]: 'Admissions',
  [ROUTES.CAREER]: 'Careers',
  [ROUTES.CONTACT]: 'Contact Us',
  [ROUTES.VISION_MISSION]: 'Vision & Mission'
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === ROUTES.HOME) return null;

  const pageTitle = PAGE_NAMES[currentPath] || 'Page';

  return (
    <div className="bg-[#051609] border-b border-emerald-900/60 pt-20 pb-2.5 px-4 text-xs font-medium text-[#F0FDF4]/80">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <Link to={ROUTES.HOME} className="hover:text-lime-400 inline-flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5 text-lime-400" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-emerald-[#166534]" />
        <span className="text-lime-400 font-bold">{pageTitle}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
