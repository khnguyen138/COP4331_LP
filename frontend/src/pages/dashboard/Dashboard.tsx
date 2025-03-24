import React from "react";
import UpcomingTrips from "./UpcomingTrips";
import { Button } from "react-bootstrap";

interface DashboardProps {
  user: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="pt-20 min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {user}
            </span>
          </h1>
          <p className="text-gray-400">Ready to plan your next trip?</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg">
          Create New Trip
        </button>
      </div>
      <UpcomingTrips user={user} />
    </div>
  );
};

export default Dashboard;
