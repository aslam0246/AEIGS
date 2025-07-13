import { FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';

export default function MeetingOptimizer() {
  const meetings = [
    {
      id: 1,
      title: 'Team Standup',
      time: '10:00 AM',
      duration: '15 mins',
      participants: 8,
      aiSuggestion: 'Consider making this a quick async update',
    },
    {
      id: 2,
      title: 'Project Planning',
      time: '2:00 PM',
      duration: '45 mins',
      participants: 5,
      aiSuggestion: 'Optimal time based on team availability',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-primary" />
        Smart Meeting Planner
      </h2>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{meeting.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <FaClock className="mr-1" />
                  <span>{meeting.time}</span>
                  <span className="mx-2">•</span>
                  <span>{meeting.duration}</span>
                  <span className="mx-2">•</span>
                  <FaUsers className="mr-1" />
                  <span>{meeting.participants} participants</span>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">AI Suggestion:</span> {meeting.aiSuggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}