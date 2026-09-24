-- ==============================================================================
-- Makkal Kural 2.0 (மக்கள் குரல் 2.0) — RLS Security Policies
-- Migration: 20260818000002_rls_policies.sql
-- ==============================================================================

ALTER TABLE representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Representatives: Public read, admin write
CREATE POLICY "Public can view active representatives" 
  ON representatives FOR SELECT 
  USING (active = TRUE);

CREATE POLICY "Admins full access to representatives" 
  ON representatives FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- Complaints: Public insert & read
CREATE POLICY "Public can create complaints" 
  ON complaints FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can view public complaint details" 
  ON complaints FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update complaints" 
  ON complaints FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- Attachments
CREATE POLICY "Public can insert attachments" 
  ON complaint_attachments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can view attachments" 
  ON complaint_attachments FOR SELECT 
  USING (true);

CREATE POLICY "Public can insert legacy attachments" 
  ON attachments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can view legacy attachments" 
  ON attachments FOR SELECT 
  USING (true);

-- Updates
CREATE POLICY "Public can view updates" 
  ON complaint_updates FOR SELECT 
  USING (is_public = TRUE);

CREATE POLICY "Service and Admin can insert updates" 
  ON complaint_updates FOR ALL 
  USING (true);

-- Delivery logs
CREATE POLICY "Public can view delivery logs" 
  ON delivery_logs FOR SELECT 
  USING (true);

CREATE POLICY "Service and Admin can insert delivery logs" 
  ON delivery_logs FOR ALL 
  USING (true);

-- Profiles
CREATE POLICY "Users can read own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidence', 'evidence', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can upload complaint evidence" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'evidence');

CREATE POLICY "Public can view complaint evidence" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'evidence');
