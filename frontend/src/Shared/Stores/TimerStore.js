import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTimerStore = create(
  persist(
    (set, get) => ({
      // 타이머 설정
      timerSettings: {
        duration: 300000, // 5분 기본값 (밀리초)
        sound_id: 'music1',
        volume: 0.7,
        name: '타이머'
      },
      
      // 런타임 상태
      timeLeft: 300000,
      originalTime: 300000,
      isRunning: false,
      startTime: null, // 타이머 시작 시간 저장
      
      // 타이머 설정 저장
      saveTimerSettings: (settings) => {
        set({ 
          timerSettings: {
            ...settings,
            id: Date.now(),
            created_at: new Date().toISOString()
          }
        });
      },

      // 타이머 설정 불러오기
      getTimerSettings: () => {
        const { timerSettings } = get();
        return timerSettings;
      },

      // 런타임 상태 관리
      setTimeLeft: (time) => set({ timeLeft: time }),
      setOriginalTime: (time) => set({ originalTime: time }),
      setIsRunning: (running) => set({ isRunning: running }),

      // 백그라운드에서 실행된 시간 계산
      calculateBackgroundTime: () => {
        const { isRunning, startTime, originalTime } = get();
        if (!isRunning || !startTime) return;

        const now = Date.now();
        const elapsed = now - startTime;
        const newTimeLeft = Math.max(0, originalTime - elapsed);
        
        set({ timeLeft: newTimeLeft });
        
        // 시간이 다 되었으면 타이머 정지
        if (newTimeLeft <= 0) {
          set({ isRunning: false, startTime: null });
          return true; // 타이머 완료
        }
        return false;
      },

      // 타이머 초기화
      resetTimer: () => {
        const { timerSettings } = get();
        set({ 
          timeLeft: timerSettings.duration,
          originalTime: timerSettings.duration,
          isRunning: false,
          startTime: null
        });
      },

      // 타이머 시작
      startTimer: () => {
        const { timeLeft } = get();
        const now = Date.now();
        set({ 
          isRunning: true, 
          startTime: now,
          originalTime: timeLeft // 현재 남은 시간을 새로운 원래 시간으로 설정
        });
      },

      // 타이머 정지
      stopTimer: () => set({ isRunning: false, startTime: null }),
      
      // 타이머 완전 정지 (원래 시간으로 리셋)
      fullStopTimer: () => {
        const { timerSettings } = get();
        set({ 
          isRunning: false,
          startTime: null,
          timeLeft: timerSettings.duration,
          originalTime: timerSettings.duration
        });
      }
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({ 
        timerSettings: state.timerSettings,
        timeLeft: state.timeLeft,
        originalTime: state.originalTime,
        isRunning: state.isRunning,
        startTime: state.startTime
      }),
    }
  )
);
