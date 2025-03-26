import React from "react";
import { useNavigate } from "react-router-dom";
import UpcomingTrips from "./UpcomingTrips";
import { Button } from "react-bootstrap";

interface DashboardProps {
  user: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleCreateNewTrip = () => {
    navigate("/questionnaire/q1");
  };

  return (
    <div className="pt-20 full-height w-full bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 mt-4">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                {user}
              </span>
            </h1>
            <p className="text-gray-400">Ready to plan your next trip?</p>
          </div>
          <div className="col-md-4 text-md-end">
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
              onClick={handleCreateNewTrip}
            >
              Create New Trip
            </Button>
          </div>
        </div>
      </div>
      <UpcomingTrips user={user} />
    </div>
  );
};

export default Dashboard;
