import React, { useEffect, useState, useRef } from 'react';
import { useThemeStore } from '../../Shared/Stores/ThemeStore';
import { BiBell } from 'react-icons/bi';
import { AudioManager } from '../../Features/Alarm/Utils/AlarmUtils';
import { useEscapeKey } from '../../Shared/Utils/ModalUtils';

/**
 * 알람/타이머 종료 시 표시되는 알림 모달
 */
const RingModal = ({ isOpen, onClose, alarm }) => {
  const { isDark } = useThemeStore();
  const [soundStarted, setSoundStarted] = useState(false);
  const soundTimerRef = useRef(null);
  const alarmRef = useRef(alarm);

  // alarm prop이 변경될 때 ref 업데이트
  useEffect(() => {
    alarmRef.current = alarm;
  }, [alarm]);

  // 이벤트 핸들러
  const handleClose = () => {
    // 타이머가 있다면 클리어
    if (soundTimerRef.current) {
      clearTimeout(soundTimerRef.current);
      soundTimerRef.current = null;
    }
    
    // 모든 오디오 정리
    AudioManager.stopSound();
    setSoundStarted(false);
    
    try {
      if (typeof window.electron?.disableAlwaysOnTop === 'function') {
        window.electron.disableAlwaysOnTop();
      }
    } catch (error) {
      console.log('Electron functions not available');
    }
    
    // 부모 컴포넌트의 onClose 호출하여 추가적인 오디오 정리 수행
    onClose();
  };

  // 알람 소리 재생 함수
  const playAlarmSound = () => {
    if (!alarmRef.current) return;
    
    try {
      // Timer에서 전달받은 sound_id와 volume 사용
      AudioManager.playSound(alarmRef.current.sound_id, alarmRef.current.volume, true);
      
      // 5초마다 소리를 계속 재생하여 중단되지 않도록 함
      soundTimerRef.current = setTimeout(() => {
        if (isOpen) {
          playAlarmSound();
        }
      }, 5000);
    } catch (error) {
      console.error('알람 소리 재생 실패:', error);
    }
  };

  // 모달 열릴 때 효과
  useEffect(() => {
    if (isOpen) {
      // Electron 창 포커스 (여러 방법 시도)
      try {
        if (typeof window.electron?.focusWindow === 'function') {
          window.electron.focusWindow();
        }
        if (typeof window.electron?.showWindow === 'function') {
          window.electron.showWindow();
        }
        if (typeof window.electron?.setAlwaysOnTop === 'function') {
          window.electron.setAlwaysOnTop(true);
        }
      } catch (error) {
        console.log('Electron functions not available');
      }

      if (alarm) {
        if (!soundStarted) {
          setSoundStarted(true);
          playAlarmSound();
        }
      }
    } else {
      // 모달이 닫힐 때 정리
      if (soundTimerRef.current) {
        clearTimeout(soundTimerRef.current);
        soundTimerRef.current = null;
      }
      AudioManager.stopSound();
      setSoundStarted(false);
    }
  }, [isOpen, alarm, soundStarted]);

  // 모달이 언마운트될 때 정리
  useEffect(() => {
    return () => {
      if (soundTimerRef.current) {
        clearTimeout(soundTimerRef.current);
      }
      // 컴포넌트 언마운트 시에도 오디오 정리
      AudioManager.stopSound();
      try {
        if (typeof window.electron?.disableAlwaysOnTop === 'function') {
          window.electron.disableAlwaysOnTop();
        }
      } catch (error) {
        console.log('Electron functions not available');
      }
    };
  }, []);

  // Escape 키 처리
  useEscapeKey(isOpen, handleClose);

  if (!isOpen) {
    return null;
  }

  if (!alarm) {
    return null;
  }

  return (
    <>
      {/* 모달 백드롭 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={handleClose}
      />
      
      {/* 모달 콘텐츠 */}
      <div className={`
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-full max-w-md p-6 rounded-2xl z-50 shadow-xl
        ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      `}>
        <div className="flex flex-col items-center gap-6">
          {/* 아이콘 */}
          <div className="animate-bounce">
            <BiBell className="w-16 h-16 text-blue-500" />
          </div>
          
          {/* 메시지 */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              타이머 종료!
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              설정한 시간이 끝났습니다
            </p>
          </div>

          {/* 확인 버튼 */}
          <button
            onClick={handleClose}
            className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default RingModal; 