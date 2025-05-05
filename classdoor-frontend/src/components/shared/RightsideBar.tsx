import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Users,
  Book,
  Plus,
  Sparkles,
} from "lucide-react";

interface College {
  id: number;
  name: string;
  avatar: string;
  expanded: boolean;
  members: number;
}

const RightSideBar: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([
    {
      id: 1,
      name: "Bennett University",
      avatar: "BU",
      expanded: false,
      members: 1245,
    },
    {
      id: 2,
      name: "XYZ College",
      avatar: "XY",
      expanded: false,
      members: 876,
    },
    {
      id: 3,
      name: "ABC University",
      avatar: "AU",
      expanded: false,
      members: 532,
    },
  ]);

  const toggleCollege = (id: number): void => {
    setColleges(
      colleges.map((college) =>
        college.id === id
          ? { ...college, expanded: !college.expanded }
          : college
      )
    );
  };

  return (
    <div className="w-full h-full bg-black/90 border-l border-gray-800/40 text-white overflow-hidden">
      <div className="py-4 px-6 border-b border-gray-800/70 backdrop-blur-sm sticky top-0 bg-black/90 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-blue-400" />
            <h1 className="text-xl font-bold">Discover</h1>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-800/60 transition-colors"
            aria-label="Search communities"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Communities/Colleges section */}
      <div className="py-4 px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 tracking-wide">
            YOUR COMMUNITIES
          </h2>
          <button
            className="p-1 rounded-full hover:bg-gray-800/60 transition-colors"
            aria-label="Add community"
          >
            <Plus size={16} className="text-blue-400" />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1 scrollbar-thin">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="rounded-xl bg-gray-900/40 border border-gray-800/40 overflow-hidden transition-all duration-300 hover:border-gray-700/60 hover:shadow-md hover:shadow-blue-900/10"
            >
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-800/40 transition-colors"
                onClick={() => toggleCollege(college.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-sm font-medium border border-gray-700/30">
                    {college.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="text-gray-200 font-medium">
                      x/{college.name.toLowerCase().replace(/\s+/g, "")}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {college.members.toLocaleString()} members
                    </div>
                  </div>
                </div>
                <div>
                  {college.expanded ? (
                    <ChevronDown size={18} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </div>
              </div>

              {college.expanded && (
                <div className="px-3 pb-3 space-y-2 animate-fadeIn">
                  <button className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-200 border border-gray-700/30">
                    <div className="flex items-center">
                      <Users size={16} className="text-blue-400 mr-2" />
                      <span>Professors</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-200 border border-gray-700/30">
                    <div className="flex items-center">
                      <Book size={16} className="text-purple-400 mr-2" />
                      <span>Courses</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="py-4 px-6 mt-2">
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide mb-4">
          TRENDING TOPICS
        </h2>

        <div className="space-y-2">
          {["AI Research", "Data Science", "Campus Events", "Student Life"].map(
            (topic, index) => (
              <button
                key={index}
                className="w-full text-left p-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800/50 transition-colors flex items-center justify-between"
              >
                <span>#{topic.toLowerCase().replace(/\s+/g, "")}</span>
                <span className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 100) + 20}
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
