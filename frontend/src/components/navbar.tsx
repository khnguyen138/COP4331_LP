import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavigationBar = forwardRef<unknown, NavigationBarProps>(
  ({ isLoggedIn, onLogout }, ref) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

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

    return (
      <>
        <Navbar
          expand="lg"
          className="navbar-dark w-100"
          style={{ backgroundColor: "#000" }}
        >
          <Container>
            <Navbar.Brand href="#home">TravelGenie</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#planning">Smart Planning</Nav.Link>
                <Nav.Link href="#coordination">Group Coordination</Nav.Link>
                <Nav.Link href="#maps">Maps</Nav.Link>
                <Nav.Link href="#food">Food Discovery</Nav.Link>
                {isLoggedIn ? (
                  <>
                    <Nav.Link>Welcome, {user?.firstName || "User"}</Nav.Link>
                    <Nav.Link onClick={onLogout}>Sign Out</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
                    <Nav.Link onClick={handleShowSignup}>Get Started</Nav.Link>
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
      </>
    );
  }
);

export default NavigationBar;
