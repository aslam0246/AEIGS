import { FaCog, FaUserCircle, FaEnvelope, FaPhone, FaBuilding, FaBriefcase } from 'react-icons/fa';
import { useState } from 'react';

export default function ProfileSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const profile = {
    name: 'John Doe',
    role: 'Senior Developer',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    location: 'New York Office',
    bio: 'Passionate about creating efficient and scalable solutions. Focused on team collaboration and continuous learning.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    projects: ['Project Alpha', 'Beta Launch', 'Cloud Migration']
  };

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaUserCircle className="w-12 h-12 text-gray-400" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.role}</p>
            </div>
          </div>
          <button className="text-gray-600 hover:text-primary">
            <FaCog className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{profile.bio}</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <FaUserCircle className="w-16 h-16 text-gray-400" />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.role}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-2" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-400 mr-2" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center">
              <FaBuilding className="text-gray-400 mr-2" />
              <span>{profile.department}</span>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-gray-400 mr-2" />
              <span>{profile.location}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bio</h3>
            <p className="text-gray-600">{profile.bio}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Current Projects</h3>
            <ul className="list-disc list-inside text-gray-600">
              {profile.projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}