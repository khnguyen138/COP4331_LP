import type React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-4"
      style={{ backgroundColor: "#232a2b", color: "white" }}
    >
      <Container className="small" >
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>TravelGenie</h5>
            <p className="small">Travel Genie 2025.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#planning" className="text-white text-decoration-none">
                  Smart Planning
                </a>
              </li>
              <li>
                <a
                  href="#coordination"
                  className="text-white text-decoration-none"
                >
                  Group Coordination
                </a>
              </li>
              <li>
                <a href="#maps" className="text-white text-decoration-none">
                  Maps
                </a>
              </li>
              <li>
                <a href="#food" className="text-white text-decoration-none">
                  Food Discovery
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="d-flex gap-2">
              <a href="#" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-2" style={{ backgroundColor: "#AAA1C8" }} />
        <Row>
          <Col className="text-center">
            <p className="small mb-0">
              &copy; {new Date().getFullYear()} TravelGenie. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
