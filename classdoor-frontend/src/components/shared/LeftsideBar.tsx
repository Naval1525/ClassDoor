import { FC } from "react";
import {
  Home as HomeIcon,
  TrendingUp,
  Activity as ActivityIcon,
  PenTool,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RefreshButton from "./RefreshButton";

type PageType = "home" | "trending" | "activity" | "createpost" | "mypost";

interface LeftSideBarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

const LeftSideBar: FC<LeftSideBarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: "home" as PageType, label: "Home", icon: <HomeIcon size={20} /> },
    {
      id: "trending" as PageType,
      label: "Trending",
      icon: <TrendingUp size={20} />,
    },
    {
      id: "activity" as PageType,
      label: "Activity",
      icon: <ActivityIcon size={20} />,
    },
    {
      id: "createpost" as PageType,
      label: "Create Post",
      icon: <PenTool size={20} />,
    },
    { id: "mypost" as PageType, label: "My Post", icon: <User size={20} /> },
  ];

  return (
    <div className="flex flex-col justify-between h-full bg-black border-r border-gray-800 py-6">
      <div className="flex flex-col space-y-2 px-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activePage === item.id ? "default" : "ghost"}
            className={`justify-start ${
              activePage === item.id
                ? "bg-white text-black hover:bg-gray-200"
                : "text-white hover:text-black hover:bg-gray-200"
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
      <div className="px-4 mt-auto">
        <RefreshButton/>
      </div>
    </div>
  );
};

export default LeftSideBar;
