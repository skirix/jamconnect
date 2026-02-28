-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: user_types (extends auth.users)
CREATE TABLE IF NOT EXISTS user_types (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_musician boolean DEFAULT false,
  is_venue boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Table: musician_profiles
CREATE TABLE IF NOT EXISTS musician_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  bio text,
  avatar_url text,
  city text NOT NULL,
  postal_code text NOT NULL,
  latitude float,
  longitude float,
  level text CHECK (level IN ('beginner', 'intermediate', 'advanced', 'pro')),
  instruments jsonb NOT NULL DEFAULT '[]',
  styles jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table: venue_profiles
CREATE TABLE IF NOT EXISTS venue_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  venue_name text NOT NULL,
  venue_type text CHECK (venue_type IN ('rehearsal_room', 'bar', 'private_space', 'studio')),
  description text,
  capacity int,
  equipments jsonb DEFAULT '[]',
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  latitude float,
  longitude float,
  photos jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table: jam_sessions
CREATE TABLE IF NOT EXISTS jam_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) NOT NULL,
  host_type text CHECK (host_type IN ('musician', 'venue')),
  host_venue_id uuid REFERENCES venue_profiles(id),
  title text NOT NULL,
  description text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes int DEFAULT 120,
  max_participants int DEFAULT 10,
  mode text CHECK (mode IN ('reservation', 'public')) NOT NULL,
  status text CHECK (status IN ('draft', 'published', 'cancelled', 'completed')) DEFAULT 'published',
  address text,
  city text NOT NULL,
  latitude float,
  longitude float,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table: jam_participants
CREATE TABLE IF NOT EXISTS jam_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  jam_session_id uuid REFERENCES jam_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')) DEFAULT 'pending',
  message text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(jam_session_id, user_id)
);

-- Table: listings (marketplace)
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES auth.users(id) NOT NULL,
  type text CHECK (type IN ('sale', 'rental')) NOT NULL,
  category text CHECK (category IN ('instruments', 'amps', 'pedals', 'accessories', 'other')) NOT NULL,
  title text NOT NULL,
  description text,
  price_cents int NOT NULL,
  city text NOT NULL,
  photos jsonb DEFAULT '[]',
  status text CHECK (status IN ('active', 'sold', 'reserved', 'cancelled')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table: contact_requests
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) NOT NULL,
  listing_id uuid REFERENCES listings(id),
  subject text NOT NULL,
  message text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false
);

-- Enable RLS on all tables
ALTER TABLE user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE musician_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE jam_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_types
CREATE POLICY "user_types_select_public" ON user_types FOR SELECT USING (true);
CREATE POLICY "user_types_insert_own" ON user_types FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_types_update_own" ON user_types FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for musician_profiles
CREATE POLICY "musician_profiles_select_public" ON musician_profiles FOR SELECT USING (true);
CREATE POLICY "musician_profiles_insert_own" ON musician_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "musician_profiles_update_own" ON musician_profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for venue_profiles
CREATE POLICY "venue_profiles_select_public" ON venue_profiles FOR SELECT USING (true);
CREATE POLICY "venue_profiles_insert_own" ON venue_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "venue_profiles_update_own" ON venue_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "venue_profiles_delete_own" ON venue_profiles FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for jam_sessions
CREATE POLICY "jam_sessions_select_public" ON jam_sessions FOR SELECT USING (true);
CREATE POLICY "jam_sessions_insert_own" ON jam_sessions FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "jam_sessions_update_own" ON jam_sessions FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "jam_sessions_delete_own" ON jam_sessions FOR DELETE USING (auth.uid() = creator_id);

-- RLS Policies for jam_participants
CREATE POLICY "jam_participants_select" ON jam_participants FOR SELECT USING (
  auth.uid() = user_id OR 
  auth.uid() IN (SELECT creator_id FROM jam_sessions WHERE id = jam_session_id)
);
CREATE POLICY "jam_participants_insert_own" ON jam_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "jam_participants_update" ON jam_participants FOR UPDATE USING (
  auth.uid() = user_id OR 
  auth.uid() IN (SELECT creator_id FROM jam_sessions WHERE id = jam_session_id)
);

-- RLS Policies for listings
CREATE POLICY "listings_select_public" ON listings FOR SELECT USING (true);
CREATE POLICY "listings_insert_own" ON listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "listings_update_own" ON listings FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "listings_delete_own" ON listings FOR DELETE USING (auth.uid() = seller_id);

-- RLS Policies for contact_requests
CREATE POLICY "contact_requests_select_own" ON contact_requests FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "contact_requests_insert_own" ON contact_requests FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_musician_profiles_updated_at BEFORE UPDATE ON musician_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venue_profiles_updated_at BEFORE UPDATE ON venue_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jam_sessions_updated_at BEFORE UPDATE ON jam_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();