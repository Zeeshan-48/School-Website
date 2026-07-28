import React from 'react';
import { GraduationCap, Home } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ROUTES } from '../utils/routes';

export const NotFound = () => (
  <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-4 text-center">
    <div className="w-20 h-20 rounded-2xl bg-[#F0FDF4] border border-[#22C55E]/30 flex items-center justify-center mb-6 shadow-md">
      <GraduationCap className="w-10 h-10 text-[#166534]" />
    </div>
    <h1 className="font-poppins text-6xl font-extrabold text-[#111827]">404</h1>
    <h2 className="font-poppins text-2xl font-bold mt-2 text-[#166534]">Page Not Found</h2>
    <p className="font-inter text-[#4B5563] mt-2 max-w-md">
      The page you are looking for might have been removed or is temporarily unavailable.
    </p>
    <div className="mt-8">
      <Button to={ROUTES.HOME} variant="primary" icon={Home}>
        Back to Home
      </Button>
    </div>
  </div>
);
export default NotFound;
