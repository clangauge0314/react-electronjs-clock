import React from 'react';
import { useThemeStore } from '../../Shared/Stores/ThemeStore';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  icon,
  disabled = false,
  ...props 
}) => {
  const { isDark } = useThemeStore();
  
  const variants = {
    primary: isDark 
      ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-800' 
      : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300',
    secondary: isDark 
      ? 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-800' 
      : 'bg-purple-500 hover:bg-purple-600 text-white disabled:bg-purple-300',
    outline: isDark
      ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:border-gray-700 disabled:text-gray-500'
      : 'border-gray-300 text-gray-700 hover:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        rounded-lg transition-all duration-200
        flex items-center justify-center gap-2
        border font-medium
        disabled:cursor-not-allowed disabled:opacity-70
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;