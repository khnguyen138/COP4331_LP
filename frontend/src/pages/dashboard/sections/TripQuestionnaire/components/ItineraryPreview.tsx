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

interface Activity {
  time: string;
  activity: string;
  cost: string;
}

interface DailyBreakdown {
  day: number;
  activities: Activity[];
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
  dailyBreakdown: DailyBreakdown[];
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
  // Extract location from activity description
  const locationMatch = activity.match(/at\s+([^,.]+)|in\s+([^,.]+)/i);
  if (locationMatch) {
    return locationMatch[1] || locationMatch[2] || "Location details";
  }
  return "Location details";
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

  return (
    <div className={styles.itineraryPreview}>
      <div className={styles.headerSection}>
        <div className={styles.headerTitle}>
          <h2>Itinerary</h2>
          <button className={styles.editButton} onClick={onEdit}>
            <Pencil size={16} />
            Edit
          </button>
        </div>
        <div className={styles.headerSubtitle}>
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
        <div className={styles.dayHeader}>
          <Calendar size={16} className={styles.icon} />
          {formatDate(activeDay)}
        </div>

        <div className={styles.activitiesList}>
          {itinerary.dailyBreakdown[activeDay - 1]?.activities.map(
            (activity, index) => (
              <div key={index} className={styles.activityCard}>
                <div className={styles.activityTime}>
                  <Clock size={16} className={styles.icon} />
                  {formatTime(activity.time)}
                </div>
                <div className={styles.activityTitle}>{activity.activity}</div>
                <div className={styles.activityLocation}>
                  <MapPin size={16} className={styles.icon} />
                  {getLocationFromActivity(activity.activity)}
                </div>
                {activity.cost && (
                  <div className={styles.activityNotes}>
                    Estimated cost: {activity.cost}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPreview;
