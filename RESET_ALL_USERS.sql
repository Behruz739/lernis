-- ============================================
-- RESET ALL USERS - SUPABASE
-- ============================================
-- DIQQAT: Bu barcha userlarni va ularning ma'lumotlarini o'chiradi!
-- Faqat development/test muhitida ishlating!
-- ============================================

-- 1. Barcha profile ma'lumotlarini o'chirish
DELETE FROM public.user_languages;
DELETE FROM public.user_skills;
DELETE FROM public.user_educations;
DELETE FROM public.user_experiences;
DELETE FROM public.certificates;
DELETE FROM public.profiles;

-- 2. Barcha authentication userlarini o'chirish
DELETE FROM auth.users;

-- 3. Tekshirish
SELECT 'Remaining users:' as info, count(*) as count FROM auth.users;
SELECT 'Remaining profiles:' as info, count(*) as count FROM public.profiles;
SELECT 'Remaining certificates:' as info, count(*) as count FROM public.certificates;

-- ============================================
-- TAYYOR! ✅
-- ============================================
-- Endi yangi user yaratishingiz mumkin
-- ============================================
