import { FaTrophy, FaMedal, FaRegSmile } from 'react-icons/fa';

export default function GamificationPanel() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
          <div className="flex items-center">
            <FaTrophy className="text-yellow-600 mr-3" />
            <div>
              <p className="font-medium">Productivity Master</p>
              <p className="text-sm text-gray-600">5-day streak</p>
            </div>
          </div>
          <span className="text-yellow-600">+50 pts</span>
        </div>

        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
          <div className="flex items-center">
            <FaMedal className="text-blue-600 mr-3" />
            <div>
              <p className="font-medium">Mindfulness Expert</p>
              <p className="text-sm text-gray-600">10 sessions completed</p>
            </div>
          </div>
          <span className="text-blue-600">+30 pts</span>
        </div>

        <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
          <div className="flex items-center">
            <FaRegSmile className="text-green-600 mr-3" />
            <div>
              <p className="font-medium">Well-being Champion</p>
              <p className="text-sm text-gray-600">Perfect week</p>
            </div>
          </div>
          <span className="text-green-600">+100 pts</span>
        </div>
      </div>
    </div>
  );
}