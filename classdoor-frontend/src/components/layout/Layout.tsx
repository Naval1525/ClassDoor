import { useState } from "react";
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

  // Function to handle page changes, will be passed to LeftSideBar
  const handlePageChange = (page: PageType) => {
    setActivePage(page);
  };

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
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 shrink-0">
          <LeftSideBar activePage={activePage} setActivePage={handlePageChange} />
        </aside>
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
        <aside className="w-72 shrink-0">
          <RightSideBar />
        </aside>
      </div>
    </div>
  );
};

export default Layout;