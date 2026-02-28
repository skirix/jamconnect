-- Create storage bucket for venue photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('venue_photos', 'venue_photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to venue photos
CREATE POLICY "Venue Photos Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'venue_photos');

-- Allow authenticated users to upload their own venue photos
CREATE POLICY "Users can upload venue photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'venue_photos' 
    AND auth.uid() IS NOT NULL
  );

-- Allow users to update their own venue photos
CREATE POLICY "Users can update own venue photos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'venue_photos' 
    AND owner = auth.uid()
  );

-- Allow users to delete their own venue photos
CREATE POLICY "Users can delete own venue photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'venue_photos' 
    AND owner = auth.uid()
  );