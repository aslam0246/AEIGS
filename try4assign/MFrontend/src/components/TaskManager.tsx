import React, { useEffect, useState } from "react";
import { FaFlag, FaClock, FaPlus, FaUser, FaCalendarAlt } from "react-icons/fa";
import { realtimeDatabase } from "../firebaseConfig.ts";
import { ref, onValue } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "./TaskForm";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: string;
  deadline: string;
  progress: number;
  status: string;
  timestamp: string;
  assignedBy: string;
  assignedByName: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!user) return;

    const tasksRef = ref(realtimeDatabase, 'tasks');
    let unsubscribe: () => void;

    try {
      unsubscribe = onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tasksArray = Object.entries(data).map(([id, task]: [string, any]) => ({
            id,
            ...task,
          }));
          setTasks(tasksArray.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
        } else {
          setTasks([]);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks. Please try again.');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error setting up tasks listener:', error);
      setError('Failed to connect to the database. Please try again.');
      setIsLoading(false);
    }

    return () => {
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          console.error('Error cleaning up tasks listener:', error);
        }
      }
    };
  }, [user]);

  const handleTaskSubmit = (task: Omit<Task, 'id'>) => {
    setIsFormOpen(false);
  };

  if (authLoading || isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Task Management</h2>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-all duration-200"
          onClick={() => setIsFormOpen(true)}
        >
          <FaPlus className="mr-2" />
          Assign New Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No tasks assigned yet. Click the button above to assign a new task.
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>Assigned to: {task.assignedTo}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-600 font-medium">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${
                      task.progress >= 100 ? 'bg-green-500' :
                      task.progress >= 75 ? 'bg-blue-500' :
                      task.progress >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleTaskSubmit}
        />
      )}
    </div>
  );
}
