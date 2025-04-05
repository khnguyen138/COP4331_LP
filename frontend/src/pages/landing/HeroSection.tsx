import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Signup from "../authentication/LoginSignup";
import { Button } from "../../components/ui/Button";

interface HeroSectionProps {
  onLogin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLogin }) => {
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="main-content flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold">Welcome to TravelGenie</h1>
              <p className="lead mb-4">
                Your ultimate travel companion that makes planning trips
                effortless, coordinates group adventures, and helps you discover
                amazing places to eat.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowLoginSignup(true)}
              >
                Start Planning
              </Button>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Travel planning illustration"
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* ✅ Modal for Signup */}
      <Modal show={showLoginSignup} onHide={() => setShowLoginSignup(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Signup />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HeroSection;
