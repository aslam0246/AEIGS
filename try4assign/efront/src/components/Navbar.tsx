import { FaClipboardList, FaShieldAlt, FaBell, FaLinkedin, FaTwitter, FaInstagram, FaCog } from 'react-icons/fa';
import { useState } from 'react';
import ReminderPopover from './ReminderPopover';
import SettingsModal from './SettingsModal';

export default function Navbar() {
  const [showReminders, setShowReminders] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="bg-white shadow-lg px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="AEIGS Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-gray-800">AEIGS</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="text-gray-600 hover:text-primary"
                onClick={() => setShowReminders(!showReminders)}
              >
                <FaBell size={20} />
              </button>
              {showReminders && <ReminderPopover />}
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary">
              <FaClipboardList />
              <span>Surveys</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary">
              <FaShieldAlt />
              <span>Privacy</span>
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          <div className="flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <FaInstagram size={20} />
            </a>
            <button 
              onClick={() => setShowSettings(true)}
              className="text-gray-600 hover:text-primary"
            >
              <FaCog size={20} />
            </button>
          </div>
        </div>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </nav>
  );
}