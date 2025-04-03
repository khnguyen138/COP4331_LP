import React, { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Alert,
  Badge,
  Modal,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "../styles/Itinerary.css";

interface TripQuestionnaireProps {
  onComplete?: (data: any) => void;
  isSidebar?: boolean;
}

interface Itinerary {
  title: string;
  destination: string;
  duration: number;
  groupSize: number;
  description: string;
  image: string;
  price: number;
  tags: string[];
  dailyBreakdown: {
    day: number;
    activities: string[];
  }[];
}

const TripQuestionnaire: React.FC<TripQuestionnaireProps> = ({
  onComplete,
  isSidebar = false,
}): JSX.Element => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [tripType, setTripType] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [travelers, setTravelers] = useState("");
  const [tripName, setTripName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const [preview, setPreview] = useState("");
  const [generating, setGenerating] = useState(false);

  const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState<{
    key: string;
    value: any;
  } | null>(null);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!destination || !startDate || !endDate || !budget || !tripType) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Calculate duration in days
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      const tripData = {
        destination,
        duration,
        groupSize: parseInt(travelers),
        preferences: `${tripType} trip with interests in ${selectedInterests.join(
          ", "
        )}. ${specialNotes}`,
      };

      console.log("Sending trip data:", tripData);

      // Generate itinerary
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.details ||
            `Server error: ${response.status}`
        );
      }

      const data = await response.json();

      setItinerary(data);
      setSuccess("Your itinerary has been generated!");

      // Call onComplete callback if provided
      if (onComplete) {
        onComplete(data);
      }
    } catch (err: any) {
      console.error("Error details:", err);
      setError(
        err.message || "Failed to generate itinerary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleExit = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit? Your responses will not be saved."
    );
    if (confirmExit) {
      navigate("/dashboard");
    }
  };

  const interests = [
    "Cultural Sites",
    "Beaches",
    "Food & Dining",
    "Shopping",
    "Museums",
    "Outdoor Activities",
    "Nightlife",
    "Relaxation",
  ];

  const handleCheckboxChange = (interest: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedInterests((prev) => [...prev, interest]);
    } else {
      setSelectedInterests((prev) => prev.filter((i) => i !== interest));
    }
  };

  return (
    <div className={`qWrapper ${isSidebar ? "sidebar" : ""}`}>
      <div className="qContainer">
        <div className="full-height">
          <Container className="mt-5">
            {!isSidebar && (
              <div className="qHeader">
                <h2 className="title">Plan Your Trip</h2>
                <div className="exit-button" onClick={handleExit}>
                  &times;
                </div>
              </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <h4>Basics</h4>
                  <Form.Group controlId="tripName" className="mb-3">
                    <Form.Label>Trip Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="What is the title of this trip?"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="destination" className="mb-3">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Where do you want to go?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="date-container mt-3">
                    <Form.Group controlId="startDate" className="form-group">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="endDate" className="form-group">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                  <h4>Trip Details</h4>
                  <Form.Group controlId="travelers" className="mb-3">
                    <Form.Label>Travelers</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the number of travelers"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="budget" className="mb-3">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
              {step === 2 && (
                <>
                  <h4>Trip Preferences</h4>
                  <Form.Group controlId="tripType" className="mb-3">
                    <Form.Label>Trip Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                      required
                    >
                      <option value="">Select one</option>
                      <option value="adventure">Adventure</option>
                      <option value="relaxation">Relaxation</option>
                      <option value="cultural">Cultural</option>
                      <option value="luxury">Luxury</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="travelInterests" className="mb-3">
                    <Form.Label>What are you interested in?</Form.Label>
                    <div className="travel-interests-container">
                      {interests.map((interest) => (
                        <Form.Check
                          key={interest}
                          type="checkbox"
                          label={interest}
                          value={interest}
                          checked={selectedInterests.includes(interest)}
                          onChange={(e) =>
                            handleCheckboxChange(interest, e.target.checked)
                          }
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group controlId="specialNotes" className="mb-3">
                    <Form.Label>Special Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="notesBox"
                      type="text"
                      placeholder="Any dietary restrictions, accessibility needs, or special interests?"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}
              <div className="mt-4">
                {step > 1 && (
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    className="mr-2"
                  >
                    Back
                  </Button>
                )}
                {step < 2 ? (
                  <Button variant="primary" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button variant="success" type="submit" disabled={loading}>
                    {loading ? "Generating..." : "Generate Itinerary"}
                  </Button>
                )}
              </div>
            </Form>
          </Container>
        </div>
      </div>
      {!isSidebar && (
        <div className="previewContainer">
          {!itinerary ? (
            <div className="empty-state">
              <h2>Your adventure awaits</h2>
              <p>
                Fill in your trip details and let our AI create a personalized
                itinerary for you.
              </p>
              <div className="preview-placeholder">
                <span>✈️</span>
              </div>
            </div>
          ) : (
            <div className="itinerary-preview">
              <div className="hero-section">
                <div className="image-container">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="hero-image"
                  />
                  <div className="image-overlay">
                    <h1>{itinerary.title}</h1>
                    <p className="destination">{itinerary.destination}</p>
                  </div>
                </div>
                <div className="action-buttons">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setEditingItinerary({ ...itinerary });
                      setShowEditModal(true);
                    }}
                  >
                    Edit Itinerary
                  </Button>
                </div>
              </div>

              <div className="content-section">
                <Row>
                  <Col md={8}>
                    <Card className="mb-4">
                      <Card.Body>
                        <h3>Overview</h3>
                        <p className="description">{itinerary.description}</p>

                        <div className="tags-container mb-3">
                          {itinerary.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              bg="secondary"
                              className="me-2 mb-2"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>

                    <Card className="mb-4">
                      <Card.Body>
                        <h3>Daily Breakdown</h3>
                        {itinerary.dailyBreakdown.map((day, index) => (
                          <div key={index} className="day-section mb-4">
                            <h4>Day {day.day}</h4>
                            <ul className="activities-list">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="activity-item">
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="mb-4">
                      <Card.Body>
                        <h3>Trip Details</h3>
                        <ul className="details-list">
                          {Object.entries({
                            destination: itinerary.destination,
                            duration: `${itinerary.duration} days`,
                            groupSize: `${itinerary.groupSize} people`,
                            price: `$${itinerary.price}`,
                          }).map(([key, value]) => (
                            <li key={key} className="detail-item">
                              <span className="detail-label">{key}</span>
                              <span className="detail-value">{value}</span>
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        className="edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItinerary && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingItinerary.title}
                      onChange={(e) =>
                        setEditingItinerary({
                          ...editingItinerary,
                          title: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingItinerary.image}
                      onChange={(e) =>
                        setEditingItinerary({
                          ...editingItinerary,
                          image: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingItinerary.description}
                  onChange={(e) =>
                    setEditingItinerary({
                      ...editingItinerary,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={editingItinerary.price}
                      onChange={(e) =>
                        setEditingItinerary({
                          ...editingItinerary,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5>Daily Activities</h5>
              {editingItinerary.dailyBreakdown.map((day, dayIndex) => (
                <Card key={dayIndex} className="mb-3">
                  <Card.Body>
                    <h6>Day {day.day}</h6>
                    {day.activities.map((activity, actIndex) => (
                      <Form.Group key={actIndex} className="mb-2">
                        <Form.Control
                          type="text"
                          value={activity}
                          onChange={(e) => {
                            const newBreakdown = [
                              ...editingItinerary.dailyBreakdown,
                            ];
                            newBreakdown[dayIndex].activities[actIndex] =
                              e.target.value;
                            setEditingItinerary({
                              ...editingItinerary,
                              dailyBreakdown: newBreakdown,
                            });
                          }}
                        />
                      </Form.Group>
                    ))}
                  </Card.Body>
                </Card>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setItinerary(editingItinerary);
              setShowEditModal(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TripQuestionnaire;
