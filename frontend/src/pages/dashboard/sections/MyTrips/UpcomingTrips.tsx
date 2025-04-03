import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { Calendar, MapPin, Users, Clock, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import "./UpcomingTrips.css";

interface Trip {
  id: number;
  destination: string;
  dateRange: string;
  image: string;
  participants: number;
  status: "Planning" | "Confirmed" | "Draft";
  description: string;
  daysUntil: number;
}

const trips: Trip[] = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    dateRange: "Oct 15 - Oct 25, 2023",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    participants: 4,
    status: "Planning",
    description:
      "Experience the perfect blend of traditional culture and futuristic technology",
    daysUntil: 45,
  },
  {
    id: 2,
    destination: "Barcelona, Spain",
    dateRange: "Dec 10 - Dec 18, 2023",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    participants: 2,
    status: "Confirmed",
    description:
      "Vibrant city with stunning architecture, delicious cuisine, and beautiful beaches",
    daysUntil: 92,
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    dateRange: "Jan 5 - Jan 15, 2024",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1938&q=80",
    participants: 6,
    status: "Draft",
    description:
      "Tropical paradise with lush jungles, stunning beaches, and rich cultural heritage",
    daysUntil: 118,
  },
];

const UpcomingTrips: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.destination
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || trip.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planning":
        return "warning";
      case "confirmed":
        return "success";
      case "draft":
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="h1 fw-bold mb-2">Your Upcoming Trips</h2>
          <p className="text-muted mb-0">
            Plan and manage your upcoming adventures
          </p>
        </div>
        <Link to="/explore" className="btn btn-outline-primary">
          Explore More Destinations
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-3 p-4 shadow-sm mb-4">
        <Row className="g-3">
          <Col md={8}>
            <div className="position-relative">
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <Form.Control
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-5"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="position-relative">
              <Filter className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ps-5"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="confirmed">Confirmed</option>
                <option value="draft">Draft</option>
              </Form.Select>
            </div>
          </Col>
        </Row>
      </div>

      {/* Trips Grid */}
      <Row className="g-4">
        {filteredTrips.map((trip) => (
          <Col key={trip.id} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0 hover-shadow transition-all">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={trip.image}
                  alt={trip.destination}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Badge
                  bg={getStatusColor(trip.status)}
                  className="position-absolute top-0 end-0 m-2"
                  style={{ opacity: 0.9 }}
                >
                  {trip.status}
                </Badge>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5 mb-3">{trip.destination}</Card.Title>
                <Card.Text className="text-muted mb-3">
                  {trip.description}
                </Card.Text>

                <div className="d-flex flex-column gap-2 mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <Calendar size={16} className="me-2" />
                    <small>{trip.dateRange}</small>
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <Users size={16} className="me-2" />
                    <small>{trip.participants} travelers</small>
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <Clock size={16} className="me-2" />
                    <small>{trip.daysUntil} days until departure</small>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button variant="primary" className="w-100">
                    Continue Planning
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {filteredTrips.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-4">
            <MapPin size={48} className="text-muted empty-state-icon" />
          </div>
          <h3 className="h4 mb-2">No trips found</h3>
          <p className="text-muted mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Start planning your next adventure"}
          </p>
          <Link to="/dashboard/explore" className="btn btn-primary">
            Explore Destinations
          </Link>
        </div>
      )}
    </Container>
  );
};

export default UpcomingTrips;
