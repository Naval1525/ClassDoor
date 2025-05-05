import { useState } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  Smile,
  PenLine,
} from "lucide-react";

export const Home = () => {
  // Sample post data
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/api/placeholder/40/40",
      },
      college: "Bennett University",
      time: "2h ago",
      content:
        "Just finished my research paper on AI applications in education. Really excited about the potential impacts!",
      likes: 42,
      comments: 8,
      shares: 5,
      saved: false,
      liked: false,
    },
    {
      id: 2,
      user: {
        name: "Samantha Lee",
        username: "samlee",
        avatar: "/api/placeholder/40/40",
      },
      college: "XYZ College",
      time: "4h ago",
      content:
        "Our team won the inter-college hackathon! 48 hours of coding paid off. Check out our project on GitHub - we built a sustainable living app that tracks carbon footprint.",
      likes: 86,
      comments: 15,
      shares: 12,
      saved: true,
      liked: true,
    },
    {
      id: 3,
      user: {
        name: "Michael Chen",
        username: "mchen",
        avatar: "/api/placeholder/40/40",
      },
      college: "ABC University",
      time: "Yesterday",
      content:
        "Looking for study partners for the upcoming calculus final. Anyone interested in forming a study group at the library?",
      likes: 24,
      comments: 19,
      shares: 2,
      saved: false,
      liked: false,
    },
  ]);

  // Toggle like post
  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newLikedStatus = !post.liked;
          return {
            ...post,
            liked: newLikedStatus,
            likes: newLikedStatus ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  // Toggle save post
  const toggleSave = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            saved: !post.saved,
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Create Post Card */}
      <div className="rounded-xl p-4 shadow-lg border border-white/50 mb-6 hover:border-white transition-colors">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Share something with the campus..."
              className="w-full bg-gray-800/70 border border-gray-700/70 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
          <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
            <Image size={18} />
            <span>Photo</span>
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className=" rounded-xl p-5 shadow-lg border border-white/20 hover:border-white transition-all duration-300"
          >
            {/* Post Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-white">{post.user.name}</h3>
                    <span className="text-gray-400 text-sm ml-2">
                      @{post.user.username}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="after:content-['•'] after:mx-1.5">
                      {post.college}
                    </span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800/80 transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-200 whitespace-pre-line leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Post Actions */}
            <div className="flex justify-between border-t border-gray-800/70 pt-3 text-gray-400">
              <button
                className={`flex items-center space-x-1.5 ${
                  post.liked ? "text-blue-400" : "hover:text-blue-400"
                } transition-colors`}
                onClick={() => toggleLike(post.id)}
                aria-label={post.liked ? "Unlike" : "Like"}
              >
                <ThumbsUp
                  size={18}
                  fill={post.liked ? "currentColor" : "none"}
                />
                <span className="text-sm">{post.likes}</span>
              </button>

              <button
                className="flex items-center space-x-1.5 hover:text-green-400 transition-colors"
                aria-label="Comment"
              >
                <MessageSquare size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>

              <button
                className="flex items-center space-x-1.5 hover:text-purple-400 transition-colors"
                aria-label="Share"
              >
                <Share2 size={18} />
                <span className="text-sm">{post.shares}</span>
              </button>

              <button
                className={`flex items-center space-x-1.5 ${
                  post.saved ? "text-yellow-400" : "hover:text-yellow-400"
                } transition-colors`}
                onClick={() => toggleSave(post.id)}
                aria-label={post.saved ? "Unsave" : "Save"}
              >
                <Bookmark
                  size={18}
                  fill={post.saved ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
