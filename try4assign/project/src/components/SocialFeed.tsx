import { FaComment, FaHeart, FaShare } from 'react-icons/fa';

export default function SocialFeed() {
  const posts = [
    {
      id: 1,
      author: 'Company News',
      content: 'Excited to announce our new wellness program starting next month! 🎉',
      likes: 24,
      comments: 5,
      time: '2h ago',
    },
    {
      id: 2,
      author: 'Team Building',
      content: 'Great team building session today! Thanks everyone for participating. 🤝',
      likes: 15,
      comments: 3,
      time: '4h ago',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Company Updates</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <div className="font-medium">{post.author}</div>
              <span className="mx-2">•</span>
              <div className="text-sm text-gray-600">{post.time}</div>
            </div>
            <p className="mb-3">{post.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-primary">
                <FaHeart />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-primary">
                <FaComment />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-primary">
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}