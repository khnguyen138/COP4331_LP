import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Q2: React.FC = () => {
  const [travelDates, setTravelDates] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/questionnaire/q3');
  };

  const handleBack = () => {
    navigate('/questionnaire/q1');
  };

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit? Your responses will not be saved.");
    if (confirmExit) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="full-height">
        <Container className="mt-5 pt-5">
            <div className="progress mb-4">
                <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <h2>What dates are you traveling from?</h2>
            <Form>
                <Form.Group controlId="travelDates">
                {/* <Form.Label>Travel Dates</Form.Label> */}
                <Form.Control
                    type="text"
                    placeholder="e.g., June 1 - June 14, 2025"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                />
                </Form.Group>
                <Button variant="secondary" onClick={handleBack} className="mt-3">
                Back
                </Button>
                <Button variant="primary" onClick={handleNext} className="mt-3 ml-3">
                Next
                </Button>
                <Button variant="danger" onClick={handleExit} className="mt-3 ml-3">
                Exit
                </Button>
            </Form>
        </Container>
    </div>
  );
};

export default Q2;