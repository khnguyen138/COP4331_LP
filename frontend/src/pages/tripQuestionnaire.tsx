import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const TripQuestionnaire: React.FC = () => {
  const [step, setStep] = useState(1);

  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [tripType, setTripType] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [travelers, setTravelers] = useState('');
  const [tripName, setTripName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');

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

    /* if (!destination || !startDate || !endDate || !budget || !tripType) {
      setError('Please fill out all fields.');
      return;
    }
    setError(''); 
    
    try {
      const travelDates = { startDate, endDate };
      const response = await fetch('http://localhost:5000/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, travelDates, budget, tripType }),
      });
      if (response.ok) {
        setSuccess('Your trip preferences have been saved!');
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('An error occurred during submission.');
    } */
  };
  const navigate = useNavigate();

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit? Your responses will not be saved.");
    if (confirmExit) {
      navigate('/dashboard');
    }
  }

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
      setSelectedInterests(prev => [...prev, interest]);
    } else {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    }
  };


  return (
    <div className="qWrapper">
      <div className="qContainer">
        <div className="full-height">
          <Container className="mt-5">
            <h2 className="title">Plan Your Trip</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <div className="exit-button" onClick={handleExit}>
                &times;
              </div>
              {step === 1 && (
                <>
                  <h4>Basics</h4>
                  <Form.Group controlId="tripName">
                    <Form.Label>Trip Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Where do you want to go?"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="destination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Where do you want to go?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </Form.Group>

                  <div className="date-container mt-3">
                    <Form.Group controlId="startDate" className="mr-2">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., June 1, 2025"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., June 14, 2025"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h4>Trip Details</h4>
                  <Form.Group controlId="travelers">
                    <Form.Label>Travelers</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the number of travelers"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="budget">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}
              {step === 3 && (
                <>
                  <h4>Trip Preferences</h4>
                  <Form.Group controlId="tripType">
                    <Form.Label>Trip Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                    >
                      <option value="">Select one</option>
                      <option value="adventure">Adventure</option>
                      <option value="relaxation">Relaxation</option>
                      <option value="cultural">Cultural</option>
                      <option value="luxury">Luxury</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="travelInterests" className="mt-3">
                    <Form.Label>What are you interested in?</Form.Label>
                    <div className="travel-interests-container">
                      {interests.map((interest) => (
                        <Form.Check
                          key={interest}
                          type="checkbox"
                          label={interest}
                          value={interest}
                          checked={selectedInterests.includes(interest)}
                          onChange={(e) => handleCheckboxChange(interest, e.target.checked)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="specialNotes">
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
                    <Button variant="secondary" onClick={handleBack} className="mr-2">
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="success" type="submit">
                      Submit
                    </Button>
                  )}
              </div>
            </Form>
          </Container>
        </div>
      </div>
      <div className="previewContainer">
        <h2>Your adventure awaits</h2>
        <p>
          Fill in your trip details and let our AI create a personalized itinerary for you.
        </p>
        <div className="preview-placeholder">
          <span>✈️</span>
        </div>
      </div>
    </div>
  );
};

export default TripQuestionnaire;


