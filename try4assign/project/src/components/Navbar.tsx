console.log("Navbar component is rendering...");

import { useState } from "react";
import { FaClipboardList, FaShieldAlt, FaBell, FaLinkedin, FaTwitter, FaInstagram, FaCog, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebaseConfig";
import ReminderPopover from "./ReminderPopover";
import SettingsModal from "./SettingsModal";

export default function Navbar() {
  const [showReminders, setShowReminders] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");  // Debugging
      window.location.href = "/login"; // Redirect to login
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-lg px-6 py-4 relative h-full flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="AEIGS Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-gray-800">AEIGS</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-gray-600 hover:text-primary" onClick={() => setShowReminders(!showReminders)}>
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
            <button onClick={() => setShowSettings(true)} className="text-gray-600 hover:text-primary">
              <FaCog size={20} />
            </button>
          </div>
        </div>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* Logout Button at Bottom Left */}
      <button 
        onClick={handleLogout} 
        className="absolute bottom-4 left-6 text-gray-600 hover:text-primary flex items-center space-x-2"
      >
        <FaSignOutAlt size={20} />
        <span>Sign Out</span>
      </button>
    </nav>
  );
}
