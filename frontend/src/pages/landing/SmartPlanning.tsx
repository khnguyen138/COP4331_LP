import type React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const SmartPlanningSection: React.FC = () => {
  return (
    <section id="planning" className="py-5">
      <Container>
        <Row className="mb-4">
          <Col className="text-center">
            <h2 className="section-title">Smart Planning</h2>
            <p className="section-subtitle">
              Plan your perfect trip with our intelligent recommendations
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ borderColor: "#D5C6E0" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#192A51" }}>
                  Personalized Itineraries
                </Card.Title>
                <Card.Text>
                  Get custom travel plans based on your preferences, budget, and
                  time constraints.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ borderColor: "#D5C6E0" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#192A51" }}>
                  Weather Forecasts
                </Card.Title>
                <Card.Text>
                  Plan around the weather with integrated forecasts for your
                  destination.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ borderColor: "#D5C6E0" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#192A51" }}>
                  Budget Tracking
                </Card.Title>
                <Card.Text>
                  Keep track of your expenses and stay within your travel
                  budget.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SmartPlanningSection;
