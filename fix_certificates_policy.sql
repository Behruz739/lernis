-- Sertifikatlarni hamma (login qilmaganlar ham) ko'rishi uchun ruxsat berish
-- Bu public havolalar (/c/:id) ishlashi uchun juda muhim.

-- 1. Agar mavjud bo'lsa, eski cheklovchi policyni o'chirish (ixtiyoriy, xatolik chiqmasligi uchun)
-- drop policy if exists "Users can view own certificates" on certificates;

-- 2. Yangi qoida: Hamma sertifikatlarni ko'ra oladi (faqat o'qish)
create policy "Enable read access for all users"
on certificates for select
to public
using (true);

-- Eslatma: O'zgartirish va o'chirish huquqlari hali ham faqat sertifikat egasida qoladi (boshqa policylar orqali).
