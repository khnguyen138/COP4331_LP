import React, { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import styles from "./styles/TripQuestionnaire.module.css";
import TripForm from "./components/TripForm";
import ItineraryPreview from "./components/ItineraryPreview";
import EditItineraryModal from "./components/EditItineraryModal";

interface TripQuestionnaireProps {
  onComplete?: (data: any) => void;
  isSidebar?: boolean;
  user?: string;
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
    activities: {
      time: string;
      activity: string;
      cost: string;
    }[];
  }[];
}

const extractValue = (text: string, key: string): string => {
  const regex = new RegExp(`"${key}":\\s*"([^"]+)"`);
  const match = text.match(regex);
  return match ? match[1] : "";
};

const extractArray = (text: string, key: string): string[] => {
  const regex = new RegExp(`"${key}":\\s*\\[([^\\]]+)\\]`);
  const match = text.match(regex);
  if (!match) return [];
  return match[1].split(",").map((item) => item.trim().replace(/"/g, ""));
};

const extractDailyBreakdown = (text: string): Itinerary["dailyBreakdown"] => {
  const regex = /"dailyBreakdown":\s*\[([\s\S]*?)\]/;
  const match = text.match(regex);
  if (!match) return [];

  try {
    return JSON.parse(`[${match[1]}]`);
  } catch {
    return [];
  }
};

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

      let data;
      try {
        const rawResponse = await response.text();
        console.log("Raw response:", rawResponse);

        // Clean the response by removing markdown code block markers and fixing JSON syntax
        const cleanedResponse = rawResponse
          .replace(/```json\n|\n```/g, "")
          .replace(
            /"time":\s*"([^"]+)":\s*"([^"]+)"/g,
            '"time": "$1", "activity": "$2"'
          )
          .replace(
            /"time":\s*"([^"]+)":\s*"([^"]+)"}/g,
            '"time": "$1", "activity": "$2"}'
          )
          .replace(/,(\s*[}\]])/g, "$1")
          .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
          .replace(/:\s*'([^']*)'/g, ':"$1"')
          .replace(/:\s*([^"'{}\[\],\s]+)([,\]}])/g, ':"$1"$2')
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/\t/g, "")
          .replace(/\s+/g, " ")
          .trim();

        console.log("Cleaned response:", cleanedResponse);

        try {
          data = JSON.parse(cleanedResponse);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          // Try to fix common JSON syntax errors
          const fixedResponse = cleanedResponse
            .replace(/,(\s*[}\]])/g, "$1")
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
            .replace(/:\s*'([^']*)'/g, ':"$1"')
            .replace(/:\s*([^"'{}\[\],\s]+)([,\]}])/g, ':"$1"$2')
            .replace(/([^\\])"/g, '$1\\"')
            .replace(/\\"/g, '"')
            .replace(/([^\\])\\([^"\\])/g, "$1\\\\$2")
            .replace(/([^\\])\\([^"\\])/g, "$1\\\\$2")
            .replace(/\\\\/g, "\\")
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
            .replace(/:\s*([^"'{}\[\],\s]+)([,\]}])/g, ':"$1"$2');

          console.log("Fixed response:", fixedResponse);

          try {
            data = JSON.parse(fixedResponse);
          } catch (finalError) {
            console.error("Final JSON parse error:", finalError);
            // If all else fails, try to extract just the essential data
            const essentialData = {
              title: extractValue(fixedResponse, "title"),
              destination: extractValue(fixedResponse, "destination"),
              duration:
                parseInt(extractValue(fixedResponse, "duration")) || duration,
              groupSize:
                parseInt(extractValue(fixedResponse, "groupSize")) ||
                parseInt(formData.travelers),
              description: extractValue(fixedResponse, "description"),
              image: `https://source.unsplash.com/featured/1600x900/?${formData.destination
                .split(",")[0]
                .trim()
                .toLowerCase()},${formData.tripType.toLowerCase()}`,
              price: parseInt(extractValue(fixedResponse, "price")) || 0,
              tags: extractArray(fixedResponse, "tags"),
              dailyBreakdown: extractDailyBreakdown(fixedResponse),
            };
            data = essentialData;
          }
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error(
          "Failed to parse itinerary response. Please try again."
        );
      }

      // Validate the parsed data structure
      if (
        !data ||
        !data.dailyBreakdown ||
        !Array.isArray(data.dailyBreakdown)
      ) {
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
