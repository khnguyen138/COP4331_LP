import React, { useState } from "react";
import { sampleItineraries } from "../../types/sampleItineraries";
import "./PopularTripsSection.css";
import { Container, Button, Modal } from "react-bootstrap";
import { CalendarIcon, UsersIcon, MapPin, CircleDollarSign } from "lucide-react";
import LoginSignup from "../authentication/LoginSignup";

const PopularTripsSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showLoginSignup, setShowLoginSignup] = useState(false);


  const handleCardClick = (trip: any) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrip(null);
  };

  const handleOpenLoginSignup = () => {
    setShowLoginSignup(true);
  };

  const handleCloseLoginSignup = () => {
    setShowLoginSignup(false);
  };


  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Explore Popular Trips</h2>
        <div className="row g-4">
          {sampleItineraries.map((trip, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              onClick={() => handleCardClick(trip)}
            >
              <div
                className="card h-100 shadow-sm hover-shadow"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h3 className="card-title h5">{trip.destination}</h3>
                  <p className="card-text text-muted">
                    ${trip.price}
                  </p>
                  <p className="card-text text-muted small">
                    {trip.duration} • {trip.groupSize}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedTrip && (
          <div
            className={`modal fade ${showModal ? "show d-block" : ""}`}
            tabIndex={-1}
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-xl scroll" role="document">
              <div className="modal-content p-4">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  onClick={handleCloseModal}
                ></button>

                <div className="container py-4">
                  {/* Header Section */}
                  <div className="row itinerary-header">
                    <div className="col-md-6">
                      <img
                        src={selectedTrip.image}
                        alt={selectedTrip.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                      <h1 className="itinerary-title">{selectedTrip.title}</h1>
                      <div className="d-flex flex-wrap gap-3 mb-2">
                        <div className="d-flex align-items-center me-3">
                          <MapPin size={16} className="me-1" />
                          <span className="text-muted">{selectedTrip.destination}</span>
                        </div>
                        <div className="d-flex align-items-center me-3">
                          <CalendarIcon size={16} className="me-1" />
                          <span className="text-muted">{selectedTrip.duration}</span>
                        </div>
                        <div className="d-flex align-items-center me-3">
                          <UsersIcon size={16} className="me-1" />
                          <span className="text-muted">{selectedTrip.groupSize}</span>
                        </div>
                        <div className="d-flex align-items-center me-3">
                          <CircleDollarSign size={16} className="me-1" />
                          <span className="text-muted">${selectedTrip.price}</span>
                        </div>
                      </div>
                      <p className="text-muted">{selectedTrip.description}</p>

                      {selectedTrip.tags && (
                        <div className="tags-container mb-3">
                          {selectedTrip.tags.map((tag: string, index: number) => (
                            <span key={index} className="tags">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Button variant="primary" className="w-100" onClick={handleOpenLoginSignup}>
                        Sign In to Save Itinerary
                      </Button>
                    </div>
                  </div>

                  {/* Daily Breakdown Section */}
                  <Container className="py-4">
                    <div className="mt-2">
                      <h3>Daily Breakdown</h3>

                      {selectedTrip.dailyBreakdown.map((dayObj: any, index: number) => (
                        <div key={index} className="mb-4">
                          <h4 className="day-header">Day {dayObj.day}</h4>

                          <div className="itinerary">
                            {dayObj.activities.map((activity: any, i: number) => (
                              <div key={i} id={`day-${dayObj.day}`} className="itinerary-activity">
                                <div className="activity-time">{activity.time}</div>
                                <div className="activity-content">
                                  <div>
                                    <div className="activity-name">{activity.activity}</div>
                                    <em>{activity.location}</em> <br />
                                    <span>{activity.details}</span> <br />
                                    <hr className="activity-divider" />
                                    <span className="cost">
                                      <strong>Cost:</strong> {activity.cost}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showLoginSignup && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
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
                <LoginSignup onLoginSuccess={handleCloseLoginSignup} />
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PopularTripsSection;
