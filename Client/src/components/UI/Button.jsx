import React from 'react';

/**
 * Reusable Button UI Component based on Design System
 * 
 * Variants:
 * - primary: Dark primary background with white text
 * - secondary: Soft surface background with dark text
 * - inverted: Inverted dark background with white text
 * - outlined: Outlined border with transparent background
 * - danger/emergency: Red error container variant
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  icon: Icon,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-md gap-1.5",
    md: "px-6 py-2.5 text-sm font-bold rounded-lg h-10 gap-2",
    lg: "px-8 py-3.5 text-base font-bold rounded-xl h-12 gap-2.5"
  };

  const variantStyles = {
    primary: "bg-[#004c6e] text-white hover:bg-[#003953] active:scale-[0.99] shadow-sm",
    secondary: "bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5] active:scale-[0.99]",
    inverted: "bg-[#191c1e] text-white hover:bg-[#2d3133] active:scale-[0.99]",
    outlined: "border border-[#c6c6cd] text-[#191c1e] bg-transparent hover:bg-[#f2f4f6] active:scale-[0.99]",
    accent: "bg-[#0ea5e9] text-white hover:bg-[#0284c7] active:scale-[0.99] shadow-sm",
    danger: "bg-[#ba1a1a] text-white hover:bg-[#93000a] active:scale-[0.99]"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${widthStyle} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" className={combinedClasses} onClick={onClick} {...props}>
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
