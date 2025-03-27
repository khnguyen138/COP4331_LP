import React from "react";

const SavedTripsSection: React.FC = () => {
  const draftTrips = [
    {
      id: 1,
      title: "Summer in Barcelona",
      lastEdited: "2 days ago",
      progress: 65,
    },
    {
      id: 2,
      title: "Tokyo Adventure",
      lastEdited: "5 days ago",
      progress: 40,
    },
  ];

  return (
    <section className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Your Saved Trips</h2>
        <button className="text-purple-400 hover:text-purple-300 text-sm">
          View All →
        </button>
      </div>
    </section>
  );
};

export default SavedTripsSection;
