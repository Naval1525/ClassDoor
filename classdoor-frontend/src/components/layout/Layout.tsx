import { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import LeftSideBar from "../shared/LeftsideBar";
import RightSideBar from "../shared/RightsideBar";
import { Home } from "@/pages/Home";
import { Trending } from "@/pages/Trending";
import { Activity } from "@/pages/Activity";
import { CreatePost } from "@/pages/CreatePost";
import { Mypost } from "@/pages/Mypost";

type PageType = "home" | "trending" | "activity" | "createpost" | "mypost";

const Layout = () => {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

 
  const handlePageChange = (page: PageType) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize(); // Call once on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render the appropriate component based on activePage
  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "trending":
        return <Trending />;
      case "activity":
        return <Activity />;
      case "createpost":
        return <CreatePost />;
      case "mypost":
        return <Mypost />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex flex-1 relative">
        {/* Left sidebar - desktop permanent, mobile conditional */}
        {(!isMobile || isMobileMenuOpen) && (
          <LeftSideBar
            activePage={activePage}
            setActivePage={handlePageChange}
          />
        )}

        {/* Mobile menu backdrop */}
        {isMobile && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main content area - adjusted margins to account for fixed sidebar */}
        <main
          className={`flex-1 py-6 overflow-y-auto transition-all duration-300 ${
            isMobile ? "px-4" : "px-8"
          }`}
        >
          <div className="max-w-3xl mx-auto mt-16">{renderContent()}</div>
        </main>

        {/* Right sidebar - fixed on desktop */}
        <aside className="hidden xl:block w-80 shrink-0 fixed right-0 top-16 bottom-0 overflow-y-auto border-l border-gray-800/50 bg-gray-900/40 backdrop-blur-sm">
          <RightSideBar />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
