import React, { useState } from "react";
import TripCard from "./TripCard";
import NewTripModal from "./NewTripModal";
import { PlusIcon } from "lucide-react";

const ExploreSection: React.FC = () => {
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const popularDestinations = [
    {
      id: 1,
      title: "Tokyo, Japan",
      description:
        "Experience the perfect blend of traditional culture and futuristic technology",
      image:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      rating: 4.9,
      duration: "7-10 days",
    },
    {
      id: 2,
      title: "Santorini, Greece",
      description:
        "Stunning white-washed buildings with blue domes overlooking the Aegean Sea",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      rating: 4.8,
      duration: "5-7 days",
    },
    {
      id: 3,
      title: "Bali, Indonesia",
      description:
        "Tropical paradise with lush jungles, stunning beaches, and rich cultural heritage",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1938&q=80",
      rating: 4.7,
      duration: "10-14 days",
    },
    {
      id: 4,
      title: "Barcelona, Spain",
      description:
        "Vibrant city with stunning architecture, delicious cuisine, and beautiful beaches",
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.7,
      duration: "4-6 days",
    },
    {
      id: 5,
      title: "New York City, USA",
      description:
        "The city that never sleeps, offering world-class entertainment, dining, and culture",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.6,
      duration: "5-7 days",
    },
    {
      id: 6,
      title: "Machu Picchu, Peru",
      description:
        "Ancient Incan citadel set high in the Andes Mountains, offering breathtaking views",
      image:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      startDate: "Nov 10, 2023",
      endDate: "Nov 13, 2023",
      companions: 2,
    },
    {
      id: 102,
      title: "Summer in Rome",
      description: "Exploring the ancient city with friends",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1996&q=80",
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
          onClick={() => setShowNewTripModal(true)}
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

      {/* New Trip Modal */}
      {showNewTripModal && (
        <NewTripModal onClose={() => setShowNewTripModal(false)} />
      )}
    </div>
  );
};

export default ExploreSection;
