import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-white">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-sky-500 to-amber-400 p-1 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-widest text-white uppercase">
        Apex <span className="text-sky-400">School</span>
      </h3>
      <p className="mt-2 text-xs text-amber-400 font-semibold tracking-wider uppercase animate-pulse">
        Loading Excellence...
      </p>
    </div>
  );
};
