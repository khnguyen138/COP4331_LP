import { Navbar, Container, Nav } from "react-bootstrap";
import { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import { useNavigate } from "react-router-dom";

import LoginSignup from "../pages/authentication/LoginSignup";

interface NavigationBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

interface NavigationBarRef {
  triggerSignupModal: () => void;
}

const NavigationBar = forwardRef<NavigationBarRef, NavigationBarProps>(
  ({ isLoggedIn, onLogout }, ref) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const [showloginSignup, setShowLoginSignup] = useState(false);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCloseLogin = () => setShowLogin(false);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    const handleCloseLoginSignup = () => setShowLoginSignup(false);
    const handleShowLoginSignup = () => setShowLoginSignup(true);

    const handleLoginSuccess = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setShowLogin(false);
      navigate("/dashboard");
      window.location.reload();
    };

    useImperativeHandle(ref, () => ({
      triggerSignupModal: handleShowSignup,
    }));

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    return (
      <>
        <Navbar
          expand="lg"
          className={`fixed-top w-100 transition-all duration-300 ${
            isScrolled
              ? "navbar-light bg-transparent text-dark"
              : "navbar-light bg-transparent text-dark"
          }`}
        >
          <Container>
            <Navbar.Brand href="#home">TravelGenie</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link onClick={() => scrollToSection("hero")}>
                  Home
                </Nav.Link>
                <Nav.Link onClick={() => scrollToSection("features")}>
                  Features
                </Nav.Link>
                <Nav.Link onClick={() => scrollToSection("popular-trips")}>
                  Popular Trips
                </Nav.Link>
                <Nav.Link onClick={() => scrollToSection("how-it-works")}>
                  How It Works
                </Nav.Link>
                {isLoggedIn ? (
                  <>
                    <Nav.Link>Welcome, {user?.firstName || "User"}</Nav.Link>
                    <Nav.Link onClick={onLogout}>Sign Out</Nav.Link>
                  </>
                ) : (
                  <>
                    {/* <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
                    <Nav.Link onClick={handleShowSignup}>Get Started</Nav.Link> */}
                    <Nav.Link onClick={handleShowLoginSignup}>
                      Get Started
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Login Modal */}
        <div
          className={`modal fade ${showLogin ? "show d-block" : ""}`}
          tabIndex={-1}
          role="dialog"
          style={{
            backgroundColor: showLogin ? "rgba(0,0,0,0.5)" : "transparent",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseLogin}
                ></button>
              </div>
              <div className="modal-body">
                <Login onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          </div>
        </div>

        {/* Signup Modal */}
        <div
          className={`modal fade ${showSignup ? "show d-block" : ""}`}
          tabIndex={-1}
          role="dialog"
          style={{
            backgroundColor: showSignup ? "rgba(0,0,0,0.5)" : "transparent",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseSignup}
                ></button>
              </div>
              <div className="modal-body">
                <Signup />
              </div>
            </div>
          </div>
        </div>

        {/* Login SignUp Modal */}
        <div
          className={`modal fade ${showloginSignup ? "show d-block" : ""}`}
          tabIndex={-1}
          role="dialog"
          style={{
            backgroundColor: showloginSignup
              ? "rgba(0,0,0,0.5)"
              : "transparent",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseLoginSignup}
                ></button>
              </div>
              <div className="modal-body">
                <LoginSignup onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default NavigationBar;
