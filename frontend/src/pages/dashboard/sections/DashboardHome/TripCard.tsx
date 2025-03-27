import React from "react";
import {
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Star as StarIcon,
  Clock as ClockIcon,
} from "lucide-react";

interface BaseTripProps {
  id: number;
  title: string;
  description: string;
}

interface DestinationTrip extends BaseTripProps {
  rating: number;
  duration: string;
}

interface UpcomingTrip extends BaseTripProps {
  startDate: string;
  endDate: string;
  companions: number;
}

interface TripCardProps {
  trip: DestinationTrip | UpcomingTrip;
  type: "destination" | "upcoming";
}

const TripCard: React.FC<TripCardProps> = ({ trip, type }) => {
  const isDestination = type === "destination";
  const destinationTrip = isDestination ? (trip as DestinationTrip) : null;
  const upcomingTrip = !isDestination ? (trip as UpcomingTrip) : null;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div
          className="card-img-top bg-light rounded-top"
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="text-muted">Preview Image</span>
        </div>

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

          <button className="btn btn-primary w-100">
            {isDestination ? "Plan a Trip" : "View Itinerary"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
