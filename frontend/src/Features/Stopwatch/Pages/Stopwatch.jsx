import React, { useEffect, useRef } from "react";
import { HiPlay, HiPause, HiRefresh, HiClock } from "react-icons/hi";
import { PageContainer } from '../../../Shared/Components/Layout';
import { TimeDisplay, RecordList } from '../../../Shared/Components/Display';
import { PrimaryButton } from '../../../Shared/Components/Buttons';
import { useStopwatchStore } from '../../../Shared/Stores/StopwatchStore';

const Stopwatch = () => {
  const {
    time,
    isRunning,
    records,
    calculateBackgroundTime,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    addRecord,
    updateTime
  } = useStopwatchStore();

  const intervalRef = useRef(null);

  // 초기 백그라운드 시간 계산
  useEffect(() => {
    calculateBackgroundTime();
  }, [calculateBackgroundTime]);

  // 타이머 로직 (10ms마다 업데이트)
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        calculateBackgroundTime();
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, calculateBackgroundTime]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      stopStopwatch();
    } else {
      startStopwatch();
    }
  };

  const handleReset = () => {
    resetStopwatch();
  };

  const handleRecord = () => {
    addRecord();
  };

  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <TimeDisplay 
          time={formatTime(time)} 
          size="xl"
          showMilliseconds={true}
        />

        <div className="flex space-x-4 justify-center">
          <PrimaryButton
            onClick={handleStartStop}
            color={isRunning ? "red" : "green"}
            icon={isRunning ? <HiPause className="w-5 h-5" /> : <HiPlay className="w-5 h-5" />}
          >
            {isRunning ? "일시정지" : "시작"}
          </PrimaryButton>

          <PrimaryButton
            onClick={handleReset}
            color="gray"
            icon={<HiRefresh className="w-5 h-5" />}
          >
            초기화
          </PrimaryButton>

          {isRunning && (
            <PrimaryButton
              onClick={handleRecord}
              color="indigo"
              icon={<HiClock className="w-5 h-5" />}
            >
              기록
            </PrimaryButton>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <RecordList 
          records={records} 
          formatFunction={formatTime}
        />
      </div>
    </PageContainer>
  );
};

export default Stopwatch;