import React from "react";

interface DashboardProps {
  user: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user}!</h1>
      <p>This is your personalized dashboard.</p>
    </div>
  );
};

export default Dashboard;
