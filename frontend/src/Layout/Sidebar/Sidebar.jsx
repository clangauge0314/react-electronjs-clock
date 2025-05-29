import { Link, useLocation } from "react-router-dom";
import { HiCog, HiMoon, HiSun } from "react-icons/hi";
import { MdOutlineTimer } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { useThemeStore } from "../../Shared/Stores/ThemeStore";

export default function Sidebar() {
  const { isDark, setIsDark } = useThemeStore();
  const location = useLocation();

  const menuItems = [
    { name: "Alarm", icon: <HiBellAlert className="w-8 h-8" />, path: "/" },
    { name: "Timer", icon: <FaHourglassHalf className="w-8 h-8" />, path: "/timer" },
    { name: "Stopwatch", icon: <MdOutlineTimer className="w-8 h-8" />, path: "/stopwatch" },
  ];

  const commonLinkStyles = `
    flex items-center py-2.5 rounded-lg transition-all duration-300 ease-in-out hover:scale-105
    w-16 group-hover:w-full mx-auto group-hover:mx-0 
    justify-center group-hover:justify-start group-hover:px-3
    ${isDark ? 'text-gray-300' : 'text-gray-600'}
    relative
  `;

  const logoStyles = `
    flex items-center py-2.5 rounded-lg transition-all duration-300 ease-in-out
    w-16 group-hover:w-full mx-auto group-hover:mx-0 
    justify-center group-hover:justify-start group-hover:px-3
    ${isDark ? 'text-gray-300' : 'text-gray-600'}
    relative
  `;

  const commonTextStyles = `
    ml-1 text-base whitespace-nowrap opacity-0 translate-x-[-10px]
    transition-all duration-300 ease-in-out absolute left-[52px]
    group-hover:opacity-100 group-hover:translate-x-0
  `;

  return (
    <div className="relative group">
      <div
        className={`h-screen w-20 group-hover:w-64
          ${isDark ? 'border-gray-700' : 'border-gray-200'} 
          transition-all duration-300 ease-in-out border-r shadow-lg
        `}
      >
        <div className={`p-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={logoStyles}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl">🕒</span>
            </div>
            <span className="ml-5 text-xl whitespace-nowrap opacity-0 translate-x-[-10px] transition-all duration-300 ease-in-out absolute left-[52px] group-hover:opacity-100 group-hover:translate-x-0">
              GoodClock
            </span>
          </div>
        </div>

        <nav className="mt-4 flex flex-col h-[calc(100vh-100px)] justify-between">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${commonLinkStyles} ${
                    isActive 
                      ? `after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                         after:bg-blue-500 after:transition-all after:duration-300 after:ease-in-out
                         after:origin-left after:scale-x-100` 
                      : ''
                  }`}
                >
                  {item.icon}
                  <span className={commonTextStyles}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 px-2 mb-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={commonLinkStyles}
            >
              {isDark ? <HiMoon className="w-8 h-8" /> : <HiSun className="w-8 h-8" />}
              <span className={commonTextStyles}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </button>

            <Link
              to="/settings"
              className={`${commonLinkStyles} ${
                location.pathname === '/settings' 
                  ? `after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                     after:bg-blue-500 after:transition-all after:duration-300 after:ease-in-out
                     after:origin-left after:scale-x-100` 
                  : ''
              }`}
            >
              <HiCog className="w-8 h-8" />
              <span className={commonTextStyles}>
                Settings
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
