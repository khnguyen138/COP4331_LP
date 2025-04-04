import React, { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import styles from "./styles/TripQuestionnaire.module.css";
import TripForm from "./components/TripForm";
import ItineraryPreview from "./components/ItineraryPreview";
import EditItineraryModal from "./components/EditItineraryModal";
import { Itinerary } from "../../../../types/itinerary";

interface TripQuestionnaireProps {
  onComplete?: (data: any) => void;
  isSidebar?: boolean;
  user?: string;
}

const TripQuestionnaire: React.FC<TripQuestionnaireProps> = ({
  onComplete,
  isSidebar = false,
  user,
}): JSX.Element => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError("");

    try {
      // Calculate duration in days
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const duration = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      const tripData = {
        destination: formData.destination,
        duration,
        groupSize: parseInt(formData.travelers),
        preferences: `${
          formData.tripType
        } trip with interests in ${formData.selectedInterests.join(", ")}. ${
          formData.specialNotes
        }`,
      };

      console.log("Sending trip data:", tripData);

      // Generate itinerary
      const response = await fetch(
        "http://localhost:5000/api/generate-itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          body: JSON.stringify(tripData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.details ||
            `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Response as JSON:", data);

      // Validate the JSON structure
      if (!data?.dailyBreakdown || !Array.isArray(data.dailyBreakdown)) {
        throw new Error("Invalid itinerary data structure received");
      }

      setItinerary(data);
      setSuccess("Your itinerary has been generated!");

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

  const handleExit = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit? Your responses will not be saved."
    );
    if (confirmExit) {
      navigate("/dashboard");
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedItinerary: Itinerary) => {
    setItinerary(updatedItinerary);
  };

  return (
    <Container className="py-5">
      <div className={`${styles.qWrapper} ${isSidebar ? styles.sidebar : ""}`}>
        <div className={styles.qContainer}>
          <div className="p-4">
            {!isSidebar && (
              <div className={styles.qHeader}>
                <h2 className={styles.title}>Plan Your Trip</h2>
                <div className={styles.exitButton} onClick={handleExit}>
                  &times;
                </div>
              </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <TripForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>

        {!isSidebar && (
          <div className={styles.previewContainer}>
            <ItineraryPreview itinerary={itinerary} onEdit={handleEdit} />
          </div>
        )}

        <EditItineraryModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          itinerary={itinerary}
          onSave={handleSaveEdit}
        />
      </div>
    </Container>
  );
};

export default TripQuestionnaire;
