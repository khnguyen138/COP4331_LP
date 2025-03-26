import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavigationBar from "./components/navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing/LandingPage";
import Q1 from "./pages/questionnaire/q1";
import Q2 from "./pages/questionnaire/q2";
import Q3 from "./pages/questionnaire/q3";
import Q4 from "./pages/questionnaire/q4";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/dashboard"); // ✅ Redirect immediately
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/"); // ✅ Go to Landing Page on logout
  };

  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow-1">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard user={user || "Guest"} />}
              />
              <Route path="/questionnaire/q1" element={<Q1 />} />
              <Route path="/questionnaire/q2" element={<Q2 />} />
              <Route path="/questionnaire/q3" element={<Q3 />} />
              <Route path="/questionnaire/q4" element={<Q4 />} />
              <Route path="*" element={<Dashboard user={user || "Guest"} />} />{" "}
              {/* Redirect unknown routes */}
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<LandingPage onLogin={() => handleLogin("Guest")} />}
              />
              <Route
                path="/login"
                element={<Login onLoginSuccess={handleLogin} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="*"
                element={<LandingPage onLogin={() => handleLogin("Guest")} />}
              />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
