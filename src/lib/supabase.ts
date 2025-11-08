import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TripPlan {
  id: string;
  destination: string;
  budget: number;
  accommodation_type: string;
  interests: string[];
  itinerary: any[];
  created_at: string;
}

export interface DiscoveredPlace {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  location: string;
  tags: string[];
}

export interface LocalFood {
  id: string;
  name: string;
  description: string;
  type: 'veg' | 'non-veg';
  specialty: boolean;
  image_url: string;
  region: string;
}

export interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: string;
  location: string;
  rating: number;
}

export interface UserReward {
  id: string;
  user_id: string;
  points: number;
  badges: any[];
  achievements: any[];
  updated_at: string;
}

export interface TripDiaryEntry {
  id: string;
  user_id: string;
  place_name: string;
  notes: string;
  photos: any[];
  visited_date: string;
  created_at: string;
}
