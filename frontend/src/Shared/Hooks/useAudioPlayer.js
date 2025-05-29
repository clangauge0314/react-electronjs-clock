import { useState, useCallback } from 'react';

export const useAudioPlayer = () => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const playSound = useCallback((soundId, volume = 0.7, loop = true) => {
    try {
      const audio = new Audio(`/sounds/${soundId}.mp3`);
      audio.volume = volume;
      audio.loop = loop;
      audio.play().catch(error => console.error('사운드 재생 실패:', error));
      setCurrentAudio(audio);
      return audio;
    } catch (error) {
      console.error('Audio 객체 생성 실패:', error);
      return null;
    }
  }, []);

  const stopSound = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  const sendNotification = useCallback((title, body, icon = '/icon.png') => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon });
    }
  }, []);

  return {
    currentAudio,
    setCurrentAudio,
    playSound,
    stopSound,
    sendNotification
  };
};