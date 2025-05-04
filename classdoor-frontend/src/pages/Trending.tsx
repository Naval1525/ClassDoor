import { TrendingUp, Users, Hash, ArrowUp } from "lucide-react";

export const Trending = () => {
  // Sample trending data
  const trendingTopics = [
    {
      id: 1,
      category: "Technology",
      topic: "AI Research",
      posts: 428,
      trending: "+42%"
    },
    {
      id: 2,
      category: "Events",
      topic: "Spring Festival",
      posts: 356,
      trending: "+28%"
    },
    {
      id: 3,
      category: "Academic",
      topic: "Midterm Results",
      posts: 301,
      trending: "+15%"
    }
  ];

  const trendingCommunities = [
    {
      id: 1,
      name: "Computer Science Club",
      members: 2456,
      growth: "+124 this week"
    },
    {
      id: 2,
      name: "Entrepreneurship Hub",
      members: 1879,
      growth: "+98 this week"
    },
    {
      id: 3,
      name: "Photography Society",
      members: 1243,
      growth: "+76 this week"
    }
  ];

  const trendingHashtags = [
    { id: 1, tag: "campuslife", posts: 2345 },
    { id: 2, tag: "finalsweek", posts: 1980 },
    { id: 3, tag: "internshipseason", posts: 1764 },
    { id: 4, tag: "researchpaper", posts: 1532 },
    { id: 5, tag: "hackathon2025", posts: 1289 }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white flex items-center">
        <TrendingUp className="mr-2" /> Trending Now
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <div className="bg-gray-900 rounded-xl p-5 shadow-md border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Hot Topics</h2>
          <div className="space-y-4">
            {trendingTopics.map(topic => (
              <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <div>
                  <span className="text-sm text-gray-400">{topic.category}</span>
                  <h3 className="font-medium text-white">{topic.topic}</h3>
                  <span className="text-xs text-gray-400">{topic.posts} posts</span>
                </div>
                <div className="text-green-400 flex items-center">
                  <ArrowUp size={16} className="mr-1" />
                  {topic.trending}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Communities */}
        <div className="bg-gray-900 rounded-xl p-5 shadow-md border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Users size={20} className="mr-2" /> Growing Communities
          </h2>
          <div className="space-y-4">
            {trendingCommunities.map(community => (
              <div key={community.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden mr-3">
                    <img src={`/api/placeholder/40/40?text=${community.id}`} alt={community.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{community.name}</h3>
                    <span className="text-xs text-gray-400">{community.members.toLocaleString()} members</span>
                  </div>
                </div>
                <div className="text-green-400 text-xs">
                  {community.growth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="mt-6 bg-gray-900 rounded-xl p-5 shadow-md border border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Hash size={20} className="mr-2" /> Trending Hashtags
        </h2>
        <div className="flex flex-wrap gap-3">
          {trendingHashtags.map(hashtag => (
            <div 
              key={hashtag.id} 
              className="bg-gray-800 text-white rounded-full px-4 py-2 text-sm flex items-center hover:bg-gray-750 transition-colors cursor-pointer"
            >
              <span className="mr-2">#{hashtag.tag}</span>
              <span className="text-xs text-gray-400">{hashtag.posts.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;