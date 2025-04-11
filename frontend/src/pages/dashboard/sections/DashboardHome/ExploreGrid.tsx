import React from "react";
import TripCard from "./TripCard";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateNewTrip = () => {
    navigate("/tripQuestionnaire");
  };
  const popularDestinations = [
    {
      id: 1,
      title: "Tokyo, Japan",
      description:
        "Experience the perfect blend of traditional culture and futuristic technology",
      image:
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      duration: "7-10 days",
    },
    {
      id: 2,
      title: "Santorini, Greece",
      description:
        "Stunning white-washed buildings with blue domes overlooking the Aegean Sea",
      image:
        "https://images.unsplash.com/photo-1688664562000-4c1f7cdb48f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pJTIwZ3JlZWNlfGVufDB8MHwwfHx8MA%3D%3D0",
      rating: 4.8,
      duration: "5-7 days",
    },
    {
      id: 3,
      title: "Bali, Indonesia",
      description:
        "Tropical paradise with lush jungles, stunning beaches, and rich cultural heritage",
      image:
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaSUyMGluZG9uZXNpYXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.7,
      duration: "10-14 days",
    },
    {
      id: 4,
      title: "Barcelona, Spain",
      description:
        "Vibrant city with stunning architecture, delicious cuisine, and beautiful beaches",
      image:
        "https://images.unsplash.com/photo-1591206521749-6f6f8ead79c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhcmNlbG9uYSUyMHNwYWlufGVufDB8MHwwfHx8MA%3D%3D",
      rating: 4.7,
      duration: "4-6 days",
    },
    {
      id: 5,
      title: "New York City, USA",
      description:
        "The city that never sleeps, offering world-class entertainment, dining, and culture",
      image:
        "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldyUyMHlvcmslMjBjaXR5fGVufDB8MHwwfHx8MA%3D%3D",
      rating: 4.6,
      duration: "5-7 days",
    },
    {
      id: 6,
      title: "Machu Picchu, Peru",
      description:
        "Ancient Incan citadel set high in the Andes Mountains, offering breathtaking views",
      image:
        "https://images.unsplash.com/photo-1568517868534-1637be8943be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fG1hY2h1JTIwcGljaHUlMjBwZXJ1fGVufDB8MHwwfHx8MA%3D%3D",
      rating: 4.9,
      duration: "8-12 days",
    },
  ];

  const upcomingTrips = [
    {
      id: 101,
      title: "Weekend in Paris",
      description: "Quick getaway to the city of lights",
      image:
        "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFyaXN8ZW58MHwwfDB8fHww",
      startDate: "Nov 10, 2023",
      endDate: "Nov 13, 2023",
      companions: 2,
    },
    {
      id: 102,
      title: "Summer in Rome",
      description: "Exploring the ancient city with friends",
      image:
        "https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cm9tZXxlbnwwfDB8MHx8fDA%3D",
      startDate: "Jul 5, 2023",
      endDate: "Jul 15, 2023",
      companions: 4,
    },
  ];

  return (
    <div className="container py-4">
      {/* Welcome section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="h2 mb-1">Welcome back, Alex</h1>
          <p className="text-muted mb-0">Ready to plan your next adventure?</p>
        </div>
        <button
          onClick={handleCreateNewTrip}
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <PlusIcon size={18} />
          <span>Create New Trip</span>
        </button>
      </div>

      {/* Upcoming trips section */}
      {upcomingTrips.length > 0 && (
        <div className="mb-5">
          <h2 className="h3 mb-4">Your Upcoming Trips</h2>
          <div className="row g-4">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="col-md-6">
                <TripCard trip={trip} type="upcoming" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular destinations */}
      <div>
        <h2 className="h3 mb-4">Explore Popular Destinations</h2>
        <div className="row g-4">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="col-md-6 col-lg-4">
              <TripCard trip={destination} type="destination" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
