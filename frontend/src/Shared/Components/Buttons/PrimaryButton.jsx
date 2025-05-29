import React from 'react';
import { useThemeStore } from '../../Stores/ThemeStore';

const PrimaryButton = ({ 
  children, 
  onClick, 
  color = 'indigo', 
  size = 'md',
  icon = null,
  disabled = false,
  className = '',
  ...props 
}) => {
  const { isDark } = useThemeStore();
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  const colorClasses = {
    indigo: isDark ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600',
    blue: isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
    green: isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600',
    red: isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600',
    purple: isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600',
    gray: isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${className}
        rounded-full
        text-white
        transition-all duration-200
        shadow-lg hover:shadow-xl
        transform hover:-translate-y-0.5
        flex items-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      `}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default PrimaryButton;