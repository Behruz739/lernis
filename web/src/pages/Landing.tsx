import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Shield, 
  QrCode, 
  Target, 
  Award, 
  Globe, 
  Database, 
  Users, 
  Zap, 
  FileText, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  AlertCircle,
  Hammer,
  Key,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
// Lazy load components for better performance
const Navbar = lazy(() => import('../components/Navbar'));
const Footer = lazy(() => import('../components/Footer'));

// Coming Soon Mode - Set to true to show coming soon page
const COMING_SOON_MODE = true;

// Password for accessing full landing page (can be changed)
const ACCESS_PASSWORD = 'lernis2026';

// Coming Soon Component
function ComingSoonPage({ onUnlock }: { onUnlock: () => void }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPasswordModal) {
        setShowPasswordModal(false);
        setPassword('');
        setError('');
      }
    };

    if (showPasswordModal) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showPasswordModal]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      console.log('Parol to\'g\'ri! Landing page ochilmoqda...');
      setError('');
      setPassword('');
      setShowPasswordModal(false);
      onUnlock();
    } else {
      console.log('Noto\'g\'ri parol kiritildi');
      setError('Noto\'g\'ri parol. Iltimos, qayta urinib ko\'ring.');
      setPassword('');
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setError('');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 relative overflow-hidden flex items-center justify-center">
        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/25 to-cyan-300/25 rounded-full blur-3xl animate-bounce-slow" />
          <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/22 to-pink-300/22 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-gradient-to-br from-amber-400/18 to-orange-300/18 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Icon */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
            <Hammer className="h-12 w-12 text-white animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Biz hozir bu loyihani{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              qurayabmiz
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Tez orada maxsus yangiliklar bilan qaytamiz!
          </p>

          {/* Date Info */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 border-2 border-blue-200 rounded-full text-blue-700 font-semibold mb-8">
            <Clock className="h-5 w-5" />
            <span>Yanvar 2026 yilda ochiladi</span>
          </div>

          {/* Contact Info */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Biz bilan bog'lanish</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:yuldoshev.dsgn@gmail.com" 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>yuldoshev.dsgn@gmail.com</span>
              </a>
              <a 
                href="tel:+998930093785" 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+998 93 009 37 85</span>
              </a>
            </div>
          </div>

          {/* Access Button */}
          <button
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Key className="h-5 w-5" />
            <span>Landing pageni ko'rish</span>
          </button>

          {/* Small text */}
          <p className="mt-8 text-sm text-gray-500">
            © 2025 Lernis. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Modalni yopish"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Parol kiriting</h2>
              <p className="text-gray-600 text-sm">
                Landing pageni ko'rish uchun parol kiriting
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Parol
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Parolni kiriting"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {error && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomePage() {
  // State to control coming soon mode (can be unlocked with password)
  const [showComingSoon, setShowComingSoon] = useState(COMING_SOON_MODE);
  
  // All hooks must be called before any conditional returns
  const [searchId, setSearchId] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState<string | null>(null);
  const [waitlistStatus, setWaitlistStatus] = useState<'success' | 'error' | null>(null);

  // Debug: log when showComingSoon changes
  useEffect(() => {
    console.log('showComingSoon state:', showComingSoon);
  }, [showComingSoon]);

  const handleUnlock = () => {
    console.log('handleUnlock chaqirildi, showComingSoon false qilinmoqda...');
    setShowComingSoon(false);
  };

  // Show coming soon page if enabled
  if (showComingSoon) {
    return <ComingSoonPage onUnlock={handleUnlock} />;
  }

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waitlistEmail)) {
      setWaitlistSuccess('Iltimos, to\'g\'ri email kiriting.');
      return;
    }
    try {
      setWaitlistSubmitting(true);
      setWaitlistSuccess(null);
      // Firebase'ga saqlash
      try {
        const { waitlistService } = await import('../services/firebaseService');
        const id = await waitlistService.addWaitlistEntry({ email: waitlistEmail.trim(), source: 'landing_waitlist' });
        if (!id) throw new Error('Firebase save failed');
      } catch (fbErr) {
        // Fallback: localStorage
        const existing = JSON.parse(localStorage.getItem('lernis_waitlist') || '[]');
        const entry = { email: waitlistEmail.trim(), ts: new Date().toISOString() };
        localStorage.setItem('lernis_waitlist', JSON.stringify([entry, ...existing]));
      }
      setWaitlistStatus('success');
      setWaitlistSuccess('Rahmat! Ro\'yxatga qo\'shildingiz. Tez orada yangiliklar bilan bog\'lanamiz.');
      setWaitlistEmail('');
      setTimeout(() => { setWaitlistSuccess(null); setWaitlistStatus(null); }, 4000);
    } catch (err) {
      setWaitlistStatus('error');
      setWaitlistSuccess('Xatolik yuz berdi. Iltimos, keyinroq yana urinib ko\'ring.');
      setTimeout(() => { setWaitlistSuccess(null); setWaitlistStatus(null); }, 4000);
    } finally {
      setWaitlistSubmitting(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) {
      // Focus input field and add error styling
      const input = document.querySelector('input[placeholder="Enter Certificate ID"]') as HTMLInputElement;
      if (input) {
        input.focus();
        input.classList.add('border-red-500', 'ring-red-500');
        setTimeout(() => {
          input.classList.remove('border-red-500', 'ring-red-500');
        }, 2000);
      }
      return;
    }
    window.location.href = `/verify/${searchId.trim()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-purple-50/60" />
        
        {/* Floating orbs with enhanced animation */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/25 to-cyan-300/25 rounded-full blur-3xl animate-bounce-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-300/20 rounded-full blur-3xl animate-float-gentle" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-400/22 to-blue-300/22 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}} />
        <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/15 to-teal-300/15 rounded-full blur-3xl animate-spin-slow" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-br from-amber-400/18 to-orange-300/18 rounded-full blur-3xl animate-wiggle" style={{animationDelay: '3s'}} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-50/20" />
      </div>

      {/* Soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-16 sm:-top-40 sm:-left-32 w-[200px] h-[200px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-blue-400/25 to-purple-400/25 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 sm:-bottom-40 sm:-right-32 w-[250px] h-[250px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-br from-amber-300/20 to-blue-400/20 blur-3xl" />
      </div>

      {/* Navigation Header */}
      <Suspense fallback={<div className="h-16 bg-transparent" />}>
        <Navbar />
      </Suspense>

      {/* Split hero */}
      <section className="relative pt-16 sm:pt-20 lg:pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              {/* Left copy */}
              <div>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-600">RAQAMLI TA'LIM PLATFORMASI</p>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-extrabold tracking-tight text-gray-900">
                  Ta'lim <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">yutuqlaringiz</span> uchun
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> yagona platforma</span>
                </h1>
                <p className="mt-2 max-w-xl text-gray-600 text-sm sm:text-base">
                  LERNIS — hujjatlar, badge'lar, ilmiy ishlar va hamjamiyatni birlashtiruvchi raqamli ta'lim ekotizimi. Har bir talaba, o'qituvchi va universitet uchun to'liq portfolio, reyting va yutuqlar yarating.
                </p>

                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <Link to="/auth/register" className="inline-flex items-center gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                    Boshlash
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <button type="button" className="inline-flex items-center gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-white text-gray-900 border border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-lg hover:scale-105 hover:border-gray-300 transition-all duration-300 transform" aria-label="Mahsulot demosini ko'rish">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" /> Demoni ko'rish
                  </button>
                </div>

                <form onSubmit={handleSearch} className="mt-3 sm:mt-4 flex max-w-md rounded-3xl border-2 border-gray-200 bg-white/95 backdrop-blur-md p-1 shadow-lg hover:shadow-xl focus-within:border-blue-500 focus-within:shadow-blue-200 focus-within:scale-105 transition-all duration-300 transform">
                  <div className="flex-1 flex items-center px-2 sm:px-3 py-2 sm:py-2.5">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2 sm:mr-3" />
                    <input 
                      type="text" 
                      placeholder="Sertifikat ID raqamini kiriting" 
                      value={searchId} 
                      onChange={(e) => setSearchId(e.target.value)} 
                      className="flex-1 text-xs sm:text-sm outline-none bg-transparent placeholder-gray-500 text-gray-900" 
                      aria-label="Tekshiruv uchun sertifikat ID"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform"
                  >
                    <Search className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" /> 
                    Tekshirish
                  </button>
                </form>

                {/* Small trust row */}
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500/80 text-xs">
                  <div className="inline-flex items-center gap-1"><CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600"/>Ro‘yxatdan o‘tish shart emas</div>
                  <div className="inline-flex items-center gap-1"><Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600"/>Soxtalashtirishga qarshi</div>
                  <div className="inline-flex items-center gap-1"><QrCode className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-600"/>QR orqali tekshiruv</div>
                </div>
                <p className="mt-1 sm:mt-2 text-xs text-gray-500">Xavfsiz saqlash, tezkor qidiruv va qulay ulashish.</p>
              </div>

               {/* Right: Hero Image - Hidden on mobile */}
               <div className="hidden md:block relative flex items-center justify-center mt-6 sm:mt-8 lg:mt-0">
                 <div className="relative">
                   <img 
                    src="/images/NFT-hero.svg" 
                    alt="Lernis Digital Certificates" 
                     className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] h-[300px] md:h-[450px] lg:h-[550px] object-contain animate-float"
                     loading="eager"
                     decoding="async"
                     fetchPriority="high"
                   />
                   {/* Enhanced floating elements around the main image */}
                   <div className="absolute -top-4 -right-4 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce-slow shadow-lg"></div>
                   <div className="absolute -bottom-4 -left-4 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-float-gentle shadow-lg" style={{animationDelay: '1s'}}></div>
                   <div className="absolute top-1/2 -left-6 lg:-left-8 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-wiggle shadow-lg" style={{animationDelay: '2s'}}></div>
                 </div>
               </div>
            </div>

            {/* Space before next sections */}
            <div className="h-4 sm:h-6 lg:h-8" />
          </div>
        </section>

      {/* Trust Section */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Ta'lim hamjamiyatining markazi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Talabalar, o'qituvchilar va universitetlar bir platformada
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                number: "200+", 
                label: "Foydalanuvchilar",
                icon: <Users className="h-12 w-12" />,
                color: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
                shadowColor: "shadow-blue-500/20"
              },
              { 
                number: "200+", 
                label: "Hujjatlar",
                icon: <FileText className="h-12 w-12" />,
                color: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50",
                shadowColor: "shadow-green-500/20"
              },
              { 
                number: "10+", 
                label: "Badge'lar",
                icon: <Award className="h-12 w-12" />,
                color: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50",
                shadowColor: "shadow-purple-500/20"
              },
              { 
                number: "5+", 
                label: "Ilmiy ishlar",
                icon: <Database className="h-12 w-12" />,
                color: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                shadowColor: "shadow-orange-500/20"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4">
                  {/* Simple and clean icon container */}
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                      <div className="text-white">
                        {React.cloneElement(stat.icon, {
                          className: "h-8 w-8"
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Qanday ishlaydi
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Platforma qanday ishlaydi</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hujjatlar, badge'lar, ilmiy ishlar va hamjamiyat — barchasi bir joyda</p>
          </div>

          {/* Timeline Style */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
              {[
                {
                  step: "01",
                  title: "Ro'yxatdan o'tish",
                  description: "Muassasalar sertifikat ma’lumotlarini yuklaydi va brendlashadi",
                  icon: <Users className="h-6 w-6" />,
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-200"
                },
                {
                  step: "02", 
                  title: "Kontent yaratish",
                  description: "Hujjatlar yuklang, badge berish yoki ilmiy ish joylashtiring",
                  icon: <FileText className="h-6 w-6" />,
                  color: "from-purple-500 to-purple-600",
                  bgColor: "bg-purple-50",
                  borderColor: "border-purple-200"
                },
                {
                  step: "03",
                  title: "Faollik va reyting", 
                  description: "Badge oling, ilmiy ishlar yuklang va hamjamiyatda qatnashing",
                  icon: <Award className="h-6 w-6" />,
                  color: "from-pink-500 to-pink-600",
                  bgColor: "bg-pink-50",
                  borderColor: "border-pink-200"
                },
                {
                  step: "04",
                  title: "Portfolio yaratish", 
                  description: "Barcha yutuqlaringizni bir joyda to'plang va ulashing",
                  icon: <Globe className="h-6 w-6" />,
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-200"
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  {/* Step Circle */}
                  <div className="relative z-10 mx-auto lg:mx-0 w-16 h-16 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.step}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`${item.bgColor} ${item.borderColor} border rounded-2xl p-6 text-center lg:text-left group-hover:shadow-lg transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto lg:mx-0 mb-4 text-white`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Butun jarayon 5 daqiqadan kam vaqt oladi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-4">
              <Zap className="h-3 w-3" />
              Kuchli imkoniyatlar
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Platforma imkoniyatlari</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Lernis — hujjatlar, badge'lar, ilmiy ishlar va hamjamiyatni birlashtiruvchi to'liq raqamli ta'lim ekotizimi.</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <FileText className="h-5 w-5" />,
                title: "Raqamli hujjatlar",
                description: "Diplom, sertifikat va boshqa hujjatlarni xavfsiz saqlash va QR orqali tekshirish.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: <Award className="h-5 w-5" />,
                title: "Badge & Reward",
                description: "O'qituvchilar talabalarga badge beradi, reyting va motivatsiya tizimi.",
                gradient: "from-yellow-500 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50"
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: "Ilmiy ishlar",
                description: "Ilmiy ishlarni yuklash, review jarayoni va approval tracking.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Community & Forum",
                description: "Universitetlar uchun yopiq guruhlar, blog, feed va muloqot.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                icon: <Target className="h-5 w-5" />,
                title: "Reyting tizimi",
                description: "GPA, badge, ilmiy ishlar va faollik asosida reyting va leaderboard.",
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-50 to-blue-50"
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Zero-Knowledge xavfsizlik",
                description: "Client-side shifrlash, privacy levels va one-time sharing linklar.",
                gradient: "from-red-500 to-pink-500",
                bgGradient: "from-red-50 to-pink-50"
              },
              {
                icon: <QrCode className="h-5 w-5" />,
                title: "QR tekshiruv",
                description: "Har bir hujjat uchun unikal QR kod va tezkor verification.",
                gradient: "from-teal-500 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50"
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: "Portfolio profili",
                description: "Har bir foydalanuvchi uchun public portfolio va custom bio.",
                gradient: "from-violet-500 to-purple-500",
                bgGradient: "from-violet-50 to-purple-50"
              },
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Real-time bildirishnomalar",
                description: "Badge, sertifikat, ilmiy ish holati o'zgarishlari haqida xabarlar.",
                gradient: "from-amber-500 to-yellow-500",
                bgGradient: "from-amber-50 to-yellow-50"
              }
            ].map((feature, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.bgGradient} p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="user-roles" className="py-16 relative bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
              <Users className="h-4 w-4" />
              Foydalanuvchi rollari
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Har bir rol uchun maxsus imkoniyatlar</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Talaba, o'qituvchi, universitet va HR — barcha uchun yagona platforma</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Talaba / O'quvchi",
                icon: <GraduationCap className="h-8 w-8" />,
                description: "Hujjatlarini saqlaydi, badge oladi, ilmiy ish joylaydi",
                features: [
                  "Profil va portfolio",
                  "Hujjatlar saqlash",
                  "Badge olish",
                  "Ilmiy ish yuklash",
                  "Community qatnashish",
                  "Reyting ko'rish"
                ],
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                role: "O'qituvchi",
                icon: <Users className="h-8 w-8" />,
                description: "Talabalarni rag'batlantiradi, badge beradi, sertifikat yaratadi",
                features: [
                  "Badge yaratish",
                  "Talabalarga badge berish",
                  "Sertifikat yaratish",
                  "Feedback berish",
                  "Portfolio ko'rish",
                  "Statistika"
                ],
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                role: "Universitet / O'quv markaz",
                icon: <Award className="h-8 w-8" />,
                description: "O'quvchilar uchun sertifikat yaratadi, statistikani ko'radi",
                features: [
                  "Admin panel",
                  "Bulk sertifikat yuklash",
                  "Analytics va statistika",
                  "Talabalar boshqaruvi",
                  "Export funksiyalari",
                  "Verification requests"
                ],
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                role: "Ish beruvchi / HR",
                icon: <Shield className="h-8 w-8" />,
                description: "Diplom va sertifikatni tekshiradi",
                features: [
                  "QR verification",
                  "API orqali tekshirish",
                  "Hujjat haqiqiyligi",
                  "Tezkor tekshiruv",
                  "Bulk verification",
                  "Report generatsiya"
                ],
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50"
              }
            ].map((role, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${role.bgGradient} p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${role.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.role}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{role.description}</p>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className={`absolute inset-0 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Foydalanuvchilar fikri</h2>
                <p className="text-lg text-gray-600">Lernis’dan foydalanuvchi muassasalarning fikrlari</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-green-600">
                <Users className="h-5 w-5" />
                <span className="text-xs font-semibold">500+ muassasa ishonadi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Registrar, MIT",
                content: "EduNFT has revolutionized how we issue and verify certificates. The blockchain technology ensures our credentials are tamper-proof and globally recognized.",
                avatar: "SJ"
              },
              {
                name: "Prof. Ahmed Hassan",
                role: "Dean, University of Dubai",
                content: "The platform is incredibly user-friendly. Our students can now share their certificates instantly with employers worldwide.",
                avatar: "AH"
              },
              {
                name: "Lisa Chen",
                role: "HR Director, Google",
                content: "Verifying educational credentials has never been easier. We can instantly validate certificates from any institution using EduNFT.",
                avatar: "LC"
              }
            ].map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white/90 backdrop-blur border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-gray-900 text-base">{testimonial.name}</div>
                    <div className="text-gray-600 font-medium text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-6 items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 w-1.5 bg-orange-500 rounded-full"></div>
                <div className="h-1.5 w-1.5 bg-orange-400 rounded-full"></div>
                <div className="h-1.5 w-1.5 bg-orange-300 rounded-full"></div>
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider ml-3">Biz haqimizda</span>
              </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Lernis haqida</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  LERNIS — ta'lim tizimidagi barcha hujjatlarni (diplom, sertifikat, ilmiy ish, badge) raqamli, xavfsiz va tekshiriladigan shaklda saqlaydigan, talabalar, o'qituvchilar va universitetlarni birlashtiruvchi ijtimoiy o'quv platformasi.
                </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-40 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center">
                <Award className="h-12 w-12 text-orange-500 opacity-50" />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-5 w-5" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  Missiyamiz
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Har bir foydalanuvchining ta'limdagi to'liq portfolioga aylantirish: uning bilimlari, hujjatlari, yutuqlari va faolligi raqamli portfolioga aylanadi. Ta'lim yutuqlarini ishonchli, xavfsiz va global darajada tan olinadigan shaklda saqlash va ulashish.
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-5 w-5" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  Vizyonimiz
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Talaba va o'qituvchilar uchun yagona raqamli ta'lim muhiti. Nafaqat hujjatlarni saqlaydi, balki o'rganish, motivatsiya, muloqot va reytingni yagona tizimga birlashtiradi. Platformaning kuchi — ishonchlilik, qulaylik va hamjamiyatda.
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Xavfsizlik",
                description: "Audit izi, zaxira va rekvizitlar orqali hujjatlar yaxlitligi ta’minlanadi.",
                gradient: "from-red-500 to-pink-500",
                bgGradient: "from-red-50 to-pink-50"
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: "Kirish qulayligi",
                description: "24/7, istalgan joydan xavfsiz kirish va ulashish imkoniyati.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: "Shaffoflik",
                description: "Tekshirish jarayoni ochiq: kim, qachon, qaysi hujjatni ko‘rganini nazorat qiling.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Hamjamiyat",
                description: "Talabalar, o'qituvchilar va universitetlar uchun yagona platforma va muloqot muhiti.",
                gradient: "from-orange-500 to-amber-500",
                bgGradient: "from-orange-50 to-amber-50"
              }
            ].map((value, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${value.bgGradient} p-5 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className={`relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${value.gradient} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-semibold mb-4">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
              Tarif rejalar
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Har bir rol uchun mos narxlar</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Talabalar bepul, o'qituvchilar va universitetlar uchun qulay narxlar. Barcha funksiyalar bilan boshlang.</p>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Student Plan - Free */}
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-3">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Talaba</h3>
                <div className="text-3xl font-extrabold text-gray-900 mb-2">Bepul</div>
                <p className="text-gray-600">Barcha asosiy funksiyalar</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Cheksiz hujjatlar saqlash",
                  "Badge olish",
                  "Ilmiy ish yuklash",
                  "Community qatnashish",
                  "Portfolio yaratish",
                  "Reyting ko'rish",
                  "QR tekshiruv",
                  "Public profil"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/auth/register" className="w-full bg-gray-900 text-white rounded-full px-5 py-2.5 font-semibold hover:bg-black transition block text-center">
                Bepul boshlash
              </Link>
            </div>

            {/* Teacher Plan */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 shadow-2xl relative transform scale-105 group hover:scale-110 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">Eng ommabop</span>
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">O'qituvchi</h3>
                <div className="text-3xl font-extrabold text-white mb-2">$9</div>
                <p className="text-purple-100">oyiga</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Barcha Talaba funksiyalari",
                  "Badge yaratish va berish",
                  "Sertifikat yaratish",
                  "Talabalar boshqaruvi",
                  "Feedback berish",
                  "Statistika va analytics",
                  "Priority support",
                  "Custom branding"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                    <span className="text-purple-100 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-white text-gray-900 rounded-full px-5 py-2.5 font-semibold hover:bg-gray-100 transition">
                Sinovni boshlash
              </button>
            </div>
            
            {/* University Plan */}
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Universitet</h3>
                <div className="text-3xl font-extrabold text-gray-900 mb-2">$49</div>
                <p className="text-gray-600">oyiga</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Barcha O'qituvchi funksiyalari",
                  "Admin panel",
                  "Bulk sertifikat yuklash",
                  "Talabalar boshqaruvi",
                  "Advanced analytics",
                  "Export (CSV, XLSX)",
                  "Verification requests",
                  "Dedicated support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-gray-900 text-white rounded-full px-5 py-2.5 font-semibold hover:bg-black transition">
                Savdo bo'limiga murojaat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Yordam markazi</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Ko‘p so‘raladigan savollar</h2>
            <p className="text-lg text-gray-600 max-w-2xl">Lernis haqida bilishingiz kerak bo'lgan hamma narsa</p>
          </div>

           <div className="space-y-3">
             {[
               {
                 question: "Lernis nima?",
                 answer: "LERNIS — raqamli ta'lim platformasi bo'lib, hujjatlar, badge'lar, ilmiy ishlar va hamjamiyatni birlashtiradi. Har bir foydalanuvchi uchun to'liq portfolio, reyting va yutuqlar yaratadi."
               },
               {
                 question: "Qanday foydalanuvchi rollari mavjud?",
                 answer: "Platformada 4 ta asosiy rol bor: Talaba (hujjatlar saqlash, badge olish), O'qituvchi (badge berish, sertifikat yaratish), Universitet (admin panel, analytics), va HR (verification)."
               },
               {
                 question: "Badge tizimi qanday ishlaydi?",
                 answer: "O'qituvchilar talabalarga badge beradi, bu reytingga ta'sir qiladi. Badge'lar faollik, yutuqlar va ilmiy ishlar asosida beriladi va talaba profilida ko'rsatiladi."
               },
               {
                 question: "Ilmiy ishlar moduli qanday?",
                 answer: "Talabalar ilmiy ishlarni yuklaydi, keyin review jarayoni (plagiarism check, supervisor review, committee review) o'tkaziladi. Approval bo'lganda avtomatik sertifikat generatsiya qilinadi."
               },
               {
                 question: "Community va Forum qanday ishlaydi?",
                 answer: "Universitetlar uchun yopiq guruhlar, umumiy feed, blog yozish, like/comment/repost funksiyalari mavjud. Har bir postga faol foydalanuvchilar ball oladi."
               },
               {
                 question: "Reyting tizimi qanday hisoblanadi?",
                 answer: "Reyting GPA, badge'lar, ilmiy ishlar va faollik asosida hisoblanadi: TotalScore = (GPA * 10) + (Badges * 5) + (Approved Papers * 8) + (Activity * 2). Universitet, respublika va mintaqaviy reytinglar mavjud."
               },
               {
                 question: "Qanchalik xavfsiz?",
                 answer: "Zero-Knowledge model: client-side AES-256 shifrlash, privacy levels (Public/Private/Selective), one-time sharing linklar (24 soat), va audit izi. Hech kim ruxsatsiz o'zgartira olmaydi."
               },
               {
                 question: "Qanday boshlayman?",
                 answer: "Ro'yxatdan o'ting, rol tanlang (Talaba/O'qituvchi/Universitet), profilingizni to'ldiring va platforma imkoniyatlaridan foydalanishni boshlang."
               }
             ].map((faq, index) => (
               <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                 <button
                   onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                   className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                 >
                   <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                   <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}>
                     <svg 
                       className="w-4 h-4 text-gray-600" 
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                     >
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </div>
                 </button>
                 
                 <div className={`transition-all duration-300 ease-in-out ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="px-6 pb-6">
                     <div className="border-t border-gray-200 pt-4">
                       <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>


        {/* Get Started CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Tayyormisiz?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Lernis’dan foydalanayotgan minglab muassasalarga qo‘shiling. Bugun bepul sinovni boshlang.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 transition"
              >
                <GraduationCap className="h-5 w-5" />
                Bepul sinovni boshlash
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition"
              >
                <Play className="h-5 w-5" />
                Demo namuni ko‘rish
              </Link>
            </div>
          </div>
        </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Waitlist CTA */}
          <div className="mb-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border-2 border-purple-200 rounded-full text-purple-700 text-xs font-semibold mb-4">
                <div className="h-1.5 w-1.5 bg-purple-500 rounded-full"></div>
                Erta kirish ro‘yxati
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Waitlist’ga qo‘shiling</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">Dastlabki yangiliklar va dastlabki kirish haqida birinchi bo‘lib xabardor bo‘ling.</p>
            </div>
            <form onSubmit={handleJoinWaitlist} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email manzilingiz"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-label="Waitlist email"
              />
              <button
                type="submit"
                disabled={waitlistSubmitting}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-60"
              >
                {waitlistSubmitting ? 'Yuborilmoqda…' : 'Qo‘shilish'}
              </button>
            </form>
            {waitlistSuccess && (
              <div className={`max-w-xl mx-auto mt-3 rounded-lg border px-4 py-3 text-sm flex items-start gap-2 ${waitlistStatus === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                {waitlistStatus === 'success' ? (
                  <CheckCircle className="h-4 w-4 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                )}
                <span>{waitlistSuccess}</span>
              </div>
            )}
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-full text-blue-700 text-xs font-semibold mb-4">
              <Mail className="h-3 w-3" />
              <span>Biz bilan bog‘laning</span>
              <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
              <div className="h-1 w-1 bg-blue-300 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Biz bilan bog‘laning</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Savolingiz bormi? Xabar yuboring, imkon qadar tez javob beramiz.</p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                icon: <Mail className="h-5 w-5" />,
                title: "Email",
                description: "yuldoshev.dsgn@gmail.com",
                link: "mailto:yuldoshev.dsgn@gmail.com"
              },
              {
                icon: <Phone className="h-5 w-5" />,
                title: "Phone",
                description: "+998 93 009 3785",
                link: "tel:+930093785"
              },
              {
                icon: <MapPin className="h-5 w-5" />,
                title: "Address",
                description: "Tashkent, Uzbekistan",
                link: "#"
              },
              {
                icon: <Clock className="h-5 w-5" />,
                title: "Business Hours",
                description: "24/7",
                link: "#"
              }
            ].map((info, index) => (
              <div key={index} className="rounded-2xl bg-white/90 backdrop-blur border border-gray-200/50 p-5 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
                <div className="bg-blue-600/10 text-blue-600 p-2.5 rounded-lg w-10 h-10 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{info.title}</h3>
                <a 
                  href={info.link} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {info.description}
                </a>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
                <h3 className="text-xl font-extrabold mb-2">Boshlashda yordam kerakmi?</h3>
              <p className="text-blue-100 mb-4">
                Jamoamiz Lernis’ni muassasangizda joriy etishda yordam beradi
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-white text-gray-900 hover:bg-gray-100 transition"
                >
                  <Mail className="h-3 w-3" />
                  Savdo bo‘limiga murojaat
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  to="/schedule-demo"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition"
                >
                  <Play className="h-3 w-3" />
                  Demo uchun
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Suspense fallback={<div className="h-32 bg-gray-900" />}>
        <Footer />
      </Suspense>

    </div>
  );
}
