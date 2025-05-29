import React, { useState, useEffect } from 'react';
import { HiPlus, HiClock } from "react-icons/hi";
import { PageContainer } from '../../../Shared/Components/Layout';
import { TimeDisplay, DateDisplay } from '../../../Shared/Components/Display';
import { PrimaryButton } from '../../../Shared/Components/Buttons';
import { useTimeFormat } from '../../../Shared/Hooks';
import AlarmCreateModal from '../Components/AlarmCreateModal';
import AlarmHistoryModal from '../Components/AlarmHistoryModal';
import RingModal from '../../../Components/Modals/RingModal';
import { useAlarmStore } from '../../../Shared/Stores/AlarmStore';

const Alarm = () => {
  const { formatTime } = useTimeFormat();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [ringingAlarm, setRingingAlarm] = useState(null);
  const { checkAlarms } = useAlarmStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1); // 10ms마다 업데이트해서 밀리초 표시

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const triggered = checkAlarms();
      if (triggered) {
        setRingingAlarm(triggered);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkAlarms]);

  const handleRingModalClose = () => {
    setRingingAlarm(null);
  };

  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <DateDisplay date={currentTime} />
        <TimeDisplay 
          time={formatTime(currentTime, true)} 
          size="xl"
          showMilliseconds={true}
        />
        
        <div className="flex gap-4 justify-center">
          <PrimaryButton
            onClick={() => setIsCreateModalOpen(true)}
            icon={<HiPlus className="w-6 h-6" />}
            size="lg"
            color="indigo"
          >
            알람 추가
          </PrimaryButton>
          
          <PrimaryButton
            onClick={() => setIsHistoryModalOpen(true)}
            icon={<HiClock className="w-6 h-6" />}
            size="lg"
            color="gray"
          >
            알람 목록
          </PrimaryButton>
        </div>
      </div>

      <AlarmCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <AlarmHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      <RingModal
        isOpen={!!ringingAlarm}
        onClose={handleRingModalClose}
        alarm={ringingAlarm}
      />
    </PageContainer>
  );
};

export default Alarm;