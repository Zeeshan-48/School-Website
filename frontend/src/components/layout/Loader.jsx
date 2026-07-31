import React from 'react';
import schoolLogo from '../../assets/logo.png';
import { SCHOOL_INFO } from '../../utils/constants';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#06180C] flex flex-col items-center justify-center text-white overflow-hidden select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,101,52,0.35)_0%,rgba(7,31,16,0.92)_65%,rgba(4,20,10,1)_100%)] pointer-events-none" />
      
      {/* Decorative background glow circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Animated Logo Container with Dual Spinning Rings */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
          {/* Outer Spinning Emerald Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-500/80 animate-spin" style={{ animationDuration: '2s' }} />
          
          {/* Inner Counter-Spinning Lime Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-lime-400 border-l-emerald-300/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Ambient Glow behind Logo */}
          <div className="absolute inset-3 rounded-full bg-emerald-500/20 blur-md animate-pulse" />

          {/* School Logo Container */}
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white p-2.5 shadow-[0_0_25px_rgba(34,197,94,0.35)] border border-emerald-400/40 flex items-center justify-center overflow-hidden">
            <img
              src={schoolLogo}
              alt={SCHOOL_INFO.name}
              className="w-full h-full object-contain drop-shadow-xs"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h3 className="font-poppins text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
          APEX <span className="text-emerald-400">SCHOOL</span>
        </h3>
        
        <p className="mt-1 text-[11px] sm:text-xs text-lime-400 font-bold tracking-[0.25em] uppercase">
          International Campus
        </p>

        {/* Animated Progress Bar */}
        <div className="w-48 sm:w-56 h-1.5 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-700/50 p-0.5 mt-6 shadow-inner">
          <div className="bg-linear-to-r from-emerald-500 via-lime-400 to-emerald-400 h-full rounded-full animate-pulse transition-all duration-500 w-full" />
        </div>

        {/* Loading Excellence Text */}
        <div className="mt-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
          <p className="text-xs font-bold tracking-widest text-emerald-200/90 uppercase animate-pulse">
            Loading Excellence...
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loader;

