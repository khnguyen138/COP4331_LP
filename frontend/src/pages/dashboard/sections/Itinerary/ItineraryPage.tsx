import React from "react";
import { useLocation } from "react-router-dom";
import "./ItineraryPage.css";

interface Activity {
  time: string;
  activity: string;
  location: string;
  details: string;
  cost: string;
}

interface Day {
  day: number;
  activities: Activity[];
}

const ItineraryPage = () => {
  const { state } = useLocation();
  const itinerary = state?.tripData;

  if (!itinerary) {
    return <div className="container py-5">No itinerary data found.</div>;
  }

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="itinerary-header">
        <img
          src={itinerary.image}
          alt={itinerary.title}
          style={{ width: "100%", borderRadius: "12px", marginBottom: "1.5rem", maxHeight: "400px", objectFit: "cover" }}
        />

        <h1 className="itinerary-title">{itinerary.title}</h1>
        <h4 className="text-muted">{itinerary.destination}</h4>
        <h4 className="text-muted">
          {itinerary.duration} days | {itinerary.groupSize} travelers
        </h4>
        <h4 className="text-muted">Price: {itinerary.price}</h4>
        <p className="text-muted"> {itinerary.description} </p>
        { /* <h4 className="text-muted">Tags: {itinerary.tags.join(", ")}</h4> */}
      </div>

      {/* Daily Breakdown Section */}
      <div className="mt-4">
        <h3>Daily Breakdown</h3>
        {itinerary.dailyBreakdown.map((dayObj: Day, index: number) => (
          <div key={index} className="mb-4">
            <h5>Day {dayObj.day}</h5>
            <ul className="list-group">
              {dayObj.activities.map((activity: Activity, i: number) => (
                <li key={i} className="list-group-item">
                  <strong>{activity.time}:</strong> {activity.activity}
                  <br />
                  <em>{activity.location}</em>
                  <br />
                  <span>{activity.details}</span>
                  <br />
                  <span><strong>Cost:</strong> {activity.cost}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;

