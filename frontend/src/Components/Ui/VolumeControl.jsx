import React from 'react';
import { useThemeStore } from '../../Shared/Stores/themeStore';

const VolumeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 8v8l-4-4H4V12h4l4-4z" />
  </svg>
);

const MuteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

const VolumeControl = ({ 
  volume, 
  isMuted, 
  onVolumeChange, 
  onMuteToggle,
  className = '' 
}) => {
  const { isDark } = useThemeStore();

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (onVolumeChange) {
      onVolumeChange(newVolume);
    }
  };

  const handleMuteToggle = () => {
    if (onMuteToggle) {
      onMuteToggle();
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={handleMuteToggle}
        className={`p-2 rounded-lg transition-colors ${
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </button>
      
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          disabled={isMuted}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          } ${isMuted ? 'opacity-50' : ''}`}
          style={{
            background: isDark 
              ? `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`
              : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
          }}
        />
      </div>
      
      <span className={`text-sm min-w-[3ch] ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {Math.round((isMuted ? 0 : volume) * 100)}%
      </span>
    </div>
  );
};

export default VolumeControl;