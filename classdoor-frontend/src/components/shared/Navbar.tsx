import { Search, Bell, MessageSquare, Menu } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Handle scroll to add effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-40
        bg-black/80 backdrop-blur-lg
        text-white border-b border-gray-800/50
        py-3 px-4 h-16
        transition-all duration-300
        ${scrolled ? "shadow-lg shadow-blue-900/10" : ""}
      `}
    >
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left section - Mobile menu button and logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-1.5 rounded-full hover:bg-gray-800 md:hidden transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="ml-2 font-bold text-xl tracking-tight">
              Campus
            </span>
          </div>
        </div>

        {/* Center - Search bar */}
        <div
          className={`
          ${searchFocused ? "w-full md:w-2/3" : "w-1/2 md:w-1/3"} 
          transition-all duration-300 ease-in-out
          absolute left-1/2 transform -translate-x-1/2
          hidden sm:block
        `}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`
                w-full bg-gray-900/60 border border-gray-700
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                rounded-full py-2 px-4 pl-10 text-sm transition-all duration-300
                focus:shadow-lg focus:shadow-blue-900/20
              `}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            className="sm:hidden p-2 rounded-full hover:bg-gray-800/60 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            className="relative p-2 rounded-full hover:bg-gray-800/60 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs flex items-center justify-center shadow-lg shadow-blue-900/30">
              3
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
