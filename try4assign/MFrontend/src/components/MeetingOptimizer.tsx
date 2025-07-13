import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaUsers, FaPlus, FaTrash, FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { realtimeDatabase } from "../firebaseConfig.ts";
import { ref, onValue, remove, update } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import MeetingForm from "./MeetingForm";

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
  rejectedBy?: string;
  rejectionReason?: string;
}

export default function MeetingOptimizer() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!user) return;

    const meetingsRef = ref(realtimeDatabase, 'meetings');
    let unsubscribe: () => void;

    try {
      unsubscribe = onValue(meetingsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const meetingsArray = Object.entries(data).map(([id, meeting]: [string, any]) => ({
            id,
            ...meeting,
          }));
          
          // Filter meetings based on user's role and assignments
          const filteredMeetings = meetingsArray.filter(meeting => {
            // If user is a manager, show all meetings
            if (user.displayName?.toLowerCase().includes('manager')) {
              return true;
            }
            // For employees, show meetings they are assigned to or created
            return (
              meeting.assignedTo.includes(user.email || '') ||
              meeting.createdBy === user.uid
            );
          });

          setMeetings(filteredMeetings.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
        } else {
          setMeetings([]);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching meetings:', error);
        setError('Failed to load meetings. Please try again.');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error setting up meetings listener:', error);
      setError('Failed to connect to the database. Please try again.');
      setIsLoading(false);
    }

    return () => {
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          console.error('Error cleaning up meetings listener:', error);
        }
      }
    };
  }, [user]);

  const handleMeetingSubmit = (meeting: Omit<Meeting, 'id'>) => {
    setIsFormOpen(false);
  };

  const handleMeetingResponse = async (meetingId: string, status: 'accepted' | 'rejected') => {
    if (!user) return;

    try {
      const meetingRef = ref(realtimeDatabase, `meetings/${meetingId}`);
      await update(meetingRef, {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating meeting status:', error);
      setError('Failed to update meeting status. Please try again.');
    }
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    if (!user) return;

    try {
      const meetingRef = ref(realtimeDatabase, `meetings/${meetingId}`);
      await remove(meetingRef);
    } catch (error) {
      console.error('Error deleting meeting:', error);
      setError('Failed to delete meeting. Please try again.');
    }
  };

  const handleRejectClick = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    setShowRejectionModal(true);
  };

  const handleRejectionSubmit = async () => {
    if (!user || !selectedMeetingId) return;

    try {
      const meetingRef = ref(realtimeDatabase, `meetings/${selectedMeetingId}`);
      await update(meetingRef, {
        status: 'rejected',
        rejectedBy: user.email,
        rejectionReason: rejectionReason,
        updatedAt: new Date().toISOString()
      });
      setShowRejectionModal(false);
      setRejectionReason("");
      setSelectedMeetingId(null);
    } catch (error) {
      console.error('Error updating meeting status:', error);
      setError('Failed to update meeting status. Please try again.');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-gray-600">Loading meetings...</div>
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
        <h2 className="text-xl font-semibold flex items-center">
          <FaCalendarAlt className="mr-2 text-primary" />
          Meeting Scheduler
        </h2>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-all duration-200"
          onClick={() => setIsFormOpen(true)}
        >
          <FaPlus className="mr-2" />
          Schedule Meeting
        </button>
      </div>

      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No meetings scheduled yet. Click the button above to schedule a new meeting.
          </div>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg">{meeting.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{meeting.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {meeting.status === 'pending' && !user?.displayName?.toLowerCase().includes('manager') && (
                    <>
                      <button
                        onClick={() => handleMeetingResponse(meeting.id, 'accepted')}
                        className="px-3 py-1 text-green-600 hover:text-green-800 flex items-center"
                      >
                        <FaCheck className="mr-1" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectClick(meeting.id)}
                        className="px-3 py-1 text-red-600 hover:text-red-800 flex items-center"
                      >
                        <FaTimes className="mr-1" />
                        Reject
                      </button>
                    </>
                  )}
                  {user?.displayName?.toLowerCase().includes('manager') && (
                    <button
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="px-3 py-1 text-red-600 hover:text-red-800 flex items-center"
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>Date: {new Date(meeting.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>Time: {meeting.time}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>Duration: {meeting.duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-1" />
                  <span>Assigned To: {meeting.assignedTo && meeting.assignedTo.length > 0 
                    ? meeting.assignedTo.join(", ") 
                    : "No one assigned"}</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>Assigned By: {meeting.assignedByName}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'accepted' 
                      ? 'bg-green-100 text-green-800'
                      : meeting.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                </div>
                {meeting.status === 'rejected' && meeting.rejectedBy && (
                  <div className="flex items-center text-red-600">
                    <FaTimes className="mr-1" />
                    <span>Rejected by: {meeting.rejectedBy}</span>
                  </div>
                )}
                {meeting.status === 'rejected' && meeting.rejectionReason && (
                  <div className="flex items-center text-red-600">
                    <span>Reason: {meeting.rejectionReason}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <MeetingForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleMeetingSubmit}
        />
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reject Meeting</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Rejection
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="Schedule Conflict">Schedule Conflict</option>
                  <option value="Not Relevant">Not Relevant to My Role</option>
                  <option value="Prior Commitments">Prior Commitments</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {rejectionReason === "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specify Reason
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    rows={3}
                    placeholder="Please specify your reason..."
                    required
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectionReason("");
                    setSelectedMeetingId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectionSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={!rejectionReason}
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}