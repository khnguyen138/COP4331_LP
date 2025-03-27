import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import UpcomingTripsSection from "./sections/MyTrips/UpcomingTripsSection";
import AIPlannerSection from "./sections/AIPlannerSection";
import SavedTripsSection from "./sections/SavedTrips/SavedTrips";
import DashboardHome from "./sections/DashboardHome/ExploreSection";
import ExploreSection from "./sections/Explore/ExploreSection";
import { useNavigate, useLocation } from "react-router-dom";
import SavedTrips from "./sections/SavedTrips/SavedTrips";

interface DashboardProps {
  user: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard":
        return <DashboardHome />;
      case "/upcoming":
        return <UpcomingTripsSection user={user} />;
      case "/saved":
        return <SavedTrips />;
      case "/planner":
        return <AIPlannerSection />;
      case "/explore":
        return <ExploreSection />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />

      <main
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
