import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
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
  budget: number;
  budgetTier: string;
  tripType: string;
  selectedInterests: string[];
  specialNotes: string;
}

const BUDGET_TIERS = [
  { value: 1, label: "Very Low", description: "Budget-friendly" },
  { value: 2, label: "Low", description: "Economical" },
  { value: 3, label: "Medium", description: "Standard" },
  { value: 4, label: "High", description: "Premium" },
  { value: 5, label: "Luxury", description: "Ultra-luxury" },
];

const TripForm: React.FC<TripFormProps> = ({ onSubmit, loading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tripName: "",
    destination: "",
    startDate: null,
    endDate: null,
    travelers: "",
    budget: 3, // Default to Medium
    budgetTier: "Medium",
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

  const handleBudgetChange = (value: number) => {
    const tier = BUDGET_TIERS.find((tier) => tier.value === value);
    setFormData((prev) => ({
      ...prev,
      budget: value,
      budgetTier: tier ? tier.label : "Medium",
    }));
  };

  const handleCheckboxChange = (interest: string, isChecked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: isChecked
        ? [...prev.selectedInterests, interest]
        : prev.selectedInterests.filter((i) => i !== interest),
    }));
  };

  const validateDates = (start: Date | null, end: Date | null): boolean => {
    if (!start || !end) return false;
    return end >= start;
  };

  const handleNext = () => {
    if (step === 1) {
      if (
        !formData.destination ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.travelers
      ) {
        setError("Please fill out all required fields.");
        return;
      }

      if (!validateDates(formData.startDate, formData.endDate)) {
        setError("End date must be equal to or later than start date.");
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

    // Final validation before submission
    if (!validateDates(formData.startDate, formData.endDate)) {
      setError(
        "Invalid date range. End date must be equal to or later than start date."
      );
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
                onChange={(date: Date | null) => {
                  handleInputChange("startDate", date);
                  // Reset end date if it's before the new start date
                  if (date && formData.endDate && formData.endDate < date) {
                    handleInputChange("endDate", date);
                  }
                }}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
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
                minDate={formData.startDate || new Date()}
                required
              />
            </Form.Group>
          </div>

          <Form.Group controlId="travelers" className="mb-3">
            <Form.Label>Travelers</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="Enter the number of travelers"
              value={formData.travelers}
              onChange={(e) => handleInputChange("travelers", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="budget" className="mb-3">
            <Form.Label>Budget Tier: {formData.budgetTier}</Form.Label>
            <Form.Range
              min={1}
              max={5}
              step={1}
              value={formData.budget}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleBudgetChange(Number(e.target.value))
              }
              className="mb-2"
            />
            <div className="d-flex justify-content-between">
              {BUDGET_TIERS.map((tier) => (
                <small key={tier.value} className="text-muted">
                  {tier.label}
                </small>
              ))}
            </div>
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

      <div className="mt-4 d-flex justify-content-between">
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
