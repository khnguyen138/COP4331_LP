import React from "react";
import UpcomingTrips from "./UpcomingTrips";

interface UpcomingTripsSectionProps {
  user: string;
}

const UpcomingTripsSection: React.FC<UpcomingTripsSectionProps> = () => {
  return (
    <section className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Your Upcoming Trips
        </h2>
      </div> */}
      <UpcomingTrips />
    </section>
  );
};

export default UpcomingTripsSection;
