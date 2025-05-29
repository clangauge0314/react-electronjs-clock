import { useThemeStore } from '../Stores/ThemeStore';

export const useTimeFormat = () => {
  const { is24Hour } = useThemeStore();

  const formatTime = (date, showMilliseconds = false) => {
    if (!is24Hour) {
      const hours = date.getHours();
      const ampm = hours >= 12 ? '오후' : '오전';
      const displayHours = hours % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      
      if (showMilliseconds) {
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        return `${ampm} ${displayHours}:${minutes}:${seconds}.${milliseconds}`;
      }
      
      return `${ampm} ${displayHours}:${minutes}:${seconds}`;
    }
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    if (showMilliseconds) {
      const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatTimerTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    formatTime,
    formatTimerTime
  };
};