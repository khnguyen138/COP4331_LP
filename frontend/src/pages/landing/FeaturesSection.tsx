import type React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./FeaturesSection.css";
import { FaRoute, FaCloudSun, FaWallet, FaMapMarkedAlt } from "react-icons/fa";

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="section-title fw-bold">Features</h2>
            <p className="section-subtitle text-muted lead">
              Everything you need to plan your perfect adventure
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          {[
            {
              icon: <FaRoute size={32} />,
              title: "Personalized Itineraries",
              description:
                "Get custom travel plans tailored to your preferences, budget, and schedule",
            },
            {
              icon: <FaCloudSun size={32} />,
              title: "Weather Insights",
              description:
                "Make informed decisions with real-time weather forecasts for your destinations",
            },
            {
              icon: <FaWallet size={32} />,
              title: "Budget Tracking",
              description:
                "Easily monitor your expenses and stay within your travel budget",
            },
            {
              icon: <FaMapMarkedAlt size={32} />,
              title: "Local Discoveries",
              description:
                "Explore hidden gems and authentic local experiences at your destination",
            },
          ].map((feature, index) => (
            <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
              <Card className="h-100 hover-shadow border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <Card.Title as="h3" className="h5 fw-bold">
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
