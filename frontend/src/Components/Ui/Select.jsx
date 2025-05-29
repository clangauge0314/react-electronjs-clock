import React from 'react';
import { useThemeStore } from '../../Shared/Stores/themeStore';

const Select = ({ 
  label, 
  options = [], 
  error, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  const { isDark } = useThemeStore();

  return (
    <div className={containerClassName}>
      {label && (
        <label className={`block text-sm font-medium mb-1 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-3 py-2 rounded-lg border
          ${isDark 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-900'
          }
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className={isDark ? 'bg-gray-700' : 'bg-white'}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;