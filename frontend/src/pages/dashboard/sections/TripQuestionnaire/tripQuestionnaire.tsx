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

      // Generate itinerary with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        const response = await fetch(
          "http://localhost:5000/api/generate-itinerary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
            body: JSON.stringify(tripData),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          // Check if we have a cleaned response that we can use
          if (errorData.cleanedResponse) {
            try {
              // Try to parse the cleaned response
              const cleanedData = cleanAndValidateItinerary(
                errorData.cleanedResponse
              );
              if (cleanedData) {
                console.log("Using cleaned response from error data");

                // Set the title if not provided
                if (!cleanedData.title) {
                  cleanedData.title = `${formData.tripType} Trip to ${formData.destination}`;
                }

                // Ensure the itinerary has all required fields
                const itineraryData = {
                  ...cleanedData,
                  duration: duration,
                  groupSize: parseInt(formData.travelers),
                  // Add default values for required fields if they're missing
                  image:
                    cleanedData.image ||
                    "https://via.placeholder.com/800x400?text=Trip+Image",
                  price: cleanedData.price || 0,
                  tags: cleanedData.tags || [],
                };

                console.log("Setting itinerary state with:", itineraryData);
                setItinerary(itineraryData);
                console.log("Itinerary state after setting:", itineraryData);
                setSuccess("Your itinerary has been generated!");

                if (onComplete) {
                  onComplete(itineraryData);
                }
                return;
              }
            } catch (e) {
              console.error("Failed to use cleaned response:", e);
            }
          }

          throw new Error(
            errorData.error ||
              errorData.details ||
              `Server error: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Response as JSON:", data);

        // Clean and validate the JSON response
        const cleanedData = cleanAndValidateItinerary(data);
        if (!cleanedData) {
          throw new Error("Invalid itinerary data: Failed to parse response");
        }

        // Validate the JSON structure
        if (
          !cleanedData.dailyBreakdown ||
          !Array.isArray(cleanedData.dailyBreakdown)
        ) {
          throw new Error(
            "Invalid itinerary data: missing dailyBreakdown array"
          );
        }

        // Ensure each day has activities
        cleanedData.dailyBreakdown.forEach((day: any, index: number) => {
          if (
            !day.activities ||
            !Array.isArray(day.activities) ||
            day.activities.length === 0
          ) {
            throw new Error(`Day ${index + 1} has no activities`);
          }
        });

        // Set the title if not provided
        if (!cleanedData.title) {
          cleanedData.title = `${formData.tripType} Trip to ${formData.destination}`;
        }

        // Ensure the itinerary has all required fields
        const itineraryData = {
          ...cleanedData,
          duration: duration,
          groupSize: parseInt(formData.travelers),
          // Add default values for required fields if they're missing
          image:
            cleanedData.image ||
            "https://via.placeholder.com/800x400?text=Trip+Image",
          price: cleanedData.price || 0,
          tags: cleanedData.tags || [],
        };

        console.log("Setting itinerary state with:", itineraryData);

        // Set the itinerary state directly
        setItinerary(itineraryData);
        console.log("Itinerary state after setting:", itineraryData);
        setSuccess("Your itinerary has been generated!");

        if (onComplete) {
          onComplete(itineraryData);
        }
      } catch (err: any) {
        clearTimeout(timeoutId);
        console.error("Error details:", err);
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(
            err.message || "Failed to generate itinerary. Please try again."
          );
        }
      }
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

/**
 * Extracts JSON from a string that might contain markdown or other formatting
 * @param input The input string that might contain JSON
 * @returns The extracted JSON string or the original string if no extraction was needed
 */
function extractJsonFromString(input: string): string {
  // Check if the input contains code fences
  if (input.includes("```")) {
    console.log("Detected code fences in the response, extracting JSON");
    // Extract content between code fences
    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match = input.match(codeBlockRegex);
    if (match && match[1]) {
      const extracted = match[1].trim();
      console.log("Successfully extracted JSON from code fences");
      return extracted;
    } else {
      console.warn(
        "Code fences detected but couldn't extract content properly"
      );
    }
  }

  // If no code fences, return the original string
  return input;
}

/**
 * Validates that the data has the expected structure for an itinerary
 * @param data The data to validate
 * @returns True if the data has the expected structure, false otherwise
 */
