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
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/themes.css";

import LoginSignup from "./pages/authentication/LoginSignup";

// Create a new component for the main app content
const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/upcoming" ||
    location.pathname === "/saved" ||
    location.pathname === "/explore" ||
    location.pathname === "/tripQuestionnaire" ||
    location.pathname === "/itinerary" ||
    location.pathname === "/profile";

  /* useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username);
      setIsLoggedIn(true);
    }
  }, []); */

  useEffect(() => {
    setIsLoggedIn(true); // TEMPORARY
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };

  // Wrapper function for LandingPage's onLogin prop
  const handleLandingLogin = () => {
    handleLogin("Guest");
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
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route
                path="/tripQuestionnaire"
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route
                path="/upcoming"
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route
                path="/saved"
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route
                path="/explore"
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route
                path="/itinerary"
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route path="*" element={<Dashboard user={user || "Guest"} />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<LandingPage onLogin={handleLandingLogin} />}
              />
              <Route
                path="/login"
                element={<Login onLoginSuccess={handleLogin} />}
              />
              <Route path="/signup" element={<Signup />} />

              <Route path="/loginsignup" element={<LoginSignup />} />

              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="*"
                element={<LandingPage onLogin={handleLandingLogin} />}
              />
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
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
