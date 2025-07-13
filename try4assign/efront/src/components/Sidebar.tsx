import { FaHome, FaChartBar, FaCalendar, FaComments, FaBalanceScale, FaCog, FaHandsHelping } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('home');

  const menuItems = [
    { icon: FaHome, label: 'Home', id: 'home' },
    { icon: FaChartBar, label: 'Insights', id: 'insights' },
    { icon: FaCalendar, label: 'Meetings', id: 'meetings' },
    { icon: FaComments, label: 'Chat', id: 'chat' },
    { icon: FaHandsHelping, label: 'Peer Support', id: 'peer-support' },
    { icon: FaBalanceScale, label: 'Work Balance', id: 'work-balance' },
    { icon: FaCog, label: 'Settings', id: 'settings' },
  ];

  return (
    <motion.div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex-1">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