function validateItineraryStructure(data: any): boolean {
  // Check if the data has the expected structure
  if (!data || typeof data !== "object") {
    console.error("Invalid data structure:", data);
    return false;
  }

  // Ensure dailyBreakdown is an array
  if (!data.dailyBreakdown || !Array.isArray(data.dailyBreakdown)) {
    console.error("Missing or invalid dailyBreakdown:", data.dailyBreakdown);
    return false;
  }

  // Ensure each day has activities
  for (let i = 0; i < data.dailyBreakdown.length; i++) {
    const day = data.dailyBreakdown[i];
    if (!day.activities || !Array.isArray(day.activities)) {
      console.error(`Day ${i + 1} has invalid activities:`, day.activities);
      return false;
    }

    // Ensure each activity has time and activity properties
    for (let j = 0; j < day.activities.length; j++) {
      const activity = day.activities[j];
      if (typeof activity === "string") {
        // Convert string activities to objects
        day.activities[j] = { time: "All Day", activity };
      } else if (!activity || typeof activity !== "object") {
        console.error(`Day ${i + 1}, Activity ${j + 1} is invalid:`, activity);
        return false;
      } else if (!activity.time || !activity.activity) {
        console.error(
          `Day ${i + 1}, Activity ${j + 1} is missing time or activity:`,
          activity
        );
        return false;
      }
    }
  }

  return true;
}

/**
 * Cleans and validates the itinerary data
 * @param data The raw itinerary data from the API
 * @returns The cleaned and validated itinerary data, or null if invalid
 */
function cleanAndValidateItinerary(data: any): any {
  try {
    // If the data is a string, try to parse it
    if (typeof data === "string") {
      try {
        // First extract JSON if it's wrapped in code fences
        const extractedJson = extractJsonFromString(data);

        // Try to fix common JSON syntax errors
        const fixedJson = fixJsonSyntax(extractedJson);
        try {
          data = JSON.parse(fixedJson);
        } catch (parseError) {
          console.error("Failed to parse fixed JSON:", parseError);
          // Try one more time with a more aggressive fix
          const moreAggressiveFix = fixJsonSyntax(extractedJson)
            .replace(
              /"time":\s*"([^"]+)":\s*"([^"]+)"/g,
              '"time": "$1", "activity": "$2"'
            )
            .replace(/"time":\s*"([^"]+)":\s*{/g, '"time": "$1",');

          try {
            data = JSON.parse(moreAggressiveFix);
            console.log("Successfully parsed with aggressive fix");
          } catch (finalError) {
            console.error(
              "Failed to parse even with aggressive fix:",
              finalError
            );
            return null;
          }
        }
      } catch (e) {
        console.error("Failed to fix JSON syntax:", e);
        return null;
      }
    }

    // Validate the structure of the itinerary
    if (!validateItineraryStructure(data)) {
      return null;
    }

    // Clean each day's activities
    data.dailyBreakdown.forEach((day: any, dayIndex: number) => {
      // Clean each activity
      day.activities = day.activities.map(
        (activity: any, activityIndex: number) => {
          // Fix any malformed activities (like the one with "time": "Evening": { ... })
          if (activity.time && typeof activity.time === "object") {
            console.error(
              `Day ${dayIndex + 1}, Activity ${
                activityIndex + 1
              } has malformed time:`,
              activity
            );
            return { time: "Unknown", activity: JSON.stringify(activity) };
          }

          // Fix activities with "time": "Evening": "activity text" format
          if (
            activity.time &&
            typeof activity.time === "string" &&
            activity[activity.time]
          ) {
            console.log(
              `Fixing malformed activity in day ${dayIndex + 1}, activity ${
                activityIndex + 1
              }`
            );
            const activityText = activity[activity.time];
            return { time: activity.time, activity: activityText };
          }

          return activity;
        }
      );
    });

    return data;
  } catch (error) {
    console.error("Error cleaning itinerary data:", error);
    return null;
  }
}

/**
 * Fixes common JSON syntax errors in the response
 * @param jsonString The JSON string to fix
 * @returns The fixed JSON string
 */
function fixJsonSyntax(jsonString: string): string {
  let fixedJson = jsonString;

  // Remove any remaining code fences that might have been missed
  fixedJson = fixedJson.replace(/```(?:json)?/g, "").trim();

  // Fix the "time": "Evening": { ... } pattern
  fixedJson = fixedJson.replace(/"time":\s*"([^"]+)":\s*{/g, '"time": "$1",');

  // Fix the "time": "Evening": "activity text" pattern
  fixedJson = fixedJson.replace(
    /"time":\s*"([^"]+)":\s*"([^"]+)"/g,
    '"time": "$1", "activity": "$2"'
  );

  // Fix missing quotes around property names
  fixedJson = fixedJson.replace(/([{,]\s*)(\w+):/g, '$1"$2":');

  // Fix trailing commas in arrays and objects
  fixedJson = fixedJson.replace(/,(\s*[}\]])/g, "$1");

  // Fix single quotes instead of double quotes
  fixedJson = fixedJson.replace(/'/g, '"');

  // Log the changes for debugging
  if (fixedJson !== jsonString) {
    console.log("Fixed JSON syntax errors in the response");
    console.log("Original:", jsonString.substring(0, 100) + "...");
    console.log("Fixed:", fixedJson.substring(0, 100) + "...");
  }

  return fixedJson;
}

export default TripQuestionnaire;
