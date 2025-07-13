import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, update, push } from "firebase/database";
import { FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  participants: number;
  status: 'pending' | 'accepted' | 'rejected';
  assignedTo: string[];
  description: string;
  rejectionReason?: string;
  date: string;
  assignedBy: string;
  assignedByName: string;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  updatedAt: string;
}

const sampleMeetings = [
  {
    title: 'Team Standup',
    time: '10:00 AM',
    duration: '15 mins',
    participants: 8,
    status: 'pending',
    description: 'Daily team sync meeting to discuss progress and blockers',
  },
  {
    title: 'Project Planning',
    time: '2:00 PM',
    duration: '45 mins',
    participants: 5,
    status: 'pending',
    description: 'Planning session for the upcoming sprint',
  },
];

const MeetingList = ({ employeeId }: { employeeId: string }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  useEffect(() => {
    const meetingRef = ref(db, "meetings");
    
    // Listen for meetings
    const unsubscribe = onValue(meetingRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Raw Firebase data:", data); // Debug log
      
      if (data) {
        const meetingsArray = Object.entries(data)
          .map(([id, meeting]: any) => ({
            id,
            ...meeting
          }))
          .filter((meeting: Meeting) => {
            console.log("Checking meeting:", meeting); // Debug log
            console.log("Employee ID:", employeeId); // Debug log
            // Check if the employee's email is in the assignedTo array
            return meeting.assignedTo && meeting.assignedTo.includes(employeeId);
          });
        
        console.log("Filtered meetings:", meetingsArray); // Debug log
        setMeetings(meetingsArray);
      } else {
        console.log("No meetings data found"); // Debug log
        setMeetings([]);
      }
    });

    return () => unsubscribe();
  }, [employeeId]);

  const initializeSampleMeetings = async () => {
    try {
      const meetingRef = ref(db, "meetings");
      for (const meeting of sampleMeetings) {
        await push(meetingRef, {
          ...meeting,
          assignedTo: employeeId,
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error initializing sample meetings:", error);
    }
  };

  const handleMeetingResponse = async (meetingId: string, status: 'accepted' | 'rejected') => {
    try {
      const meetingRef = ref(db, `meetings/${meetingId}`);
      const updateData: any = {
        status,
        responseTime: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (status === 'rejected' && rejectionReason) {
        updateData.rejectionReason = rejectionReason;
      }

      await update(meetingRef, updateData);
      setRejectionReason("");
      setSelectedMeetingId(null);
      alert(`Meeting ${status} successfully!`);
    } catch (error) {
      console.error("Error updating meeting:", error);
      alert("Error updating meeting status");
    }
  };

  const handleRejectClick = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-primary" />
        My Meetings
      </h2>
      {meetings.length === 0 ? (
        <p className="text-gray-500">No meetings assigned yet.</p>
      ) : (
        meetings.map((meeting) => (
          <div key={meeting.id} className="p-4 border-b">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{meeting.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <FaClock className="mr-1" />
                  <span>{meeting.date} at {meeting.time}</span>
                  <span className="mx-2">•</span>
                  <span>{meeting.duration} minutes</span>
                  <span className="mx-2">•</span>
                  <FaUsers className="mr-1" />
                  <span>{meeting.participants} participants</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
                <div className="text-sm text-gray-500 mt-1 space-y-1">
                  <p>Assigned by: {meeting.assignedByName}</p>
                  {meeting.status === 'accepted' && (
                    <p className="text-green-600">
                      Accepted by: {meeting.assignedTo.find(email => email !== employeeId)}
                    </p>
                  )}
                  {meeting.status === 'rejected' && meeting.rejectionReason && (
                    <p className="text-red-600">
                      Rejected by: {meeting.assignedTo.find(email => email !== employeeId)}
                    </p>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${
                meeting.status === 'accepted' ? 'bg-green-100 text-green-800' :
                meeting.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </span>
            </div>
            
            {meeting.status === 'pending' && (
              <div className="mt-4 space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMeetingResponse(meeting.id, 'accepted')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept Meeting
                  </button>
                  <button
                    onClick={() => handleRejectClick(meeting.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject Meeting
                  </button>
                </div>
                {selectedMeetingId === meeting.id && (
                  <div className="mt-2">
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Please provide a reason for rejection..."
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => {
                          setSelectedMeetingId(null);
                          setRejectionReason("");
                        }}
                        className="text-gray-600 hover:text-gray-800 mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleMeetingResponse(meeting.id, 'rejected')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {meeting.status === 'rejected' && meeting.rejectionReason && (
              <div className="mt-2 p-2 bg-red-50 rounded">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Rejection Reason:</span> {meeting.rejectionReason}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MeetingList; 