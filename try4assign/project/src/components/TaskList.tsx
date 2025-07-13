import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, push } from "firebase/database";
import TaskProgress from "./TaskProgress"; // Import TaskProgress

const TaskList = ({ employeeId }: { employeeId: string }) => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const taskRef = ref(db, "tasks");
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredTasks = Object.entries(data)
          .map(([id, task]: any) => ({ id, ...task }))
          .filter((task) => task.assignedTo === employeeId);
        setTasks(filteredTasks);
      }
    });
  }, [employeeId]);

  const addSampleTask = async () => {
    try {
      const taskRef = ref(db, "tasks");
      await push(taskRef, {
        title: "Sample Task",
        description: "This is a sample task to test the functionality",
        status: "in-progress",
        progress: 0,
        assignedTo: employeeId,
        createdAt: new Date().toISOString()
      });
      alert("Sample task added successfully!");
    } catch (error) {
      console.error("Error adding sample task:", error);
      alert("Error adding sample task");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">My Tasks</h2>
        <button 
          onClick={addSampleTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Sample Task
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned yet. Click the button above to add a sample task.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="p-3 border-b">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <TaskProgress taskId={task.id} currentProgress={task.progress} /> {/* Include TaskProgress */}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
