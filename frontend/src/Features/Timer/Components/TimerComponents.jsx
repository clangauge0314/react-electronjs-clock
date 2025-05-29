import React from 'react';
import { useThemeStore } from '../../../Shared/Stores/ThemeStore';
import { TIMER_SOUNDS } from '../../../Shared/Constants/Sounds';

export const TimerSoundSelect = ({ value, onChange, className }) => {
  const { isDark } = useThemeStore();
  
  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        px-4 py-2 rounded-lg border
        ${isDark 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-gray-300 text-gray-900'
        }
        ${className}
      `}
    >
      {TIMER_SOUNDS?.map((sound) => (
        <option key={sound.id} value={sound.id}>
          {sound.name}
        </option>
      ))}
    </select>
  );
};

export const VolumeControl = ({ volume, onVolumeChange, isMuted, onMuteToggle }) => {
  const { isDark } = useThemeStore();
  
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onMuteToggle}
        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
      >
        {isMuted ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="flex-1 accent-blue-500"
      />
    </div>
  );
}; 