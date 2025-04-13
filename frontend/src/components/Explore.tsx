import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";
import { SampleItinerary } from "../../src/types/itinerary";
import { sampleItineraries } from "../../src/types/sampleItineraries";
import "../pages/dashboard/sections/Explore/ExploreSection.css";
import { Button } from "react-bootstrap";

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const itineraries = sampleItineraries;

  const handleViewItinerary = (itinerary: SampleItinerary) => {
    navigate("/itinerary", {
      state: {
        tripData: itinerary,
      },
    });
  };

  return (
    <div className="row g-4">
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0 hover-shadow transition-all h-100 d-flex flex-column">
            <img
              src={itinerary.image}
              className="card-img-top"
              alt={itinerary.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column flex-grow-1">
              <h5 className="card-title">{itinerary.title}</h5>
              <div className="d-flex align-items-center text-muted mb-2">
                <MapPin size={16} className="me-1" />
                <small>{itinerary.destination}</small>
              </div>
              <div className="d-flex gap-3 mb-3">
                <div className="d-flex align-items-center text-muted">
                  <Calendar size={16} className="me-1" />
                  <small>{itinerary.duration}</small>
                </div>
                <div className="d-flex align-items-center text-muted">
                  <Users size={16} className="me-1" />
                  <small>{itinerary.groupSize}</small>
                </div>
              </div>
              <p className="card-text text-muted small mb-3 flex-grow-1 mt-auto">
                {itinerary.description}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  {itinerary.tags.map((tag) => (
                    <span key={tag} className="badge bg-light text-dark">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-end">
                  <div className="h5 mb-0">${itinerary.price}</div>
                </div>
              </div>
            </div>
            <div className="mt-auto px-3 pb-3">
              <Button
                variant="primary"
                className="w-100"
                onClick={() => handleViewItinerary(itinerary)}
              >
                View Itinerary
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
