import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/auth.api";

const RefreshButton = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshToken } = useAuth();

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshToken();

    // Simulate refresh process
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        flex flex-row items-center justify-center  gap-2
        px-4 py-2 rounded-md text-sm font-medium
        h-10 w-auto border transition-colors duration-200
        ${
          isRefreshing
            ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-black text-white border-gray-200 hover:bg-white hover:text-black"
        }
      `}
    >
      <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
      <span>{isRefreshing ? "Refreshing" : "Refresh"}</span>
    </button>
  );
};

export default RefreshButton;
