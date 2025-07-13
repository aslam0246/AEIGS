import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  handleMenuItemClick: (label: string) => void; // Function to handle menu item clicks
  activeMenuItem: string;
}

const Sidebar = ({ menuItems, handleMenuItemClick, activeMenuItem }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="h-full flex flex-col">
        <div className="space-y-1 py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuItemClick(item.label)} // Call handleMenuItemClick on click
              className={`w-full flex items-center px-6 py-3 text-sm ${
                activeMenuItem === item.label
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
