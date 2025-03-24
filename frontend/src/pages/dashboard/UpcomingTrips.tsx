import React from "react";
import { Card, Row, Col, Badge, Button, Container } from "react-bootstrap";

const trips = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    dateRange: "Oct 15 - Oct 25, 2023",
    image: "https://source.unsplash.com/400x250/?tokyo,japan",
    participants: 4,
    status: "Planning",
  },
  {
    id: 2,
    destination: "Barcelona, Spain",
    dateRange: "Dec 10 - Dec 18, 2023",
    image: "https://source.unsplash.com/400x250/?barcelona,spain",
    participants: 2,
    status: "Confirmed",
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    dateRange: "Jan 5 - Jan 15, 2024",
    image: "https://source.unsplash.com/400x250/?bali,indonesia",
    participants: 6,
    status: "Draft",
  },
];

const UpcomingTrips: React.FC = () => {
  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold">Your Upcoming Trips</h2>
      <Row className="g-4">
        {trips.map((trip) => (
          <Col key={trip.id} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={trip.image}
                  alt={trip.destination}
                />
                <Badge
                  bg="dark"
                  className="position-absolute top-0 end-0 m-2"
                  style={{ opacity: 0.85 }}
                >
                  {trip.status}
                </Badge>
              </div>
              <Card.Body>
                <Card.Title>{trip.destination}</Card.Title>
                <Card.Text className="text-muted">{trip.dateRange}</Card.Text>
                <Card.Text>{trip.participants} travelers</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <Button variant="primary" className="w-100">
                  Continue Planning
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UpcomingTrips;
