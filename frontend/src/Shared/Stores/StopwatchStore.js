import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStopwatchStore = create(
  persist(
    (set, get) => ({
      // 스톱워치 상태
      time: 0,
      isRunning: false,
      startTime: null, // 시작 시간 저장 (백그라운드 실행용)
      records: [],

      // 백그라운드에서 실행된 시간 계산
      calculateBackgroundTime: () => {
        const { isRunning, startTime, time } = get();
        if (!isRunning || !startTime) return;

        const now = Date.now();
        const elapsed = now - startTime;
        const newTime = time + elapsed;
        
        set({ 
          time: newTime,
          startTime: now // 새로운 시작 시간으로 업데이트
        });
      },

      // 스톱워치 시작
      startStopwatch: () => {
        const now = Date.now();
        set({ 
          isRunning: true,
          startTime: now
        });
      },

      // 스톱워치 정지
      stopStopwatch: () => {
        const { isRunning, startTime, time } = get();
        if (isRunning && startTime) {
          const now = Date.now();
          const elapsed = now - startTime;
          set({ 
            isRunning: false,
            startTime: null,
            time: time + elapsed
          });
        }
      },

      // 스톱워치 초기화
      resetStopwatch: () => {
        set({
          time: 0,
          isRunning: false,
          startTime: null,
          records: []
        });
      },

      // 기록 추가
      addRecord: () => {
        const { time, records } = get();
        set({
          records: [...records, time]
        });
      },

      // 시간 업데이트 (UI용)
      updateTime: (newTime) => set({ time: newTime }),
    }),
    {
      name: 'stopwatch-storage',
      partialize: (state) => ({ 
        time: state.time,
        isRunning: state.isRunning,
        startTime: state.startTime,
        records: state.records
      }),
    }
  )
);
