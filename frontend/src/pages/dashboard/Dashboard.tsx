import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import UpcomingTripsSection from "./sections/MyTrips/UpcomingTripsSection";
import TripQuestionnaire from "./sections/TripQuestionnaire/tripQuestionnaire";
import DashboardHome from "./sections/DashboardHome/ExploreSection";
import ExploreSection from "./sections/Explore/ExploreSection";
import { useNavigate, useLocation } from "react-router-dom";
import SavedTrips from "./sections/SavedTrips/SavedTrips";
import UserProfile from "./profile/UserProfile";

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
      case "/tripQuestionnaire":
        return <TripQuestionnaire />;
      case "/explore":
        return <ExploreSection />;
      case "/profile":
        return <UserProfile />;
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
