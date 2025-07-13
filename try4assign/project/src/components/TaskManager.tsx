import { FaFlag, FaClock } from 'react-icons/fa';

const tasks = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    priority: 'High',
    deadline: '2024-02-10',
    estimatedTime: '2 hours',
    progress: 75,
  },
  {
    id: 2,
    title: 'Team Meeting Notes',
    priority: 'Medium',
    deadline: '2024-02-09',
    estimatedTime: '1 hour',
    progress: 30,
  },
];

export default function TaskManager() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Task Management</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{task.title}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                <FaFlag className="inline mr-1" />
                {task.priority}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <FaClock className="mr-1" />
              <span>{task.estimatedTime}</span>
              <span className="mx-2">•</span>
              <span>Due: {task.deadline}</span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-primary">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-primary">
                    {task.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-light/30">
                <div
                  style={{ width: `${task.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}