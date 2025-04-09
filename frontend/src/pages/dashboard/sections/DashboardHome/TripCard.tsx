import React from "react";
import { Card } from "react-bootstrap";
import { CalendarIcon, UsersIcon, ClockIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DestinationTrip {
  id: number;
  title: string;
  description: string;
  duration: string;
  rating: number;
}

interface UpcomingTrip {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  companions: number;
}

interface TripCardProps {
  trip: DestinationTrip | UpcomingTrip;
  type: "destination" | "upcoming";
}

const TripCard: React.FC<TripCardProps> = ({ trip, type }) => {
  const navigate = useNavigate();
  const isDestination = type === "destination";
  const destinationTrip = isDestination ? (trip as DestinationTrip) : null;
  const upcomingTrip = !isDestination ? (trip as UpcomingTrip) : null;

  const handlePlanTrip = () => {
    if (isDestination) {
      navigate("/tripQuestionnaire", {
        state: {
          tripData: {
            destination: destinationTrip?.title,
            tripName: destinationTrip?.title,
            duration: parseInt(destinationTrip?.duration.split("-")[0] || "7"),
            groupSize: 2,
            description: destinationTrip?.description,
            image:
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            price: 0,
            rating: destinationTrip?.rating,
            tags: [],
            preferences: destinationTrip?.description,
          },
        },
      });
    } else {
      navigate("/tripQuestionnaire", {
        state: {
          tripData: {
            destination: upcomingTrip?.title,
            tripName: upcomingTrip?.title,
            duration: 7,
            groupSize: upcomingTrip?.companions,
            description: upcomingTrip?.description,
            image:
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            price: 0,
            rating: 4.5,
            tags: [],
            preferences: upcomingTrip?.description,
          },
        },
      });
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        {/* <div
          className="card-img-top bg-light rounded-top"
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="text-muted">Preview Image</span>
        </div> */}

        <img
          src={(trip as any).image}
          alt={trip.title}
          className="card-img-top rounded-top"
          style={{ height: "200px", objectFit: "cover", width: "100%" }}
        />

        <div className="mt-3">
          <h5 className="card-title mb-2">{trip.title}</h5>
          <p className="card-text text-muted small mb-3">{trip.description}</p>

          <div className="d-flex align-items-center text-muted small mb-3">
            {isDestination ? (
              <>
                <ClockIcon size={16} className="me-1" />
                <span>{destinationTrip?.duration}</span>
                <StarIcon size={16} className="ms-3 me-1 text-warning" />
                <span>{destinationTrip?.rating}</span>
              </>
            ) : (
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <CalendarIcon size={16} className="me-1" />
                  <span>
                    {upcomingTrip?.startDate} - {upcomingTrip?.endDate}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <UsersIcon size={16} className="me-1" />
                  <span>{upcomingTrip?.companions} travelers</span>
                </div>
              </div>
            )}
          </div>

          <button className="btn btn-primary w-100" onClick={handlePlanTrip}>
            {isDestination ? "Plan a Trip" : "View Itinerary"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
