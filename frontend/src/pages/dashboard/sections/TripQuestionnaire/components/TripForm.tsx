import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TripFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

interface FormData {
  tripName: string;
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  travelers: string;
  budget: string;
  tripType: string;
  selectedInterests: string[];
  specialNotes: string;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, loading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tripName: "",
    destination: "",
    startDate: null,
    endDate: null,
    travelers: "",
    budget: "",
    tripType: "",
    selectedInterests: [],
    specialNotes: "",
  });
  const [error, setError] = useState("");

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

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (interest: string, isChecked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: isChecked
        ? [...prev.selectedInterests, interest]
        : prev.selectedInterests.filter((i) => i !== interest),
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (
        !formData.destination ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.budget
      ) {
        setError("Please fill out all required fields.");
        return;
      }
    }
    setStep((prev) => prev + 1);
    setError("");
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tripType) {
      setError("Please select a trip type.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      {step === 1 && (
        <>
          <h4>Basics</h4>
          <Form.Group controlId="tripName" className="mb-3">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="What is the title of this trip?"
              value={formData.tripName}
              onChange={(e) => handleInputChange("tripName", e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="destination" className="mb-3">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Where do you want to go?"
              value={formData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              required
            />
          </Form.Group>

          <div className="date-container mt-3">
            <Form.Group controlId="startDate" className="form-group">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date: Date | null) =>
                  handleInputChange("startDate", date)
                }
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </Form.Group>
            <Form.Group controlId="endDate" className="form-group">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date: Date | null) =>
                  handleInputChange("endDate", date)
                }
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </Form.Group>
          </div>

          <Form.Group controlId="travelers" className="mb-3">
            <Form.Label>Travelers</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the number of travelers"
              value={formData.travelers}
              onChange={(e) => handleInputChange("travelers", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="budget" className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your budget"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
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
              value={formData.tripType}
              onChange={(e) => handleInputChange("tripType", e.target.value)}
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
                  checked={formData.selectedInterests.includes(interest)}
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
              placeholder="Any dietary restrictions, accessibility needs, or special interests?"
              value={formData.specialNotes}
              onChange={(e) =>
                handleInputChange("specialNotes", e.target.value)
              }
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
  );
};

export default TripForm;
