import { FaBrain, FaClock, FaExchangeAlt } from 'react-icons/fa';

export default function ProductivityReport() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Productivity Insights</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <FaClock className="text-primary mr-3" />
            <div>
              <p className="text-sm text-gray-600">Peak Hours</p>
              <p className="font-medium">9 AM - 11 AM</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Today</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <FaExchangeAlt className="text-secondary mr-3" />
            <div>
              <p className="text-sm text-gray-600">Task Switching</p>
              <p className="font-medium">Efficient</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <FaBrain className="text-primary mr-3" />
            <p className="text-sm text-gray-600">Focus Level</p>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: '75%' }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>75% Focused</span>
              <span>Target: 80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}