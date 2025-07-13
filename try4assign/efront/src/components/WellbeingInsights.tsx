import { useState } from 'react';
import { FaSmile, FaMeh, FaFrown, FaBrain, FaCalendar, FaClock, FaUsers } from 'react-icons/fa';

export default function WellbeingInsights() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { icon: FaSmile, label: 'Great', color: 'text-green-500' },
    { icon: FaMeh, label: 'Okay', color: 'text-yellow-500' },
    { icon: FaFrown, label: 'Stressed', color: 'text-red-500' },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Team Standup',
      time: '10:00 AM',
      duration: '15 mins',
      participants: 8,
    },
    {
      id: 2,
      title: 'Project Planning',
      time: '2:00 PM',
      duration: '45 mins',
      participants: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaBrain className="mr-2 text-primary" />
          Daily Well-being Check-in
        </h2>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">How are you feeling today?</p>
          <div className="flex justify-around">
            {moods.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                  selectedMood === mood.label
                    ? 'bg-primary-light/20'
                    : 'hover:bg-gray-50'
                }`}
              >
                <mood.icon className={`text-3xl mb-2 ${mood.color}`} />
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">AI Recommendations</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Take a 5-minute mindfulness break</li>
              <li>• Stretch and move around</li>
              <li>• Stay hydrated throughout the day</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCalendar className="mr-2 text-primary" />
          Upcoming Meetings
        </h2>

        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}