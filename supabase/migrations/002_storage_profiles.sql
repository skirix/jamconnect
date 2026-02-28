-- Create storage bucket for profile avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to avatars
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'profiles');

-- Allow authenticated users to upload their own avatars
CREATE POLICY "Users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profiles' 
    AND auth.uid() IS NOT NULL
  );

-- Allow users to update their own avatars
CREATE POLICY "Users can update own avatars" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'profiles' 
    AND owner = auth.uid()
  );

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete own avatars" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'profiles' 
    AND owner = auth.uid()
  );
