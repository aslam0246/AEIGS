import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';

const AEIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-blue-500" />
              <span className="ml-2 font-medium text-gray-800">AEI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-50 rounded-lg p-3 ml-2">
                  <p className="text-sm text-gray-800">
                    Hello! I'm AEI, your AI assistant. How can I help you today?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default AEIAssistant;
