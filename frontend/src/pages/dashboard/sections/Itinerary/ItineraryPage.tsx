import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { CalendarIcon, UsersIcon, MapPin, CircleDollarSign } from "lucide-react";
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
        <div className="col-md-6">
          <img
            src={itinerary.image}
            alt={itinerary.title}
            style={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="itinerary-title">{itinerary.title}</h1>
          <div className="d-flex flex-wrap gap-3 mb-2 ">
            <div className="d-flex align-items-center me-3">
              <MapPin size={16} className="me-1" />
              <span className="text-muted">
                {itinerary.destination}
              </span>
            </div>
            <div className="d-flex align-items-center me-3">
              <CalendarIcon size={16} className="me-1" />
              <span className="text-muted">
                {itinerary.duration}
              </span>
            </div>
            <div className="d-flex align-items-center me-3">
              <UsersIcon size={16} className="me-1" />
              <span className="text-muted">
                {itinerary.groupSize}
              </span>
            </div>
            <div className="d-flex align-items-center me-3">
              <CircleDollarSign size={16} className="me-1" />
              <span className="text-muted">
                {itinerary.price}
              </span>
            </div>
          </div>
          <p className="text-muted"> {itinerary.description} </p>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => {
              // Handle save itinerary logic here
              console.log("Itinerary saved!");
            }}
          >
            Save Itinerary
          </Button>
        </div>
      </div>

      {/* Daily Breakdown Section */}
      <Container className="py-4">
        <div className="mt-2">
          <h3>Daily Breakdown</h3>

          {itinerary.dailyBreakdown.map((dayObj: Day, index: number) => (
            <div key={index} className="mb-4">
              <h4 className="day-header">Day {dayObj.day}</h4>

              <div className="itinerary">
                {dayObj.activities.map((activity: Activity, i: number) => (
                  <div key={i} id={`day-${dayObj.day}`} className="itinerary-activity">
                    <div className="activity-time"> {activity.time} </div>
                    <div className="activity-content">
                      <div activity-content>
                        <div className="activity-name"> {activity.activity} </div>
                        <em>{activity.location}</em> <br />
                        <span>{activity.details}</span> <br />
                        <hr className="activity-divider" />
                        <span className="cost"><strong>Cost:</strong> {activity.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ItineraryPage;