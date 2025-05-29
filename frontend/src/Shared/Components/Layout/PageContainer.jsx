import React from 'react';
import { useThemeStore } from '../../Stores/ThemeStore';

const PageContainer = ({ 
  children, 
  centered = true, 
  padding = 'p-8',
  className = '' 
}) => {
  const { isDark } = useThemeStore();

  return (
    <div className={`
      h-full ${padding}
      ${centered ? 'flex flex-col items-center justify-center' : ''}
      ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-800'}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default PageContainer;