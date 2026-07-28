import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  to,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'gold', 'white', 'glass'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22C55E] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2 shadow-md hover:shadow-lg',
    lg: 'px-8 py-3.5 text-lg gap-2.5 shadow-lg hover:shadow-xl'
  };

  const variantStyles = {
    primary: 'bg-[#166534] hover:bg-[#14532d] text-white hover:scale-[1.02]',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-[1.02]',
    gold: 'bg-linear-to-r from-[#84CC16] to-[#22C55E] hover:from-[#75b713] hover:to-[#16a34a] text-slate-950 font-bold hover:scale-[1.02]',
    outline: 'bg-white border-2 border-[#166534] text-[#166534] hover:bg-[#F0FDF4] hover:scale-[1.02]',
    white: 'bg-white text-slate-900 hover:bg-slate-100 hover:scale-[1.02] shadow-md border border-slate-200',
    glass: 'bg-white/15 backdrop-blur-md border border-white/35 text-white hover:bg-white/25 hover:border-white/60 hover:scale-[1.02] shadow-md'
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

export default Button;
