import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RefreshButton = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
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
        flex flex-col items-center justify-center p-3 
        rounded-xl text-xs font-medium w-full h-16
        transition-all duration-300
        ${isRefreshing
          ? 'bg-gray-800/60 text-gray-500 cursor-not-allowed'
          : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
        }
      `}
    >
      <RefreshCw 
        size={18} 
        className={`
          mb-1
          ${isRefreshing ? 'animate-spin text-blue-400' : ''}
        `}
      />
      <span>{isRefreshing ? 'Refreshing' : 'Refresh'}</span>
    </button>
  );
};

export default RefreshButton;