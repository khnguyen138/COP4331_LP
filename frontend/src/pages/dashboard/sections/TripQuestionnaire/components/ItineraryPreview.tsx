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

  const currentDayActivities =
    itinerary.dailyBreakdown[activeDay - 1]?.activities || [];

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
          {itinerary.destination} • {itinerary.duration} days
        </div>
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
          {currentDayActivities.map((activity, index) => (
            <div key={index} className={styles.activityCard}>
              <div className={styles.activityTime}>
                <Clock size={16} className={styles.icon} />
                {formatTime(activity.time)}
              </div>
              <div className={styles.activityTitle}>
                {activity.activity || activity.description}
              </div>
              {activity.details && (
                <div className={styles.activityDetails}>{activity.details}</div>
              )}
              {activity.cost && (
                <div className={styles.activityCost}>
                  Estimated cost: {activity.cost}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPreview;
