import React from "react";
import "./PopularTripsSection.css";

interface TripCard {
  destination: string;
  pricePerPerson: number;
  timeFrame: string;
  maxPeople: number;
  imageUrl: string;
}

const sampleTrips: TripCard[] = [
  {
    destination: "Bali, Indonesia",
    pricePerPerson: 1200,
    timeFrame: "7 days",
    maxPeople: 4,
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaSUyMGluZG9uZXNpYXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    destination: "Paris, France",
    pricePerPerson: 1500,
    timeFrame: "5 days",
    maxPeople: 6,
    imageUrl: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFyaXN8ZW58MHwwfDB8fHww",
  },
  {
    destination: "Tokyo, Japan",
    pricePerPerson: 1800,
    timeFrame: "8 days",
    maxPeople: 4,
    imageUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    destination: "New York, USA",
    pricePerPerson: 1000,
    timeFrame: "4 days",
    maxPeople: 6,
    imageUrl: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldyUyMHlvcmslMjBjaXR5fGVufDB8MHwwfHx8MA%3D%3D",
  },
  {
    destination: "Sydney, Australia",
    pricePerPerson: 1600,
    timeFrame: "6 days",
    maxPeople: 4,
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwYXVzdHJhbGlhfGVufDB8MHwwfHx8MA%3D%3D",
  },
  {
    destination: "Dubai, UAE",
    pricePerPerson: 1400,
    timeFrame: "5 days",
    maxPeople: 4,
    imageUrl: "https://images.unsplash.com/photo-1545648068-954d3a51df85?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHViYWklMjB1YWV8ZW58MHwwfDB8fHww",
  },
];

const PopularTripsSection: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Explore Popular Trips</h2>
        <div className="row g-4">
          {sampleTrips.map((trip, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm hover-shadow">
                <img
                  src={trip.imageUrl}
                  alt={trip.destination}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h3 className="card-title h5">{trip.destination}</h3>
                  <p className="card-text text-muted">
                    ${trip.pricePerPerson} per person
                  </p>
                  <p className="card-text text-muted small">
                    {trip.timeFrame} • Up to {trip.maxPeople} people
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
