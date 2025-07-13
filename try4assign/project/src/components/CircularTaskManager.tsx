import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaExclamationCircle, FaUserCircle } from 'react-icons/fa';
import { db } from '../firebaseConfig';
import { ref, onValue, update } from 'firebase/database';

type Priority = 'High' | 'Medium' | 'Low';

interface Task {
  id: string;
  title: string;
  priority: Priority;
  progress: number;
  assignedTo: string;
  deadline: string;
  description: string;
  status: string;
  assignedByName: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const taskRef = ref(db, "tasks");
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskList = Object.entries(data)
          .map(([id, task]: any) => ({ 
            id, 
            ...task,
            priority: (task.priority || 'Low') as Priority // Ensure priority is of correct type
          }));
        setTasks(taskList);
      }
    });
  }, []);

  const priorityColors: Record<Priority, string> = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200',
  };

  const priorityLabels: Record<Priority, string> = {
    High: 'High Priority',
    Medium: 'Medium Priority',
    Low: 'Low Priority',
  };

  const handleProgressUpdate = async (taskId: string, newProgress: number) => {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await update(taskRef, {
        progress: newProgress,
        status: newProgress === 100 ? 'completed' : 'in-progress',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Failed to update progress');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <FaTasks className="mr-2 text-primary" />
          Tasks
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${priorityColors[task.priority] || 'bg-gray-100 text-gray-800 border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {task.priority === 'High' && (
                      <FaExclamationCircle className="text-red-500 mr-2" />
                    )}
                    <h3 className="font-semibold">{task.title}</h3>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <span className="flex items-center">
                      <FaUserCircle className="mr-1" />
                      Assigned by: {task.assignedByName}
                    </span>
                    <span className="mx-2">•</span>
                    <span>Due: {task.deadline}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{task.progress}% Complete</span>
                      <span className="font-medium">{priorityLabels[task.priority] || 'No Priority'}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          task.priority === 'High' ? 'bg-red-500' :
                          task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) => handleProgressUpdate(task.id, Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">{task.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}