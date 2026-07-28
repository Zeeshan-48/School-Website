import React from 'react';

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  centered = true,
  theme = 'dark', // 'dark' (for light bg text) or 'light' (for dark bg text)
  className = ''
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-3 text-xs font-bold tracking-widest uppercase bg-[#F0FDF4] border border-[#22C55E]/30 text-[#166534] rounded-full shadow-xs">
          {badge}
        </span>
      )}
      <h2 className={`font-poppins text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
        theme === 'light' ? 'text-white' : 'text-[#111827]'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-inter mt-4 text-base sm:text-lg leading-relaxed ${
          theme === 'light' ? 'text-green-100' : 'text-[#4B5563]'
        }`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-20 bg-linear-to-r from-[#166534] via-[#22C55E] to-[#84CC16] rounded-full mt-4 ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};

export default SectionTitle;
