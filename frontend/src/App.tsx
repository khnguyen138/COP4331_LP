import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import NavigationBar from "./components/navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing/LandingPage";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/themes.css";

import LoginSignup from "./pages/authentication/LoginSignup";

interface LoginSignupProps {
  onLoginSuccess: (username: string, userData: any) => void;
}

// Create a new component for the main app content
const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const { login, logout, user: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard =
    location.pathname.toLowerCase().startsWith("/dashboard") ||
    location.pathname === "/upcoming" ||
    location.pathname === "/saved" ||
    location.pathname === "/explore" ||
    location.pathname === "/tripQuestionnaire" ||
    location.pathname === "/itinerary" ||
    location.pathname === "/profile";

  // Only run this effect when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !authUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username);
      setIsLoggedIn(true);
      // Update auth context only if we have valid user data
      if (parsedUser.userId && parsedUser.token) {
        login({
          userId: parsedUser.userId,
          firstName: parsedUser.firstName,
          lastName: parsedUser.lastName,
          token: parsedUser.token,
        });
      }
    }
  }, []); // Empty dependency array means this only runs once on mount

  const handleLogin = (username: string, userData: any) => {
    setUser(username);
    setIsLoggedIn(true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        ...userData,
      })
    );
    login(userData);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    logout();
    navigate("/");
  };

  // Wrapper function for LandingPage's onLogin prop
  const handleLandingLogin = () => {
    handleLogin("Guest", {
      userId: "guest",
      firstName: "Guest",
      lastName: "User",
      token: "guest-token",
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isDashboard && (
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}
      <main className="flex-grow-1">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
              <Route
                path="/tripQuestionnaire"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
              <Route
                path="/upcoming"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
              <Route
                path="/saved"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
              <Route
                path="/explore"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
              <Route
                path="/itinerary"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
              <Route
                path="*"
                element={
                  <Dashboard user={user || "Guest"} onLogout={handleLogout} />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<LandingPage onLogin={handleLandingLogin} />}
              />
              <Route
                path="/login"
                element={<LoginSignup onLoginSuccess={handleLogin} />}
              />
              <Route
                path="/signup"
                element={<LoginSignup onLoginSuccess={handleLogin} />}
              />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </>
          )}
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
