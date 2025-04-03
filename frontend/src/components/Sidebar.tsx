import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ExploreSection from "../pages/dashboard/sections/DashboardHome/ExploreSection";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onLogout }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const sidebarWidth = 250;

  const navigation = [
    { name: "Home", href: "/dashboard" },
    { name: "My Trips", href: "/upcoming" },
    { name: "Saved Trips", href: "/saved" },
    { name: "Plan a Trip", href: "/planner" },
    { name: "Explore", href: "/explore" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        className="btn btn-outline-secondary position-fixed top-0 start-0 m-3"
        style={{
          zIndex: 1100,
          borderRadius: "0.25rem",
          padding: "0.25rem 0.5rem",
          fontSize: "1.25rem",
        }}
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className="position-fixed top-0 h-100 shadow-sm d-flex flex-column"
        style={{
          width: `${sidebarWidth}px`,
          zIndex: 1050,
          transform: isOpen
            ? "translateX(0)"
            : `translateX(-${sidebarWidth}px)`,
          transition: "transform 0.3s ease-in-out",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        }}
      >
        {/* Sidebar Header */}
        <div className="d-flex align-items-center justify-content-between border-bottom p-3">
        <h4
          className="mb-0"
          style={{
            marginLeft: "3rem",  
            marginTop: "0.5rem",
          }}
        >
          Travel Genie
        </h4>
          <button
            className="btn btn-link p-0"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="nav flex-column p-3 flex-grow-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${
                isActive(item.href)
                  ? "active fw-bold text-primary"
                  : theme === "dark" ? "text-white" : "text-dark"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-top p-3">
          <div className="d-flex flex-column align-items-center">
            {/* Profile Picture */}
            <div
              className="rounded-circle bg-secondary mb-2"
              style={{ width: "64px", height: "64px" }}
            >
              <div className="d-flex align-items-center justify-content-center h-100 text-white">
                <i className="bi bi-person-fill fs-4"></i>
              </div>
            </div>

            {/* User Info */}
            <h6 className="mb-1">John Doe</h6>
            <small className="text-muted mb-3">john.doe@example.com</small>

            {/* Buttons */}
            <div className="d-grid gap-2 w-100">
              <Link to="/profile" className="btn btn-outline-primary btn-sm">
                Profile
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={onLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
