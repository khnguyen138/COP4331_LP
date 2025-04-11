import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import UpcomingTripsSection from "./sections/MyTrips/UpcomingTripsSection";
import TripQuestionnaire from "./sections/TripQuestionnaire/tripQuestionnaire";
import DashboardHome from "./sections/DashboardHome/ExploreGrid";
import ExploreSection from "./sections/Explore/ExploreSection";
import { useNavigate, useLocation } from "react-router-dom";
import SavedTrips from "./sections/SavedTrips/SavedTrips";
import UserProfile from "./profile/UserProfile";
import ItineraryPage from "./sections/Itinerary/ItineraryPage";

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
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
      case "/itinerary":
        return <ItineraryPage />;
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
