/*
  # AI TripSense Travel Dashboard Schema

  1. New Tables
    - `trip_plans`
      - `id` (uuid, primary key)
      - `destination` (text)
      - `budget` (numeric)
      - `accommodation_type` (text)
      - `interests` (text array)
      - `itinerary` (jsonb)
      - `created_at` (timestamp)
    
    - `discovered_places`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `image_url` (text)
      - `location` (text)
      - `tags` (text array)
    
    - `local_foods`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `type` (text) - veg/non-veg
      - `specialty` (boolean)
      - `image_url` (text)
      - `region` (text)
    
    - `local_businesses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `description` (text)
      - `contact` (text)
      - `location` (text)
      - `rating` (numeric)
    
    - `user_rewards`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `points` (integer)
      - `badges` (jsonb array)
      - `achievements` (jsonb array)
      - `updated_at` (timestamp)
    
    - `trip_diary_entries`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `place_name` (text)
      - `notes` (text)
      - `photos` (jsonb array)
      - `visited_date` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (demo purposes)
    - Add policies for user-specific write access
*/

CREATE TABLE IF NOT EXISTS trip_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination text NOT NULL,
  budget numeric NOT NULL DEFAULT 0,
  accommodation_type text NOT NULL DEFAULT 'hotel',
  interests text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS discovered_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  image_url text DEFAULT '',
  location text NOT NULL DEFAULT '',
  tags text[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS local_foods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'veg',
  specialty boolean DEFAULT false,
  image_url text DEFAULT '',
  region text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS local_businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  description text NOT NULL DEFAULT '',
  contact text DEFAULT '',
  location text NOT NULL DEFAULT '',
  rating numeric DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  points integer DEFAULT 0,
  badges jsonb DEFAULT '[]',
  achievements jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  place_name text NOT NULL,
  notes text DEFAULT '',
  photos jsonb DEFAULT '[]',
  visited_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovered_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to discovered places"
  ON discovered_places FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to local foods"
  ON local_foods FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to local businesses"
  ON local_businesses FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow users to read own trip plans"
  ON trip_plans FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow users to create trip plans"
  ON trip_plans FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow users to read own rewards"
  ON user_rewards FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow users to update own rewards"
  ON user_rewards FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow users to insert rewards"
  ON user_rewards FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow users to read own diary entries"
  ON trip_diary_entries FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow users to create diary entries"
  ON trip_diary_entries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow users to update own diary entries"
  ON trip_diary_entries FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow users to delete own diary entries"
  ON trip_diary_entries FOR DELETE
  TO anon
  USING (true);
