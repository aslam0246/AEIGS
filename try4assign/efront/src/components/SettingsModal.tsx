import { useState } from 'react';
import { FaTimes, FaGlobe, FaMoon, FaSun, FaBell } from 'react-icons/fa';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <FaGlobe className="mr-2" />
              Language
            </h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              {theme === 'light' ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
              Theme
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-lg ${
                  theme === 'light'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <FaBell className="mr-2" />
              Notifications
            </h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded"
              />
              <span className="ml-2">Enable notifications</span>
            </label>
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}