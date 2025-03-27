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
    imageUrl: "https://source.unsplash.com/random/800x600/?bali",
  },
  {
    destination: "Paris, France",
    pricePerPerson: 1500,
    timeFrame: "5 days",
    maxPeople: 6,
    imageUrl: "https://source.unsplash.com/random/800x600/?paris",
  },
  {
    destination: "Tokyo, Japan",
    pricePerPerson: 1800,
    timeFrame: "8 days",
    maxPeople: 4,
    imageUrl: "https://source.unsplash.com/random/800x600/?tokyo",
  },
  {
    destination: "New York, USA",
    pricePerPerson: 1000,
    timeFrame: "4 days",
    maxPeople: 6,
    imageUrl: "https://source.unsplash.com/random/800x600/?newyork",
  },
  {
    destination: "Sydney, Australia",
    pricePerPerson: 1600,
    timeFrame: "6 days",
    maxPeople: 4,
    imageUrl: "https://source.unsplash.com/random/800x600/?sydney",
  },
  {
    destination: "Dubai, UAE",
    pricePerPerson: 1400,
    timeFrame: "5 days",
    maxPeople: 4,
    imageUrl: "https://source.unsplash.com/random/800x600/?dubai",
  },
];

const PopularTripsSection: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Explore Popular Trips</h2>
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
