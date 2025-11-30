-- ============================================
-- FIX CERTIFICATES RELATIONSHIP
-- ============================================
-- Bu script certificates jadvalidagi user_id ustuniga
-- profiles jadvali bilan bog'lanish uchun Foreign Key qo'shadi.
-- Bu Supabase'da join query'lar ishlashi uchun kerak.

-- 1. Avval mavjud constraintni tekshiramiz (agar bo'lsa)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'certificates_user_id_profiles_fkey'
    ) THEN
        -- 2. Yangi Foreign Key qo'shamiz
        ALTER TABLE public.certificates
        ADD CONSTRAINT certificates_user_id_profiles_fkey
        FOREIGN KEY (user_id)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE;
    END IF;
END $$;

-- 3. Tekshirish
SELECT 
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='certificates';
