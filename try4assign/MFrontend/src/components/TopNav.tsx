import React from 'react';
import { Bell, Settings, User, LogOut } from 'lucide-react';

interface TopNavProps {
  onLogout: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ onLogout }) => {
  const teamLeader = {
    name: "Sarah Anderson",
    role: "Senior Project Manager",
    team: "Digital Innovation",
    email: "sarah.anderson@aeigs.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80" 
            alt="AEIGS Logo" 
            className="h-8 w-8 rounded"
          />
          <span className="ml-3 text-xl font-semibold text-gray-800">AEIGS</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-full">
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
              <img src={teamLeader.image} alt={teamLeader.name} className="h-8 w-8 rounded-full" />
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-700">{teamLeader.name}</p>
                <p className="text-xs text-gray-500">{teamLeader.role}</p>
              </div>
            </button>
            <div className="absolute right-0 w-64 mt-2 bg-white rounded-lg shadow-lg hidden group-hover:block">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <img src={teamLeader.image} alt={teamLeader.name} className="h-12 w-12 rounded-full" />
                  <div>
                    <p className="font-medium text-gray-800">{teamLeader.name}</p>
                    <p className="text-sm text-gray-600">{teamLeader.role}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">Team: {teamLeader.team}</p>
                  <p className="text-sm text-gray-600">{teamLeader.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;