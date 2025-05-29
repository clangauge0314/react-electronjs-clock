import React from 'react';
import { HiMoon, HiSun } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { MdPushPin } from "react-icons/md";
import { PageContainer } from '../../../Shared/Components/Layout';
import { PrimaryButton } from '../../../Shared/Components/Buttons';
import { useThemeStore } from "../../../Shared/Stores/ThemeStore";

const Settings = () => {
  const { 
    isDark, 
    setIsDark, 
    is24Hour, 
    setIs24Hour,
    isAlwaysOnTop,
    setIsAlwaysOnTop 
  } = useThemeStore();

  return (
    <PageContainer centered={false} className="overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">설정</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 테마 설정 */}
        <div className={`p-6 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h2 className="text-xl font-semibold mb-4">테마 설정</h2>
          <div className="flex items-center justify-between">
            <span>다크 모드</span>
            <PrimaryButton
              onClick={() => setIsDark(!isDark)}
              color="indigo"
              size="sm"
              icon={isDark ? <HiMoon className="w-6 h-6" /> : <HiSun className="w-6 h-6" />}
            />
          </div>
        </div>

        {/* 시간 표시 형식 */}
        <div className={`p-6 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h2 className="text-xl font-semibold mb-4">시간 표시 형식</h2>
          <div className="flex items-center justify-between">
            <span>24시간제</span>
            <PrimaryButton
              onClick={() => setIs24Hour(!is24Hour)}
              color={is24Hour ? "purple" : "gray"}
              size="sm"
              icon={<BiTime className="w-6 h-6" />}
            />
          </div>
          <p className={`mt-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            현재 설정: {is24Hour ? '24시간제' : '오전/오후'}
          </p>
        </div>

        {/* 창 고정 설정 */}
        <div className={`p-6 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <h2 className="text-xl font-semibold mb-4">창 설정</h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span>항상 최상단에 고정</span>
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                다른 앱을 사용해도 창이 맨 위에 표시됩니다
              </span>
            </div>
            <PrimaryButton
              onClick={() => setIsAlwaysOnTop(!isAlwaysOnTop)}
              color={isAlwaysOnTop ? "green" : "gray"}
              size="sm"
              icon={<MdPushPin className={`w-6 h-6 transition-transform duration-200 ${
                isAlwaysOnTop ? 'rotate-45' : ''
              }`} />}
            />
          </div>
          <p className={`mt-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            현재 설정: {isAlwaysOnTop ? '항상 최상단 고정됨' : '일반 모드'}
          </p>
          {isAlwaysOnTop && (
            <div className={`mt-3 p-3 rounded-lg ${
              isDark ? 'bg-green-900/20 border border-green-700' : 'bg-green-100 border border-green-300'
            }`}>
              <p className={`text-sm ${
                isDark ? 'text-green-300' : 'text-green-700'
              }`}>
                ⚠️ 알람/타이머 기능과는 별개로 작동합니다. 언제든지 해제할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        <div className="pb-8"></div>
      </div>
    </PageContainer>
  );
}

export default Settings;