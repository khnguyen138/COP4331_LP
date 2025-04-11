import React, { useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Heart, MapPin, Users, Clock, Star, Search } from "lucide-react";

interface SavedTrip {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  days: number;
  people: number;
  price: number;
  savedAt: Date;
}

const SavedTrips: React.FC = () => {
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = savedTrips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveTrip = (trip: SavedTrip) => {
    setSavedTrips((prev) => {
      const isAlreadySaved = prev.some((saved) => saved.id === trip.id);
      if (isAlreadySaved) {
        return prev.filter((saved) => saved.id !== trip.id);
      }
      return [...prev, { ...trip, savedAt: new Date() }];
    });
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="h1 fw-bold mb-2">Saved Trips</h2>
          <p className="text-muted mb-0">Your favorite travel destinations</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <Search size={20} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search saved trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Saved Trips Grid */}
      {filteredTrips.length > 0 ? (
        <Row className="g-4">
          {filteredTrips.map((trip) => (
            <Col key={trip.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={trip.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{trip.title}</h5>
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => handleSaveTrip(trip)}
                    >
                      <Heart size={20} fill="currentColor" />
                    </Button>
                  </div>
                  <p className="card-text text-muted mb-3">
                    <MapPin size={16} className="me-1" />
                    {trip.location}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center text-muted">
                      <Clock size={16} className="me-1" />
                      <span>{trip.days} days</span>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <Users size={16} className="me-1" />
                      <span>Up to {trip.people}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center">
                      <Star size={16} className="text-warning me-1" />
                      <span>{trip.rating}</span>
                    </div>
                    <span className="h5 mb-0">${trip.price}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <Heart size={48} className="text-muted mb-3" />
          <h3 className="h4 mb-2">No Saved Trips Yet</h3>
          <p className="text-muted mb-4">
            Start exploring destinations and save your favorite trips
          </p>
          <Button variant="primary" href="/tripquestionnaire">
            Plan New Trip
          </Button>
        </div>
      )}
    </Container>
  );
};

export default SavedTrips;
