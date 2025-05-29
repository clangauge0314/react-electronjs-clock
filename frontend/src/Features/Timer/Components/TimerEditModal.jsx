import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../../Shared/Stores/ThemeStore';
import { TIMER_SOUNDS } from '../../../Shared/Constants/Sounds';

/**
 * 타이머 설정 모달 컴포넌트
 */
const TimerEditModal = ({ isOpen, onClose, onSuccess, initialTimer }) => {
  const { isDark } = useThemeStore();
  
  // 상태 관리
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('05');
  const [seconds, setSeconds] = useState('00');
  const [selectedSound, setSelectedSound] = useState('music1');
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 초기 타이머 정보 설정
  useEffect(() => {
    if (isOpen && initialTimer) {
      const duration = initialTimer.duration;
      setHours(Math.floor(duration / 3600000).toString().padStart(2, '0'));
      setMinutes(Math.floor((duration % 3600000) / 60000).toString().padStart(2, '0'));
      setSeconds(Math.floor((duration % 60000) / 1000).toString().padStart(2, '0'));
      setSelectedSound(initialTimer.sound_id);
      setVolume(initialTimer.volume);
      setIsMuted(initialTimer.volume === 0);
    } else if (isOpen) {
      resetForm();
    }
  }, [isOpen, initialTimer]);

  // ESC 키 이벤트 처리
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen]);

  // 모달 닫힐 때 오디오 정리
  useEffect(() => {
    if (!isOpen && currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  }, [isOpen, currentAudio]);

  // 이벤트 핸들러
  const resetForm = () => {
    setHours('00');
    setMinutes('05');
    setSeconds('00');
    setSelectedSound('music1');
    setVolume(0.7);
    setIsMuted(false);
  };

  const handleClose = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(false);
    onClose();
  };

  const handlePreviewToggle = () => {
    if (isPlaying) {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      setIsPlaying(false);
    } else {
      const audio = new Audio(`/sounds/${selectedSound}.mp3`);
      audio.volume = isMuted ? 0 : volume;
      audio.play().catch(console.error);
      setCurrentAudio(audio);
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (currentAudio) {
      currentAudio.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (currentAudio) {
      currentAudio.volume = newMuted ? 0 : volume;
    }
  };

  const handleTimeChange = (type, value) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    
    switch (type) {
      case 'hours':
        setHours(Math.min(23, numValue).toString().padStart(2, '0'));
        break;
      case 'minutes':
        setMinutes(Math.min(59, numValue).toString().padStart(2, '0'));
        break;
      case 'seconds':
        setSeconds(Math.min(59, numValue).toString().padStart(2, '0'));
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalMs = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
    
    if (totalMs <= 0) {
      alert('올바른 시간을 입력해주세요.');
      return;
    }

    const timerSettings = {
      duration: totalMs,
      sound_id: selectedSound,
      volume: isMuted ? 0 : volume
    };

    onSuccess(timerSettings);
    handleClose();
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* 백드롭 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className={`
        relative w-full max-w-md mx-4 p-6 rounded-lg shadow-xl
        ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      `}>
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">타이머 설정</h2>
          <button
            onClick={handleClose}
            className={`p-1 rounded-full ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 시간 입력 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">시간 설정</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-center mb-1">시</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => handleTimeChange('hours', e.target.value)}
                  className={`w-full px-3 py-2 text-center rounded border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-center mb-1">분</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => handleTimeChange('minutes', e.target.value)}
                  className={`w-full px-3 py-2 text-center rounded border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-center mb-1">초</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => handleTimeChange('seconds', e.target.value)}
                  className={`w-full px-3 py-2 text-center rounded border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 사운드 선택 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">알림 사운드</label>
            <div className="flex gap-2">
              <select
                value={selectedSound}
                onChange={(e) => setSelectedSound(e.target.value)}
                className={`flex-1 px-3 py-2 rounded border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {TIMER_SOUNDS?.map((sound) => (
                  <option key={sound.id} value={sound.id}>
                    {sound.name}
                  </option>
                )) || (
                  <option value="music1">기본 사운드</option>
                )}
              </select>
              <button
                type="button"
                onClick={handlePreviewToggle}
                className={`px-4 py-2 rounded text-white ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isPlaying ? '중지' : '미리듣기'}
              </button>
            </div>
          </div>

          {/* 볼륨 조절 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">볼륨</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleMuteToggle}
                className={`p-2 rounded ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              볼륨: {Math.round(volume * 100)}%
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className={`px-4 py-2 rounded border ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              설정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimerEditModal; 