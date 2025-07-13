import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useState } from 'react';

export default function TrendingBlogs() {
  const [savedArticles, setSavedArticles] = useState<number[]>([]);

  const articles = [
    {
      id: 1,
      title: 'Maximizing Productivity While Working Remotely',
      category: 'Productivity',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Mindfulness Techniques for Better Focus',
      category: 'Wellness',
      readTime: '3 min read',
    },
  ];

  const toggleSave = (id: number) => {
    setSavedArticles(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Trending Articles</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{article.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span className="bg-primary-light/20 text-primary px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <button 
                onClick={() => toggleSave(article.id)}
                className="text-gray-400 hover:text-primary"
              >
                {savedArticles.includes(article.id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}