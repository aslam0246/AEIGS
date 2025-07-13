import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import TaskManager from "./components/CircularTaskManager";
import WellbeingInsights from "./components/WellbeingInsights";
import SocialFeed from "./components/SocialFeed";
import ProfileSection from "./components/ProfileSection";
import PeerSupport from "./components/PeerSupport";
import DemoRedirect from "./components/DemoRedirect"; // Import the redirect button
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />

                <div className="flex">
                  <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

                  <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
                    <div className="container mx-auto px-4 py-6">
                      <div className="grid grid-cols-12 gap-6">
                        {/* Main Content Area */}
                        <div className="col-span-8 space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                              <TaskManager />
                            </div>
                          </div>
                          <WellbeingInsights />
                          <PeerSupport />
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-4 space-y-6">
                          <ProfileSection />
                          <SocialFeed />
                        </div>
                      </div>
                    </div>
                  </main>
                </div>

                {/* Floating AI Assistant */}
                <Chatbot />

                {/* Redirect Button (Fixed at Top-Right) */}
                <div className="fixed top-4 right-4 z-50">
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
