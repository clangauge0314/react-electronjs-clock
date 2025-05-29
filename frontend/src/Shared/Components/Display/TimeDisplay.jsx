import React from 'react';
import { useThemeStore } from '../../Stores/ThemeStore';

const TimeDisplay = ({ 
  time, 
  showMilliseconds = false, 
  size = 'xl',
  className = '' 
}) => {
  const { isDark } = useThemeStore();
  
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl md:text-5xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl'
  };

  return (
    <div className={`
      ${sizeClasses[size]}
      ${className}
      font-bold tracking-wider
      ${isDark ? 'text-white' : 'text-gray-800'}
    `}>
      {time}
    </div>
  );
};

export default TimeDisplay;