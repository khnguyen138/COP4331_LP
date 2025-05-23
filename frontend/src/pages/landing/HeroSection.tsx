import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./HeroSection.css";
import LoginSignup from "../authentication/LoginSignup";

interface HeroSectionProps {
  onLogin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLogin }) => {
  const [showLoginSignup, setShowLoginSignup] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setShowLoginSignup(false);
    onLogin();
    navigate("/Dashboard");
  };

  return (
    <main className="hero-section d-flex flex-column">
      <div className="tgHeader">
        <h1>Welcome to TravelGenie</h1>
      </div>

      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <div className="tgDesc">
          <p className="lead mb-4 text-start">
            Your ultimate travel companion that makes planning trips effortless,{" "}
            <br />
            coordinates group adventures, and helps you discover amazing places
            to eat.
          </p>
        </div>
        {/*<Button
          variant="primary"
          size="lg"
          onClick={() => setShowLoginSignup(true)}
        >
          Start Planning
        </Button>*/}
      </div>

      <Modal
        show={showLoginSignup}
        onHide={() => setShowLoginSignup(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <LoginSignup onLoginSuccess={handleLoginSuccess} />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default HeroSection;
