import { FaHandsHelping, FaUserCircle, FaComment } from 'react-icons/fa';

interface SupportRequest {
  id: number;
  title: string;
  description: string;
  author: string;
  role: string;
  responses: number;
  tags: string[];
}

export default function PeerSupport() {
  const supportRequests: SupportRequest[] = [
    {
      id: 1,
      title: "Seeking advice on work-life balance",
      description: "Looking for tips on managing remote work schedule effectively",
      author: "Sarah Wilson",
      role: "Developer",
      responses: 3,
      tags: ["work-life balance", "remote work"]
    },
    {
      id: 2,
      title: "Project management tools recommendation",
      description: "Need suggestions for tracking team productivity",
      author: "John Doe",
      role: "Senior Developer",
      responses: 5,
      tags: ["tools", "productivity"]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <FaHandsHelping className="mr-2 text-primary" />
          Peer Support Network
        </h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
          Ask for Support
        </button>
      </div>

      <div className="space-y-4">
        {supportRequests.map((request) => (
          <div key={request.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-2">{request.title}</h3>
                <p className="text-gray-600 mb-3">{request.description}</p>
                
                <div className="flex items-center mb-3">
                  <FaUserCircle className="text-gray-400 mr-2" />
                  <span className="text-sm">
                    {request.author} • {request.role}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {request.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-primary-light/20 text-primary px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <FaComment className="mr-1" />
                  <span>{request.responses} responses</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}