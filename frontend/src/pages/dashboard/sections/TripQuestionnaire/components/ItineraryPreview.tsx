import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSwipeable } from "react-swipeable";
import styles from "../styles/TripQuestionnaire.module.css";
import { Activity, Itinerary } from "../../../../../types/itinerary";

interface DailyBreakdown {
  day: number;
  activities: Activity[];
}

interface ItineraryPreviewProps {
  itinerary: Itinerary | null;
  onEdit: () => void;
}

const formatTime = (time: string): string => {
  if (/^\d{1,2}:\d{2}\s*[AaPp][Mm]$/.test(time)) {
    return time;
  }

  const timeMap: { [key: string]: string } = {
    Morning: "9:00 AM",
    Afternoon: "2:00 PM",
    Evening: "6:00 PM",
    Night: "9:00 PM",
  };
  return timeMap[time] || time;
};

const getLocationFromActivity = (activity: string): string => {
  if (!activity) return "Location not specified";
  const match = activity.match(/at\s+([^.]+)/i);
  return match ? match[1].trim() : "Location not specified";
};

const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({
  itinerary,
  onEdit,
}) => {
  const [activeDay, setActiveDay] = useState(1);

  // Add logging to see when the component receives new itinerary data
  React.useEffect(() => {
    console.log("ItineraryPreview received itinerary:", itinerary);
    if (itinerary) {
      console.log("Itinerary structure:", {
        title: itinerary.title,
        destination: itinerary.destination,
        duration: itinerary.duration,
        groupSize: itinerary.groupSize,
        dailyBreakdown: itinerary.dailyBreakdown
          ? itinerary.dailyBreakdown.length
          : 0,
      });

      // Check if dailyBreakdown is properly structured
      if (itinerary.dailyBreakdown && itinerary.dailyBreakdown.length > 0) {
        console.log(
          "First day activities:",
          itinerary.dailyBreakdown[0].activities
        );

        // Validate each day's activities
        itinerary.dailyBreakdown.forEach((day, dayIndex) => {
          if (!day.activities || !Array.isArray(day.activities)) {
            console.error(
              `Day ${dayIndex + 1} has invalid activities:`,
              day.activities
            );
          } else {
            day.activities.forEach((activity, activityIndex) => {
              // Check if activity is a string (direct activity description)
              if (typeof activity === "string") {
                console.log(
                  `Day ${dayIndex + 1}, Activity ${
                    activityIndex + 1
                  } is a string:`,
                  activity
                );
                return; // Skip validation for string activities
              }

              if (!activity || typeof activity !== "object") {
                console.error(
                  `Day ${dayIndex + 1}, Activity ${
                    activityIndex + 1
                  } is invalid:`,
                  activity
                );
              } else if (!activity.time || !activity.activity) {
                console.error(
                  `Day ${dayIndex + 1}, Activity ${
                    activityIndex + 1
                  } is missing time or activity:`,
                  activity
                );
              }
            });
          }
        });
      }
    }
  }, [itinerary]);

  // Reset active day when itinerary changes
  React.useEffect(() => {
    setActiveDay(1);
  }, [itinerary]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && activeDay < (itinerary?.duration || 0)) {
      setActiveDay((prev) => prev + 1);
    } else if (direction === "right" && activeDay > 1) {
      setActiveDay((prev) => prev - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  if (!itinerary) {
    return (
      <div className={styles.emptyState}>
        <h2>Your adventure awaits</h2>
        <p>
          Fill in your trip details and let our AI create a personalized
          itinerary for you.
        </p>
        <div className={styles.previewPlaceholder}>
          <span>✈️</span>
        </div>
      </div>
    );
  }

  const formatDate = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Ensure we have activities for the current day
  const currentDayActivities =
    itinerary.dailyBreakdown &&
    itinerary.dailyBreakdown[activeDay - 1] &&
    itinerary.dailyBreakdown[activeDay - 1].activities
      ? itinerary.dailyBreakdown[activeDay - 1].activities
      : [];

  // Validate activities before rendering
  const validActivities = currentDayActivities.filter((activity) => {
    // Accept string activities
    if (typeof activity === "string") {
      return true;
    }

    // For object activities, check if they have the required properties
    return (
      activity &&
      typeof activity === "object" &&
      activity.time &&
      activity.activity
    );
  });

  console.log(
    `Rendering day ${activeDay} with ${validActivities.length} valid activities out of ${currentDayActivities.length} total`
  );

  return (
    <div className={styles.itineraryPreview}>
      <div className={styles["header-section"]}>
        <div className={styles["header-title"]}>
          <h2>{itinerary.title}</h2>
          <button className={styles["edit-button"]} onClick={onEdit}>
            <Pencil size={16} />
            Edit
          </button>
        </div>
        <div className={styles["header-subtitle"]}>
          <MapPin size={16} className={styles.icon} />
          {itinerary.destination} • {itinerary.duration} days •{" "}
          {itinerary.groupSize} travelers
        </div>
        {itinerary.description && (
          <div className={styles["header-description"]}>
            {itinerary.description}
          </div>
        )}
      </div>

      <div className={styles.dayNavigation}>
        <button
          className={styles.navButton}
          onClick={() => handleSwipe("right")}
          disabled={activeDay === 1}
        >
          <ChevronLeft size={20} />
        </button>
        <div className={styles.dayIndicator}>
          Day {activeDay} of {itinerary.duration}
        </div>
        <button
          className={styles.navButton}
          onClick={() => handleSwipe("left")}
          disabled={activeDay === itinerary.duration}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.contentSection} {...swipeHandlers}>
        <div className={styles["day-header"]}>
          <Calendar size={16} className={styles.icon} />
          {formatDate(activeDay)}
        </div>

        <div className={styles.activitiesList}>
          {validActivities.length > 0 ? (
            validActivities.map((activity, index) => (
              <div key={index} className={styles.activityCard}>
                <div className={styles.activityTime}>
                  <Clock size={16} className={styles.icon} />
                  {typeof activity === "string"
                    ? "All Day"
                    : formatTime(activity.time)}
                </div>
                <div className={styles.activityTitle}>
                  {typeof activity === "string" ? activity : activity.activity}
                </div>
                {activity.location && (
                  <div className={styles.activityLocation}>
                    <MapPin size={14} className={styles.icon} />
                    {activity.location}
                  </div>
                )}
                {activity.details && (
                  <div className={styles.activityDetails}>
                    {activity.details}
                  </div>
                )}
                {activity.cost && (
                  <div className={styles.activityCost}>
                    Estimated cost: {activity.cost}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.noActivities}>
              No activities planned for this day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPreview;
