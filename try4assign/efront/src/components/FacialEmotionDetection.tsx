import React, { useState } from "react";

const FacialEmotionDetection = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const startCamera = async () => {
    setStatusMessage("Starting camera...");

    try {
      const response = await fetch("http://localhost:8000/facialapp/start-camera/");
      const data = await response.json();

      if (response.ok) {
        setStatusMessage("✅ Camera started successfully!");
        setIsCameraActive(true);
      } else {
        setStatusMessage(`❌ Failed to start camera: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error connecting to the server: ", error);
      setStatusMessage("❌ Error connecting to the server.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Facial Emotion Detection</h2>
      <button 
        onClick={startCamera} 
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
          isCameraActive 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isCameraActive ? 'Camera Active' : 'Start Camera'}
      </button>
      <p className="mt-4 text-gray-700">{statusMessage}</p>
    </div>
  );
};

export default FacialEmotionDetection;