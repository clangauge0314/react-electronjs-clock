import React, { useRef, useEffect } from 'react';
import { useThemeStore } from '../../Stores/ThemeStore';

const RecordList = ({ records, formatFunction, className = '' }) => {
  const { isDark } = useThemeStore();
  const recordsContainerRef = useRef(null);

  useEffect(() => {
    if (recordsContainerRef.current) {
      recordsContainerRef.current.scrollTo({
        top: recordsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [records]);

  if (records.length === 0) return null;

  return (
    <div className={`
      w-64 p-4 rounded-lg
      ${isDark ? "bg-gray-800" : "bg-gray-100"}
      ${className}
    `}>
      <h3 className="text-lg font-semibold mb-2">기록</h3>
      <div
        ref={recordsContainerRef}
        className="space-y-2 max-h-[150px] overflow-y-auto"
      >
        {records.map((record, index) => (
          <div key={index} className="text-sm">
            {index + 1}. {formatFunction(record)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordList;