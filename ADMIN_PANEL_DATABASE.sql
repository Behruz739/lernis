-- ============================================
-- ADMIN PANEL - DATABASE SCHEMA
-- ============================================
-- Admin Panel uchun kerakli jadvallar
-- ============================================

-- ============================================
-- 1. ADMIN_LOGS TABLE
-- ============================================
-- Admin harakatlarini kuzatish uchun

CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL, -- 'user_blocked', 'certificate_verified', 'role_changed', etc.
  target_type TEXT CHECK (target_type IN ('user', 'certificate', 'system')),
  target_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Only super_admins can view logs
CREATE POLICY "Super admins can view all logs"
  ON admin_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- Admins can insert their own logs
CREATE POLICY "Admins can insert logs"
  ON admin_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super_admin', 'org_admin')
    )
  );

-- Index for performance
CREATE INDEX IF NOT EXISTS admin_logs_admin_id_idx ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS admin_logs_created_at_idx ON admin_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS admin_logs_action_idx ON admin_logs(action);

-- ============================================
-- 2. SYSTEM_SETTINGS TABLE
-- ============================================
-- Tizim sozlamalari uchun

CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Only super_admins can manage settings
CREATE POLICY "Super admins can view settings"
  ON system_settings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can update settings"
  ON system_settings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can insert settings"
  ON system_settings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- ============================================
-- 3. DEFAULT SETTINGS
-- ============================================
-- Dastlabki sozlamalar

INSERT INTO system_settings (key, value, description) VALUES
  ('site_name', '"Lernis"', 'Platform nomi'),
  ('maintenance_mode', 'false', 'Maintenance rejimi'),
  ('max_upload_size', '10485760', 'Maksimal fayl hajmi (10MB)'),
  ('session_timeout', '3600', 'Session timeout (sekund)'),
  ('rate_limit_requests', '100', 'Rate limit (soatiga)')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 4. HELPER FUNCTIONS
-- ============================================

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  p_action TEXT,
  p_target_type TEXT,
  p_target_id UUID,
  p_details JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
  v_admin_email TEXT;
BEGIN
  -- Get admin email
  SELECT email INTO v_admin_email
  FROM profiles
  WHERE id = auth.uid();

  -- Insert log
  INSERT INTO admin_logs (
    admin_id,
    admin_email,
    action,
    target_type,
    target_id,
    details
  ) VALUES (
    auth.uid(),
    v_admin_email,
    p_action,
    p_target_type,
    p_target_id,
    p_details
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'org_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. STATISTICS VIEWS
-- ============================================

-- View for admin dashboard statistics
CREATE OR REPLACE VIEW admin_statistics AS
SELECT
  (SELECT COUNT(*) FROM profiles) as total_users,
  (SELECT COUNT(*) FROM profiles WHERE created_at > NOW() - INTERVAL '7 days') as new_users_week,
  (SELECT COUNT(*) FROM profiles WHERE created_at > NOW() - INTERVAL '30 days') as new_users_month,
  (SELECT COUNT(*) FROM certificates) as total_certificates,
  (SELECT COUNT(*) FROM certificates WHERE verified = true) as verified_certificates,
  (SELECT COUNT(*) FROM certificates WHERE verified = false) as pending_certificates,
  (SELECT COUNT(*) FROM certificates WHERE created_at > NOW() - INTERVAL '7 days') as new_certificates_week;

-- Grant access to admins
GRANT SELECT ON admin_statistics TO authenticated;

-- ============================================
-- TAYYOR! ✅
-- ============================================
-- Admin Panel database schema yaratildi:
-- - admin_logs (harakatlarni kuzatish)
-- - system_settings (tizim sozlamalari)
-- - Helper functions (log_admin_action, is_admin, is_super_admin)
-- - Statistics view (dashboard uchun)
-- ============================================
