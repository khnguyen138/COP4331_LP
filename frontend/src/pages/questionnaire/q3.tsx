import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Q3: React.FC = () => {
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    // Save the state if needed
    navigate('/questionnaire/q4');
  };

  const handleBack = () => {
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
                <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <h2>What is your budget?</h2>
            <Form>
                <Form.Group controlId="budget">
                {/* <Form.Label>Budget</Form.Label> */}
                <Form.Control
                    type="text"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
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

export default Q3;