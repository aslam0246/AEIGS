import { FaBell, FaCalendar, FaClock } from 'react-icons/fa';

export default function RemindersSection() {
  const reminders = [
    {
      id: 1,
      title: 'Team Standup',
      time: '10:00 AM',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Project Deadline',
      time: 'Tomorrow',
      type: 'deadline',
    },
    {
      id: 3,
      title: 'Take a Break',
      time: 'In 30 mins',
      type: 'wellness',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaBell className="mr-2 text-primary" />
        Reminders
      </h2>
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {reminder.type === 'meeting' && <FaCalendar className="text-blue-500 mr-3" />}
              {reminder.type === 'deadline' && <FaClock className="text-red-500 mr-3" />}
              {reminder.type === 'wellness' && <FaBell className="text-green-500 mr-3" />}
              <div>
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-gray-600">{reminder.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}