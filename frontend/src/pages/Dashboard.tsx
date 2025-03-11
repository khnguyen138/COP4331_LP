import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./../assets/styles/Dashboard.css";

const Dashboard: React.FC = () => {
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
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              MyWebsite
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {user ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">
                        Welcome, {user.firstName}
                      </span>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={handleShowLogin}
                      >
                        Login
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={handleShowSignup}
                      >
                        Get Started
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="main-content flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        {user ? (
          <div>
            <h1>Welcome, {user.firstName}!</h1>
            <p>This is your personalized dashboard.</p>
          </div>
        ) : (
          <>
            <h1>Gallery</h1>
            <div className="container">
              <div className="row">
                <div className="col-md-4 gallery-item">Item 1</div>
                <div className="col-md-4 gallery-item">Item 2</div>
                <div className="col-md-4 gallery-item">Item 3</div>
              </div>
            </div>
          </>
        )}
      </main>
      <footer className="footer bg-light text-center py-3">
        <p>&copy; 2025 Travel Genie. All rights reserved.</p>
      </footer>

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
    </div>
  );
};

export default Dashboard;
