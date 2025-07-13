import { useState } from "react";
import { db } from "../firebaseConfig";
import { ref, update } from "firebase/database";

const TaskProgress = ({ taskId, currentProgress }: { taskId: string; currentProgress: number }) => {
  const [progress, setProgress] = useState(currentProgress);

  const handleUpdate = async () => {
    try {
      await update(ref(db, `tasks/${taskId}`), {
        progress,
        status: progress === 100 ? "completed" : "in-progress",
      });
      alert("Progress updated!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <label className="block font-semibold">Progress: {progress}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full"
      />
      <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
        Update Progress
      </button>
    </div>
  );
};

export default TaskProgress;
