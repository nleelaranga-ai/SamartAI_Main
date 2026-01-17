import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  onClick,
  className,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-indigo-700 hover:bg-indigo-600 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-500/30',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500 border border-gray-600 shadow-md',
    accent: 'bg-teal-500 hover:bg-teal-400 text-white focus:ring-teal-500 shadow-lg shadow-teal-500/30',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      {...props}
    >
      {icon && <span className={`mr-2 ${size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`}>{icon}</span>}
      {children}
    </button>
  );
};
