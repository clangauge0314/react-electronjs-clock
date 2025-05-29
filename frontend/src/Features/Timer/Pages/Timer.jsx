import React, { useEffect } from 'react';
import { HiPlay, HiPause, HiStop, HiCog } from "react-icons/hi";
import { PageContainer } from '../../../Shared/Components/Layout';
import { TimeDisplay } from '../../../Shared/Components/Display';
import { PrimaryButton } from '../../../Shared/Components/Buttons';
import { useWindowControl, useAudioPlayer } from '../../../Shared/Hooks';
import TimerEditModal from '../Components/TimerEditModal';
import RingModal from '../../../Components/Modals/RingModal';
import { formatTime } from '../Utils/TimerUtils';
import { useTimerStore } from '../../../Shared/Stores/TimerStore';

const Timer = () => {
  const { triggerAlarmWindow } = useWindowControl();
  const { stopSound, sendNotification } = useAudioPlayer();
  
  const {
    timerSettings,
    timeLeft,
    originalTime,
    isRunning,
    startTime,
    saveTimerSettings,
    getTimerSettings,
    setTimeLeft,
    setOriginalTime,
    calculateBackgroundTime,
    startTimer,
    stopTimer,
    fullStopTimer
  } = useTimerStore();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [ringingTimer, setRingingTimer] = React.useState(null);

  // 초기 설정 로드 및 백그라운드 시간 계산
  useEffect(() => {
    const settings = getTimerSettings();
    
    // 백그라운드에서 실행된 시간 계산
    const isCompleted = calculateBackgroundTime();
    
    if (isCompleted) {
      // 타이머가 백그라운드에서 완료된 경우
      setRingingTimer({
        name: '타이머',
        sound_id: settings.sound_id,
        volume: settings.volume
      });
      triggerAlarmWindow();
      sendNotification('타이머 완료!', '설정한 시간이 완료되었습니다.');
    }
    
    // 타이머가 실행중이 아니고 timeLeft가 설정값과 다르면 초기화
    if (!isRunning && timeLeft !== settings.duration) {
      setTimeLeft(settings.duration);
      setOriginalTime(settings.duration);
    }
  }, []);

  // 타이머 실행 로직 (1초마다 업데이트)
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        const isCompleted = calculateBackgroundTime();
        
        if (isCompleted) {
          // 타이머 완료 처리
          setRingingTimer({
            name: '타이머',
            sound_id: timerSettings.sound_id,
            volume: timerSettings.volume
          });
          triggerAlarmWindow();
          sendNotification('타이머 완료!', '설정한 시간이 완료되었습니다.');
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime, calculateBackgroundTime, timerSettings, triggerAlarmWindow, sendNotification]);

  const handlePlay = () => {
    if (timeLeft > 0) {
      startTimer();
    }
  };

  const handlePause = () => {
    stopTimer();
  };

  const handleStop = () => {
    fullStopTimer();
  };

  const handleSettingsOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalSuccess = (settings) => {
    saveTimerSettings(settings);
    setTimeLeft(settings.duration);
    setOriginalTime(settings.duration);
    stopTimer(); // 설정 변경시 타이머 정지
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRingModalClose = () => {
    stopSound();
    setRingingTimer(null);
  };

  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <TimeDisplay 
          time={formatTime(timeLeft)} 
          size="xl"
          className={timeLeft <= 10000 && isRunning ? 'text-red-500 animate-pulse' : ''}
        />
        
        <div className="flex gap-4 justify-center">
          <PrimaryButton
            onClick={handlePlay}
            disabled={timeLeft === 0 || isRunning}
            icon={<HiPlay className="w-6 h-6" />}
            color="green"
          >
            시작
          </PrimaryButton>
          
          <PrimaryButton
            onClick={handlePause}
            disabled={!isRunning}
            icon={<HiPause className="w-6 h-6" />}
            color="red"
          >
            일시정지
          </PrimaryButton>
          
          <PrimaryButton
            onClick={handleStop}
            disabled={timeLeft === originalTime}
            icon={<HiStop className="w-6 h-6" />}
            color="gray"
          >
            정지
          </PrimaryButton>
        </div>

        <div className="flex justify-center">
          <PrimaryButton
            onClick={handleSettingsOpen}
            icon={<HiCog className="w-6 h-6" />}
            color="indigo"
            className="flex items-center justify-center px-12"
          >
            시간 설정
          </PrimaryButton>
        </div>
      </div>

      <TimerEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        initialTimer={null}
      />

      <RingModal
        isOpen={!!ringingTimer}
        onClose={handleRingModalClose}
        alarm={ringingTimer}
      />
    </PageContainer>
  );
};

export default Timer;