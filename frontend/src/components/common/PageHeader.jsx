import React from 'react';
import { motion } from 'framer-motion';
import { getFallbackUrl, IMAGES } from '../../utils/images';

export const PageHeader = ({ icon: Icon, badge, title, subtitle, bgImage, imagePosition = "object-[center_35%]", heightClass = "h-[180px] sm:h-[220px] lg:h-[260px]" }) => {
  const defaultBg = IMAGES.banners.home;
  const fallbackBg = getFallbackUrl(['indian', 'school', 'header']);

  return (
    <section className="relative w-full pt-[76px] bg-slate-950 overflow-hidden border-b border-emerald-900/40 group">

      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={bgImage || defaultBg}
          alt={title}
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackBg; }}
          className={`w-full h-full object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-105`}
        />
        {/* Balanced Bright Overlay for Clear Image Recognition & Text Legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/65 via-slate-950/45 to-slate-950/25 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-slate-950/20 pointer-events-none" />
      </div>

      {/* 100% Fixed Height Center Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pb-8 sm:pb-10 pt-4 sm:pt-6 ${heightClass}`}
      >
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-lime-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-md backdrop-blur-md shrink-0">
            {Icon && <Icon className="w-4 h-4 text-lime-400" />}
            <span>{badge}</span>
          </div>
        )}

        <h1 className="font-poppins text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-snug select-text drop-shadow-md">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-xs sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed font-inter line-clamp-2 select-text drop-shadow-xs font-medium">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default PageHeader;
