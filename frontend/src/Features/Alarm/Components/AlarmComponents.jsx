import React from 'react';
import { useThemeStore } from '../../../Shared/Stores/ThemeStore';
import { ALARM_SOUNDS } from '../../../Shared/Constants/Sounds';

export const AlarmSoundSelect = ({ value, onChange, className }) => {
  const { isDark } = useThemeStore();
  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        px-4 py-2 rounded-lg border
        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-colors
        ${className}
      `}
    >
      {ALARM_SOUNDS.map((sound) => (
        <option key={sound.id} value={sound.id}>
          {sound.name}
        </option>
      ))}
    </select>
  );
};

const VolumeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 8v8l-4-4H4V12h4l4-4z" />
  </svg>
);

const MuteIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

export const VolumeControl = ({ volume, onVolumeChange, isMuted, onMuteToggle }) => {
  const { isDark } = useThemeStore();
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className={`
          flex-1 h-2 rounded-lg appearance-none cursor-pointer
          ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:cursor-pointer
        `}
      />
      <button
        type="button"
        onClick={onMuteToggle}
        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </button>
    </div>
  );
};