import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useThemeStore } from "./Shared/Stores/ThemeStore";
import { useEffect } from "react";

import Sidebar from "./Layout/Sidebar/Sidebar";
import Alarm from "./Features/Alarm/Pages/Alarm";
import Timer from "./Features/Timer/Pages/Timer";
import Stopwatch from "./Features/Stopwatch/Pages/Stopwatch";
import Settings from "./Features/Settings/Pages/Settings";

function Layout() {
  const { isDark, isAlwaysOnTop } = useThemeStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window.electron?.setGeneralAlwaysOnTop === "function") {
          window.electron.setGeneralAlwaysOnTop(isAlwaysOnTop);
        }
      } catch (error) {
        console.error("App: Error syncing always on top setting:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAlwaysOnTop]);

  return (
    <div
      className={`flex-1 flex overflow-hidden ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-blue-500"
      }`}
    >
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Alarm /> },
      { path: "/timer", element: <Timer /> },
      { path: "/stopwatch", element: <Stopwatch /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  useEffect(() => {
    // 브라우저 알림 권한 요청
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return <RouterProvider router={router} />;
}
