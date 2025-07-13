import { FaCalendar, FaClock, FaBell } from 'react-icons/fa';

export default function ReminderPopover() {
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
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Reminders</h3>
        <div className="space-y-2">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
              {reminder.type === 'meeting' && <FaCalendar className="text-blue-500 mr-3" />}
              {reminder.type === 'deadline' && <FaClock className="text-red-500 mr-3" />}
              {reminder.type === 'wellness' && <FaBell className="text-green-500 mr-3" />}
              <div>
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-gray-600">{reminder.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}