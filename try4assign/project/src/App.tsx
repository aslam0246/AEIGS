import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import TaskManager from "./components/CircularTaskManager";
import WellbeingInsights from "./components/WellbeingInsights";
import SocialFeed from "./components/SocialFeed";
import ProfileSection from "./components/ProfileSection";
import PeerSupport from "./components/PeerSupport";
import DemoRedirect from "./components/DemoRedirect";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import TaskList from "./components/TaskList";
import MeetingList from "./components/MeetingList";

// Using the email address that matches the assignedTo array in Firebase
const employeeId = "aslamksemeer@gmail.com";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <TaskManager />
                  </div>
                </div>
                <TaskList employeeId={employeeId} />
                <WellbeingInsights />
                <PeerSupport />
              </div>
              <div className="col-span-4 space-y-6">
                <ProfileSection />
                <SocialFeed />
              </div>
            </div>
          </div>
        );
      case 'meetings':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Meetings</h1>
              <MeetingList employeeId={employeeId} />
            </div>
          </div>
        );
      case 'insights':
        return (
          <div className="container mx-auto px-4 py-6">
            <WellbeingInsights />
          </div>
        );
      case 'chat':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Chat</h1>
              {/* Chat component will go here */}
            </div>
          </div>
        );
      case 'peer-support':
        return (
          <div className="container mx-auto px-4 py-6">
            <PeerSupport />
          </div>
        );
      case 'work-balance':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Work Balance</h1>
              {/* Work Balance component will go here */}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              {/* Settings component will go here */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Router>
      <Routes>
        {/* Default Route - Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="flex">
                  <Sidebar 
                    isOpen={sidebarOpen} 
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                    employeeId={employeeId}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />

                  <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
                    {renderMainContent()}
                  </main>
                </div>

                {/* Floating AI Assistant */}
                <Chatbot />

                {/* Redirect Button (Fixed at Top-Right) */}
                <div className="fixed bottom-4 left-4 z-50">
                  <DemoRedirect />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
