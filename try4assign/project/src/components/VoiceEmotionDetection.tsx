import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';

const VoiceEmotionDetection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const response = await fetch('http://localhost:8000/voiceapp/start-recording/', {
          method: 'POST',
        });
        
        if (response.ok) {
          setIsRecording(true);
          setStatusMessage('Recording started...');
        } else {
          setStatusMessage('Failed to start recording');
        }
      } catch (error) {
        console.error('Error:', error);
        setStatusMessage('Error connecting to server');
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/voiceapp/stop-recording/', {
          method: 'POST',
        });
        
        if (response.ok) {
          setIsRecording(false);
          const data = await response.json();
          setStatusMessage(`Detected emotion: ${data.emotion}`);
        } else {
          setStatusMessage('Failed to process recording');
        }
      } catch (error) {
        console.error('Error:', error);
        setStatusMessage('Error processing recording');
      }
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Voice Emotion Detection</h2>
      
      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={toggleRecording}
          className={`p-6 rounded-full transition-all ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>
        
        <p className="text-lg font-medium text-gray-700">
          {isRecording ? 'Recording in progress...' : 'Click to start recording'}
        </p>
        
        {statusMessage && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceEmotionDetection;