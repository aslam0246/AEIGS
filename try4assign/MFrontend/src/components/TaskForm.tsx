import React, { useState } from "react";
import { realtimeDatabase } from "../firebaseConfig.ts";
import { ref, push } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

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
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create a task");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const taskData = {
      title,
      description,
      assignedBy: user.uid,
      assignedByName: user.displayName || "Manager",
      assignedTo,
      priority,
      deadline,
      status: "pending",
      progress,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const tasksRef = ref(realtimeDatabase, "tasks");
      const newTaskRef = await push(tasksRef, taskData);
      
      // Add the task ID to the task data
      const taskWithId = {
        ...taskData,
        id: newTaskRef.key
      };

      onSubmit(taskWithId);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Assign Task</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-2 rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            className="w-full border p-2 rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Employee ID or Email"
            className="w-full border p-2 rounded mb-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
          <select
            className="w-full border p-2 rounded mb-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            className="w-full border p-2 rounded mb-2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
