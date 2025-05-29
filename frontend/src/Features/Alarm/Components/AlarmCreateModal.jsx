import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../../Shared/Stores/ThemeStore';
import { useAlarmStore } from '../../../Shared/Stores/AlarmStore';
import { AlarmSoundSelect } from '../../../Features/Alarm/Components/AlarmComponents';
import { getCurrentTime } from '../Utils/AlarmUtils';
import {
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalFooter,
  SoundPreviewButton,
  useModalCleanup,
  useEscapeKey
} from '../../../Shared/Utils/ModalUtils';
import VolumeControl from '../../../Components/Ui/VolumeControl';

/**
 * 새 알람 생성 모달 컴포넌트
 */
const AlarmCreateModal = ({ isOpen, onClose }) => {
  const { isDark } = useThemeStore();
  const { createAlarm, isLoading, currentAudio, setCurrentAudio } = useAlarmStore();
  
  // 로컬 상태 관리 (스토어와 분리)
  const [alarmTime, setAlarmTime] = useState(getCurrentTime());
  const [selectedSound, setSelectedSound] = useState('music1');
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 이벤트 핸들러
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
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAlarm({
        alarm_time: alarmTime,
        sound_id: selectedSound,
        volume: isMuted ? 0 : volume,
        is_active: true
      });
      handleClose();
    } catch (err) {
      console.error('알람 생성 실패:', err);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (currentAudio && !isMuted) {
      currentAudio.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (currentAudio) {
      currentAudio.volume = newMutedState ? 0 : volume;
    }
  };

  // 사운드 변경 시 프리뷰 정지
  useEffect(() => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  }, [selectedSound]);

  // 공통 훅 사용
  useEscapeKey(isOpen, handleClose);
  useModalCleanup(isOpen, () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  });

  return (
    <>
      <ModalBackdrop isOpen={isOpen} onClose={handleClose} />
      <ModalContainer isOpen={isOpen}>
        <ModalHeader title="새 알람 추가" onClose={handleClose} />

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* 시간 입력 */}
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              step="1"
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />

            {/* 사운드 선택 & 미리듣기 */}
            <div className="flex gap-2">
              <AlarmSoundSelect
                value={selectedSound}
                onChange={(e) => setSelectedSound(e.target.value)}
                className="flex-1"
              />
              <SoundPreviewButton 
                isPlaying={isPlaying} 
                onTogglePreview={handlePreviewToggle}
                isDark={isDark}
              />
            </div>

            {/* 볼륨 컨트롤 */}
            <VolumeControl
              volume={volume}
              onVolumeChange={handleVolumeChange}
              isMuted={isMuted}
              onMuteToggle={handleMuteToggle}
            />
          </div>

          {/* 버튼 영역 */}
          <ModalFooter 
            onCancel={handleClose}
            onSubmit={handleSubmit}
            submitText="알람 설정"
            isLoading={isLoading}
          />
        </form>
      </ModalContainer>
    </>
  );
};

export default AlarmCreateModal; 