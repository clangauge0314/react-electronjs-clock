import { useCallback } from 'react';

export const useWindowControl = () => {
  const triggerAlarmWindow = useCallback(() => {
    try {
      if (typeof window.electron?.alarmTriggered === 'function') {
        window.electron.alarmTriggered();
      }
      
      setTimeout(() => {
        if (typeof window.electron?.focusWindow === 'function') {
          window.electron.focusWindow();
        }
      }, 200);
      
      setTimeout(() => {
        if (typeof window.electron?.showWindow === 'function') {
          window.electron.showWindow();
        }
      }, 400);
    } catch (error) {
      console.log("Electron functions not available");
    }
  }, []);

  const disableAlwaysOnTop = useCallback(() => {
    try {
      if (typeof window.electron?.disableAlwaysOnTop === "function") {
        window.electron.disableAlwaysOnTop();
      }
    } catch (error) {
      console.log("Electron functions not available");
    }
  }, []);

  return {
    triggerAlarmWindow,
    disableAlwaysOnTop
  };
};