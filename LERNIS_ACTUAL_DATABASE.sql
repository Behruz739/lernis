-- ============================================
-- LERNIS PLATFORM - HAQIQIY DATABASE STRUKTURA
-- ============================================
-- Bu hozir ishlatilayotgan to'liq database struktura
-- Barcha jadvallar va ularning maydonlari
-- ============================================

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'org_admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- 2. CERTIFICATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  type TEXT CHECK (type IN ('certificate', 'diploma', 'badge')) DEFAULT 'certificate',
  image TEXT,
  credential_id TEXT UNIQUE,
  credential_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
  ON certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own certificates"
  ON certificates FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own certificates"
  ON certificates FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can view all certificates"
  ON certificates FOR SELECT USING (true);

-- ============================================
-- 3. USER_EXPERIENCES TABLE (Profile/CV)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own experiences"
  ON user_experiences FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own experiences"
  ON user_experiences FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own experiences"
  ON user_experiences FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own experiences"
  ON user_experiences FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 4. USER_EDUCATIONS TABLE (Profile/CV)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_educations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_educations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own educations"
  ON user_educations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own educations"
  ON user_educations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own educations"
  ON user_educations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own educations"
  ON user_educations FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 5. USER_SKILLS TABLE (Profile/CV)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own skills"
  ON user_skills FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skills"
  ON user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills"
  ON user_skills FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
  ON user_skills FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 6. USER_LANGUAGES TABLE (Profile/CV)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL,
  proficiency TEXT CHECK (proficiency IN ('Basic', 'Conversational', 'Fluent', 'Native')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own languages"
  ON user_languages FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own languages"
  ON user_languages FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own languages"
  ON user_languages FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own languages"
  ON user_languages FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 7. INDEXES (Performance)
-- ============================================
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS certificates_user_id_idx ON certificates(user_id);
CREATE INDEX IF NOT EXISTS certificates_credential_id_idx ON certificates(credential_id);
CREATE INDEX IF NOT EXISTS user_experiences_user_id_idx ON user_experiences(user_id);
CREATE INDEX IF NOT EXISTS user_educations_user_id_idx ON user_educations(user_id);
CREATE INDEX IF NOT EXISTS user_skills_user_id_idx ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS user_languages_user_id_idx ON user_languages(user_id);

-- ============================================
-- 8. FUNCTIONS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. TRIGGERS
-- ============================================

-- Create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at on profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update updated_at on certificates
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- TAYYOR! ✅
-- ============================================
-- Lernis platformasi uchun to'liq database struktura:
--
-- 📊 Jadvallar (6 ta):
-- 1. profiles - User profillari
-- 2. certificates - Sertifikatlar
-- 3. user_experiences - Ish tajribasi
-- 4. user_educations - Ta'lim
-- 5. user_skills - Ko'nikmalar
-- 6. user_languages - Tillar
--
-- 🔒 RLS Policies - Har bir jadval uchun
-- 📈 Indexes - Tezlik uchun
-- ⚙️ Functions & Triggers - Avtomatizatsiya
-- ============================================
