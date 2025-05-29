import React from 'react';
import { useThemeStore } from '../../Stores/ThemeStore';

const DateDisplay = ({ date, className = '' }) => {
  const { isDark } = useThemeStore();
  
  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light
      ${isDark ? 'text-gray-300' : 'text-gray-600'}
      ${className}
    `}>
      {formatDate(date)}
    </div>
  );
};

export default DateDisplay;