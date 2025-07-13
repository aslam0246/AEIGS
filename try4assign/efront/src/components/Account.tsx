import React, { useState, ChangeEvent } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Save,
  Upload,
  Edit2,
  Plus,
  X
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    about: 'Passionate software engineer with 5+ years of experience in full-stack development.'
  });

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React - Advanced' },
    { id: '2', name: 'TypeScript - Intermediate' },
    { id: '3', name: 'Node.js - Advanced' },
  ]);

  const [interests, setInterests] = useState([
    'Artificial Intelligence',
    'Cloud Computing',
    'Web Development',
    'DevOps'
  ]);

  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built a scalable e-commerce platform using React and Node.js',
      status: 'In Progress'
    },
    {
      id: '2',
      name: 'AI Chat Application',
      description: 'Developed an AI-powered chat application using OpenAI API',
      status: 'Completed'
    }
  ]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
    console.log('Saving profile...');
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills([...skills, { id: Date.now().toString(), name: newSkill.trim() }]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    setSkills(skills.filter(skill => skill.id !== skillId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header with Profile Picture */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
                    <Upload size={20} className="text-gray-600" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-gray-600 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="pt-20 px-8">
            <div className="space-y-1">
              {isEditing ? (
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  className="text-2xl font-bold w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                  className="text-gray-600 w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-600">{personalInfo.title}</p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-400" size={20} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span>{personalInfo.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-400" size={20} />
                  {isEditing ? (
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-400" size={20} />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">About</h3>
                {isEditing ? (
                  <textarea
                    value={personalInfo.about}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, about: e.target.value })}
                    className="w-full h-32 border rounded-md p-2 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-600">{personalInfo.about}</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Skills</h3>
              <div className="space-y-4">
                {isEditing && (
                  <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a new skill..."
                      className="flex-1 border rounded-md px-3 py-2 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </form>
                )}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <GraduationCap size={16} className="text-blue-500" />
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updatedSkills = skills.map(s =>
                                s.id === skill.id ? { ...s, name: e.target.value } : s
                              );
                              setSkills(updatedSkills);
                            }}
                            className="bg-transparent w-full focus:outline-none"
                          />
                          <button
                            onClick={() => handleRemoveSkill(skill.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <span>{skill.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Interests</h3>
              {isEditing && (
                <form onSubmit={handleAddInterest} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Search or add new interest..."
                    className="flex-1 border rounded-md px-3 py-2 focus:border-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </form>
              )}
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <Heart size={16} className="text-red-500" />
                    <span>{interest}</span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Projects */}
            <div className="mt-8 mb-8">
              <h3 className="font-semibold mb-4">Current Projects</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p =>
                              p.id === project.id ? { ...p, name: e.target.value } : p
                            );
                            setProjects(updatedProjects);
                          }}
                          className="font-semibold w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                        />
                        <textarea
                          value={project.description}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p =>
                              p.id === project.id ? { ...p, description: e.target.value } : p
                            );
                            setProjects(updatedProjects);
                          }}
                          className="mt-2 w-full border rounded-md p-2 focus:border-blue-500 outline-none"
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                      </>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <Briefcase size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">{project.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;