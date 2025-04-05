export interface Activity {
  time: string;
  description?: string;
  activity?: string;
  location?: string;
  details?: string;
  cost?: string;
}

export interface DailyBreakdown {
  day: number;
  activities: Activity[];
}

export interface Itinerary {
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

export interface SampleItinerary {
  id: number;
  title: string;
  destination: string;
  duration: string;
  groupSize: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  tags: string[];
}
