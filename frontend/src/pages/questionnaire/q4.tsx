import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Q4: React.FC = () => {
  const [tripType, setTripType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    /* try {
        const response = await fetch('http://localhost:5001/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripType }),
      });
      if (response.ok) {
        alert('Your trip preferences have been saved!');
        navigate('/dashboard'); 
      } else {
        // Handle error

      }
    } catch (err) {
      // Handle error
      alert('An error occurred. Please try again.');
    } */
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/questionnaire/q3');
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
                <div className="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            <h2>What is your prefered trip style?</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="tripType">
                {/*<Form.Label>Trip Type</Form.Label>*/}
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
                <Button variant="secondary" onClick={handleBack} className="mt-3">
                Back
                </Button>
                <Button variant="primary" type="submit" className="mt-3 ml-3">
                Submit
                </Button>
                <Button variant="danger" onClick={handleExit} className="mt-3 ml-3">
                Exit
                </Button>
            </Form>
        </Container>
    </div>
  );
};

export default Q4;