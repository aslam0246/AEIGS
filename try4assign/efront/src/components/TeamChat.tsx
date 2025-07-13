import { FaTimes, FaUserCircle } from 'react-icons/fa';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
}

interface TeamChatProps {
  onClose: () => void;
}

export default function TeamChat({ onClose }: TeamChatProps) {
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'John Doe', role: 'Senior Developer', status: 'online' },
    { id: 2, name: 'Jane Smith', role: 'Project Manager', status: 'busy' },
    { id: 3, name: 'Mike Johnson', role: 'Designer', status: 'offline', lastSeen: '2 hours ago' },
    { id: 4, name: 'Sarah Wilson', role: 'Developer', status: 'online' },
  ];

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[800px] h-[600px] max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Team Chat</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex h-[calc(100%-4rem)]">
          {/* Team Members List */}
          <div className="w-1/3 border-r p-4 overflow-y-auto">
            <h4 className="font-medium mb-4">Team Members</h4>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="relative">
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColors[member.status]} border-2 border-white`} />
                </div>
                <div className="ml-3">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                  {member.status === 'offline' && (
                    <div className="text-xs text-gray-400">Last seen {member.lastSeen}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="text-center text-gray-500 my-4">
                Select a team member to start chatting
              </div>
            </div>
            <div className="border-t p-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}