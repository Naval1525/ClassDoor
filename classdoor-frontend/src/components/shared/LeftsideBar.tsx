import { FC } from "react";
import {
  Home,
  TrendingUp,
  Activity,
  PenTool,
  User,
  RefreshCw,
  Settings,
  LogOut,
} from "lucide-react";

type PageType = "home" | "trending" | "activity" | "createpost" | "mypost";

interface LeftSideBarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

const LeftSideBar: FC<LeftSideBarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: "home" as PageType, label: "Home", icon: <Home size={24} /> },
    {
      id: "trending" as PageType,
      label: "Trending",
      icon: <TrendingUp size={24} />,
    },
    {
      id: "activity" as PageType,
      label: "Activity",
      icon: <Activity size={24} />,
      notification: 12,
    },
    {
      id: "createpost" as PageType,
      label: "Create",
      icon: <PenTool size={24} />,
    },
    { id: "mypost" as PageType, label: "Profile", icon: <User size={24} /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-full z-30 w-64 bg-black border-r border-gray-800/50 pt-16">
      <div className="flex flex-col h-full px-4 py-6">
        {/* Navigation Items */}
        <div className="flex-1">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  className={`
                    flex items-center w-full p-3 rounded-xl text-base font-medium
                    transition-all duration-300 relative
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                  onClick={() => setActivePage(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 w-1 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  )}

                  <span className={`mr-4 ${isActive ? "text-blue-400" : ""}`}>
                    {item.icon}
                  </span>

                  <span className="flex-1">{item.label}</span>

                  {/* Notification badge */}
                  {item.notification && (
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg shadow-blue-900/30">
                      {item.notification > 9 ? "9+" : item.notification}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 mt-6 border-t border-gray-800/50">
          <button
            className="flex items-center w-full p-3 rounded-xl text-base font-medium
                      text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            <RefreshCw
              size={24}
              className="mr-4 transition-transform hover:rotate-180 duration-500"
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
