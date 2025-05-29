import React, { useEffect } from 'react';
import { useThemeStore } from '../Stores/ThemeStore';

export const ModalBackdrop = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`
        fixed inset-0 bg-black transition-opacity duration-300
        ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    />
  );
};

// 모달 컨테이너 컴포넌트
export const ModalContainer = ({ isOpen, children, maxWidth = '500px' }) => {
  const { isDark } = useThemeStore();
  
  return (
    <div className={`
      fixed inset-0 z-10 overflow-y-auto transition-opacity duration-300
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`
          relative max-w-${maxWidth} w-full mx-auto rounded-lg shadow-xl
          ${isDark ? 'bg-gray-800' : 'bg-white'}
          p-6 transform transition-all duration-300
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}>
          {children}
        </div>
      </div>
    </div>
  );
};

// 닫기 버튼 컴포넌트
export const CloseButton = ({ onClose }) => {
  const { isDark } = useThemeStore();
  
  return (
    <button
      onClick={onClose}
      className={`p-1 rounded-full hover:bg-opacity-20 ${isDark ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}
    >
      <svg
        className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

// 모달 헤더 컴포넌트
export const ModalHeader = ({ title, onClose }) => {
  const { isDark } = useThemeStore();
  
  return (
    <div className="flex justify-between items-start mb-4">
      <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <CloseButton onClose={onClose} />
    </div>
  );
};

// 모달 푸터 컴포넌트
export const ModalFooter = ({ onCancel, onSubmit, submitText = '확인', isLoading = false }) => {
  const { isDark } = useThemeStore();
  
  return (
    <div className="flex justify-end gap-3 mt-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg ${
          isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        취소
      </button>
      <button
        type="submit"
        disabled={isLoading}
        onClick={onSubmit}
        className={`px-4 py-2 rounded-lg bg-blue-500 text-white`}
      >
        {isLoading ? '저장 중...' : submitText}
      </button>
    </div>
  );
};

// 볼륨 아이콘
export const VolumeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 8v8l-4-4H4V12h4l4-4z" />
  </svg>
);

// 음소거 아이콘
export const MuteIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

// 볼륨 컨트롤 컴포넌트
export const VolumeControl = ({ volume, onVolumeChange, isMuted, onMuteToggle }) => {
  const { isDark } = useThemeStore();
  
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className={`
          flex-1 h-2 rounded-lg appearance-none cursor-pointer
          ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:cursor-pointer
        `}
      />
      <button
        type="button"
        onClick={onMuteToggle}
        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </button>
    </div>
  );
};

// 오디오 미리듣기 버튼
export const SoundPreviewButton = ({ isPlaying, onTogglePreview, isDark }) => (
  <button
    type="button"
    onClick={onTogglePreview}
    className={`px-4 rounded-lg ${
      isDark 
        ? isPlaying 
          ? 'bg-gray-600 text-gray-200' 
          : 'bg-blue-500 text-white'
        : isPlaying 
          ? 'bg-red-500 text-white' 
          : 'bg-blue-500 text-white'
    }`}
  >
    {isPlaying ? '중지' : '미리듣기'}
  </button>
);

// ESC 키 이벤트 처리 훅
export const useEscapeKey = (isOpen, onClose) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
};

// 모달 정리 효과 훅
export const useModalCleanup = (isOpen, cleanup) => {
  useEffect(() => {
    // 컴포넌트가 언마운트될 때만 cleanup 호출
    return () => {
      cleanup();
    };
  }, []); // 의존성 배열에서 isOpen 제거
}; 