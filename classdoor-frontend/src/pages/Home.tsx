import { ThumbsUp, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react";

export const Home = () => {
  // Sample post data
  const posts = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/api/placeholder/40/40"
      },
      college: "Bennett University",
      time: "2h ago",
      content: "Just finished my research paper on AI applications in education. Really excited about the potential impacts!",
      likes: 42,
      comments: 8,
      shares: 5,
      saved: false
    },
    {
      id: 2,
      user: {
        name: "Samantha Lee",
        username: "samlee",
        avatar: "/api/placeholder/40/40"
      },
      college: "XYZ College",
      time: "4h ago",
      content: "Our team won the inter-college hackathon! 48 hours of coding paid off. Check out our project on GitHub - we built a sustainable living app that tracks carbon footprint.",
      likes: 86,
      comments: 15,
      shares: 12,
      saved: true
    },
    {
      id: 3,
      user: {
        name: "Michael Chen",
        username: "mchen",
        avatar: "/api/placeholder/40/40"
      },
      college: "ABC University",
      time: "Yesterday",
      content: "Looking for study partners for the upcoming calculus final. Anyone interested in forming a study group at the library?",
      likes: 24,
      comments: 19,
      shares: 2,
      saved: false
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Create Post Card */}
      <div className="bg-gray-900 rounded-xl p-4 shadow-md border border-gray-800 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Share something with the campus..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-900 rounded-xl p-5 shadow-md border border-gray-800">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-white">{post.user.name}</h3>
                    <span className="text-gray-400 text-sm ml-2">@{post.user.username}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="after:content-['•'] after:mx-1">{post.college}</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
            
            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-200 whitespace-pre-line">{post.content}</p>
            </div>
            
            {/* Post Actions */}
            <div className="flex justify-between border-t border-gray-800 pt-3 text-gray-400">
              <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <ThumbsUp size={18} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                <MessageSquare size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
                <Share2 size={18} />
                <span className="text-sm">{post.shares}</span>
              </button>
              <button className={`flex items-center space-x-1 ${post.saved ? 'text-yellow-400' : 'hover:text-yellow-400'} transition-colors`}>
                <Bookmark size={18} fill={post.saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;