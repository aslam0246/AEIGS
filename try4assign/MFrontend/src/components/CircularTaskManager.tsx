import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaExclamationCircle, FaUserCircle } from 'react-icons/fa';

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  assignedTo: string;
  dueDate: string;
}

export default function TaskManager() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Project Deadline',
      priority: 'high',
      progress: 75,
      assignedTo: 'John Doe',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'Code Review',
      priority: 'medium',
      progress: 45,
      assignedTo: 'Jane Smith',
      dueDate: '2024-02-16'
    },
    {
      id: 3,
      title: 'Documentation',
      priority: 'low',
      progress: 90,
      assignedTo: 'Mike Johnson',
      dueDate: '2024-02-18'
    },
    {
      id: 4,
      title: 'Testing',
      priority: 'high',
      progress: 30,
      assignedTo: 'Sarah Wilson',
      dueDate: '2024-02-17'
    },
  ]);

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };

  const priorityLabels = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold flex items-center mb-6">
        <FaTasks className="mr-2 text-primary" />
        Tasks
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${priorityColors[task.priority]}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {task.priority === 'high' && (
                    <FaExclamationCircle className="text-red-500 mr-2" />
                  )}
                  <h3 className="font-semibold">{task.title}</h3>
                </div>
                <div className="flex items-center text-sm mb-3">
                  <span className="flex items-center">
                    <FaUserCircle className="mr-1" />
                    {task.assignedTo}
                  </span>
                  <span className="mx-2">•</span>
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{task.progress}% Complete</span>
                    <span className="font-medium">{priorityLabels[task.priority]}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
