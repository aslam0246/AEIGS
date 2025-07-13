import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending here
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed right-6 bottom-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl"
      >
        {isOpen && (
          <div className="w-80 h-96">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col h-[calc(100%-64px)]">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center text-gray-600 mt-4">
                  <p>Hello! I'm your AI assistant.</p>
                  <p className="mt-2">How can I help you today?</p>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    disabled={!message.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg"
          >
            🤖
          </button>
        )}
      </motion.div>
    </div>
  );
}