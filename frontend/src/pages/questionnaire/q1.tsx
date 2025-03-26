import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Q1: React.FC = () => {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/questionnaire/q2');
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
                <div className="progress-bar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <h2>What is your destination?</h2>
            <Form>
                <Form.Group controlId="destination">
                {/*<Form.Label>Destination</Form.Label>*/}
                <Form.Control
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" onClick={handleNext} className="mt-3">
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

export default Q1;