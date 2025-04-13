import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Heart, MapPin, Users, Clock, Star, Search } from "lucide-react";
import { useAuth } from "../../../../contexts/AuthContext";

interface SavedTrip {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: number;
  groupSize: number;
  price: number;
  savedAt: Date;
}

const SavedTrips: React.FC = () => {
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedTrips = async () => {
      if (!user) {
        setError("Please log in to view saved trips");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/searchItinerary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
            jwtToken: user.token,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved trips");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // Transform the data to match our SavedTrip interface
        const transformedTrips = data.Itineraries.map((itinerary: any) => ({
          id: itinerary.ItineraryId,
          title: itinerary.Itinerary.title,
          destination: itinerary.Itinerary.destination,
          image:
            itinerary.Itinerary.image ||
            "https://via.placeholder.com/800x400?text=Trip+Image",
          duration: itinerary.Itinerary.duration,
          groupSize: itinerary.Itinerary.groupSize,
          price: itinerary.Itinerary.price || 0,
          savedAt: new Date(itinerary.createdAt),
        }));

        setSavedTrips(transformedTrips);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch saved trips"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTrips();
  }, [user]);

  const handleDeleteTrip = async (tripId: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/deleteItinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          itineraryId: tripId,
          jwtToken: user.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete trip");
      }

      // Remove the deleted trip from the state
      setSavedTrips((prev) => prev.filter((trip) => trip.id !== tripId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete trip");
    }
  };

  const filteredTrips = savedTrips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

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
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      <Heart size={20} fill="currentColor" />
                    </Button>
                  </div>
                  <p className="card-text text-muted mb-3">
                    <MapPin size={16} className="me-1" />
                    {trip.destination}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center text-muted">
                      <Clock size={16} className="me-1" />
                      <span>{trip.duration} days</span>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <Users size={16} className="me-1" />
                      <span>Up to {trip.groupSize}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center">
                      <span className="h5 mb-0">${trip.price}</span>
                    </div>
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
