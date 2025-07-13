import React, { useState } from "react";
import { realtimeDatabase } from "../firebaseConfig.ts";
import { ref, push } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

interface MeetingFormProps {
  onClose: () => void;
  onSubmit: (meeting: Omit<Meeting, 'id'>) => void;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  assignedTo: string[];
  assignedBy: string;
  assignedByName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("30");
  const [participants, setParticipants] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to schedule a meeting");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const meetingRef = ref(realtimeDatabase, 'meetings');
      const meetingData = {
        title,
        description,
        date,
        time,
        duration,
        participants: participants.split(',').map(p => p.trim()).filter(p => p.length > 0),
        assignedTo: participants.split(',').map(p => p.trim()).filter(p => p.length > 0),
        assignedBy: user.uid,
        assignedByName: "Manager",
        status: 'pending' as const,
        createdBy: user.uid,
        createdByName: "Manager",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await push(meetingRef, meetingData);
      onSubmit(meetingData);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      setError("Failed to schedule meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Schedule New Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To (comma-separated email addresses)
            </label>
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="email1@example.com, email2@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter email addresses separated by commas
            </p>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingForm; 