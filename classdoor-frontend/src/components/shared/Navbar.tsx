import { Search, Bell, MessageSquare } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-black text-white border-b border-gray-800 py-3 px-4">
      <div className="flex items-center justify-between">
        {/* Logo and name */}
        <div className="flex items-center">
          <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">C</div>
          <span className="ml-2 font-bold text-xl">Campus</span>
        </div>
        
        {/* Search bar */}
        <div className="relative max-w-xl w-full mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-black border border-white rounded-xl py-2 px-4 pl-10 text-sm   "
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        {/* Notification icons */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full text-xs flex items-center justify-center">3</span>
          </button>
          
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;