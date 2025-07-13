import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import {
  LayoutDashboard,
  Users,
  LineChart,
  CheckSquare,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { FaPlus } from "react-icons/fa";
import DashboardOverview from "./components/DashboardOverview";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import AEIAssistant from "./components/AEIAssistant";
import Chatbot from "./components/Chatbot";
import TaskManager from "./components/TaskManager";
import CircularTaskManager from "./components/CircularTaskManager";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import MeetingOptimizer from "./components/MeetingOptimizer";

// Define role types
type UserRole = "manager" | "employee" | "";

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState<string>("Dashboard");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userRole = await fetchUserRole(user.uid);
        setRole(userRole);
      } else {
        setUser(null);
        setRole("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Mock function to fetch user role (Replace this with Firestore implementation)
  const fetchUserRole = async (uid: string): Promise<UserRole> => {
    return "manager"; // Simulated role fetching
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "Well-Being Reports" },
    { icon: LineChart, label: "Productivity Insights" },
    { icon: CheckSquare, label: "Task Management" },
    { icon: MessageSquare, label: "Survey & Feedback" },
    { icon: Calendar, label: "Meetings & Agendas" },
  ];

  const handleMenuItemClick = (label: string) => {
    setActiveMenuItem(label);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50">
                  <Sidebar
                    menuItems={menuItems}
                    handleMenuItemClick={handleMenuItemClick}
                    activeMenuItem={activeMenuItem}
                  />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <TopNav onLogout={handleLogout} />
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                      {activeMenuItem === "Task Management" && role === "manager" && (
                        <div className="mb-6 flex items-center justify-center w-full">
                          <button
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center"
                            onClick={openModal}
                          >
                            <FaPlus className="mr-2" />
                            Assign Task
                          </button>
                        </div>
                      )}
                      {activeMenuItem === "Dashboard" && <DashboardOverview />}
                      {activeMenuItem === "Task Management" && <TaskManager />}
                      {activeMenuItem === "Well-Being Reports" && <div>Well-Being Reports Content</div>}
                      {activeMenuItem === "Productivity Insights" && <div>Productivity Insights Content</div>}
                      {activeMenuItem === "Survey & Feedback" && <div>Survey & Feedback Content</div>}
                      {activeMenuItem === "Meetings & Agendas" && <MeetingOptimizer />}
                    </main>
                    <AEIAssistant />
                    <Chatbot />
                  </div>
                  <Modal isOpen={isModalOpen} onClose={closeModal} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
