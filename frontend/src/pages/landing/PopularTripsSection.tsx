import React from "react";
import { sampleItineraries } from "../../types/sampleItineraries";
import "./PopularTripsSection.css";

const PopularTripsSection: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Explore Popular Trips</h2>
        <div className="row g-4">
          {sampleItineraries.map((trip, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm hover-shadow">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h3 className="card-title h5">{trip.destination}</h3>
                  <p className="card-text text-muted">
                    ${trip.price}
                  </p>
                  <p className="card-text text-muted small">
                    {trip.duration} • {trip.groupSize}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTripsSection;
