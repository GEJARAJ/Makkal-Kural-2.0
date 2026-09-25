-- ==============================================================================
-- Makkal Kural 2.0 (மக்கள் குரல் 2.0) — Central Government Grievance Schema
-- National Public Grievance Redressal & Intelligent Representative Routing System
-- Run this entire script in your Supabase SQL Editor
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing triggers if re-running
DROP TRIGGER IF EXISTS trg_representatives_updated_at ON representatives;
DROP TRIGGER IF EXISTS trg_complaints_updated_at ON complaints;
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;

-- 1. Representatives Table (Union Ministers, Lok Sabha MPs, Central Portfolios & Nodal Officers)
CREATE TABLE IF NOT EXISTS representatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  ministry TEXT,
  level TEXT NOT NULL DEFAULT 'CENTRAL_MINISTRY', -- 'CENTRAL_MINISTRY', 'CABINET_MINISTER', 'LOK_SABHA_MP', 'RAJYA_SABHA_MP', 'CENTRAL_AGENCY', 'STATE_NODAL'
  category_specialty TEXT,
  state TEXT NOT NULL DEFAULT 'All India',
  district TEXT NOT NULL DEFAULT 'National',
  constituency TEXT,
  parliamentary_constituency TEXT,
  email TEXT NOT NULL,
  x_handle TEXT,
  official_website TEXT,
  source_url TEXT NOT NULL DEFAULT 'https://india.gov.in',
  verification_status TEXT NOT NULL DEFAULT 'VERIFIED', -- 'VERIFIED', 'NEEDS_REVIEW', 'DISABLED'
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Complaints Table (National Civic & Central Public Grievance Petitions)
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT NOT NULL UNIQUE,
  user_id UUID,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  ministry TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  original_language TEXT NOT NULL DEFAULT 'en', -- 'en', 'ta', 'hi'
  ai_improved_title TEXT,
  ai_improved_description TEXT,
  translated_description TEXT,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL,
  constituency TEXT,
  parliamentary_constituency TEXT,
  locality TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  severity TEXT NOT NULL DEFAULT 'MEDIUM', -- 'LOW', 'MEDIUM', 'HIGH', 'URGENT'
  status TEXT NOT NULL DEFAULT 'SUBMITTED', -- 'DRAFT', 'SUBMITTED', 'EMAIL_QUEUED', 'EMAIL_SENT', 'EMAIL_FAILED', 'ACKNOWLEDGED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'
  assigned_representative_id UUID REFERENCES representatives(id) ON DELETE SET NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  submitter_phone TEXT,
  submitter_language TEXT DEFAULT 'en',
  upvotes_count INTEGER NOT NULL DEFAULT 1,
  sla_deadline TIMESTAMPTZ,
  sla_escalated BOOLEAN NOT NULL DEFAULT FALSE,
  escalation_level TEXT DEFAULT 'LEVEL_1_NODAL', -- 'LEVEL_1_NODAL', 'LEVEL_2_JOINT_SECRETARY', 'LEVEL_3_MINISTER'
  resolution_proof_url TEXT,
  citizen_rating INTEGER,
  citizen_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Complaint Attachments Tables
CREATE TABLE IF NOT EXISTS complaint_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Delivery & Routing Logs (Email, X/Twitter, CPGRAMS, WhatsApp, SMS)
CREATE TABLE IF NOT EXISTS delivery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  channel TEXT NOT NULL, -- 'EMAIL', 'X_API', 'X_SHARE', 'WHATSAPP', 'SMS', 'PORTAL', 'CPGRAMS'
  recipient TEXT NOT NULL,
  status TEXT NOT NULL, -- 'SUCCESS', 'FAILED', 'PENDING', 'QUEUED'
  external_message_id TEXT,
  external_url TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Complaint Updates & Lifecycle Timeline
CREATE TABLE IF NOT EXISTS complaint_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'USER', -- 'USER', 'ADMIN'
  preferred_language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Verification Tokens (for email confirmations)
CREATE TABLE IF NOT EXISTS verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE,
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_representatives_active_level ON representatives(active, level);
CREATE INDEX IF NOT EXISTS idx_representatives_state_district ON representatives(state, district);
CREATE INDEX IF NOT EXISTS idx_representatives_ministry ON representatives(ministry);
CREATE INDEX IF NOT EXISTS idx_representatives_specialty ON representatives(category_specialty);

CREATE INDEX IF NOT EXISTS idx_complaints_reference ON complaints(reference_number);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints(category);
CREATE INDEX IF NOT EXISTS idx_complaints_ministry ON complaints(ministry);
CREATE INDEX IF NOT EXISTS idx_complaints_state_district ON complaints(state, district);
CREATE INDEX IF NOT EXISTS idx_complaints_parliamentary ON complaints(parliamentary_constituency);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_updates_complaint_id ON complaint_updates(complaint_id);
CREATE INDEX IF NOT EXISTS idx_logs_complaint_id ON delivery_logs(complaint_id);
CREATE INDEX IF NOT EXISTS idx_attachments_complaint_id ON complaint_attachments(complaint_id);

-- ==============================================================================
-- AUTOMATIC TIMESTAMPS TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_representatives_updated_at
  BEFORE UPDATE ON representatives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 1. Representatives: Everyone can read active representatives, Admins can write
CREATE POLICY "Public can view active representatives" 
  ON representatives FOR SELECT 
  USING (active = TRUE);

CREATE POLICY "Admins full access to representatives" 
  ON representatives FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- 2. Complaints: Public can create complaints & view by reference, Admins full access
CREATE POLICY "Public can create complaints" 
  ON complaints FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can view public complaint details" 
  ON complaints FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update complaints" 
  ON complaints FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- 3. Attachments: Public can insert & view
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

-- 4. Updates: Public can view public updates, service_role can insert
CREATE POLICY "Public can view updates" 
  ON complaint_updates FOR SELECT 
  USING (is_public = TRUE);

CREATE POLICY "Service and Admin can insert updates" 
  ON complaint_updates FOR ALL 
  USING (true);

-- 5. Delivery Logs: Public can view delivery statuses
CREATE POLICY "Public can view delivery logs" 
  ON delivery_logs FOR SELECT 
  USING (true);

CREATE POLICY "Service and Admin can insert delivery logs" 
  ON delivery_logs FOR ALL 
  USING (true);

-- 6. Profiles: Users can view and update their own profiles
CREATE POLICY "Users can read own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (evidence)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidence', 'evidence', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can upload complaint evidence" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'evidence');

CREATE POLICY "Public can view complaint evidence" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'evidence');
