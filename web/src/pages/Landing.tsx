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
  Quote,
  TrendingUp,
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
const COMING_SOON_MODE = false;

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
  const [activeRole, setActiveRole] = useState('student');
  const [activePricingRole, setActivePricingRole] = useState('student');

  // Debug: log when showComingSoon changes
  useEffect(() => {
    console.log('showComingSoon state:', showComingSoon);
  }, [showComingSoon]);

  // Auto-scroll for testimonials carousel
  useEffect(() => {
    const carousel = document.querySelector('.testimonials-carousel') as HTMLElement;
    if (!carousel) return;

    let scrollInterval: ReturnType<typeof setInterval>;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel.dataset.paused === 'true') return;

        const scrollAmount = carousel.offsetWidth / 2 + 24; // Half width + gap
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        if (carousel.scrollLeft >= maxScroll) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 4000); // Every 4 seconds
    };

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

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
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 blur-[100px] animate-float-gentle" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-400/30 blur-[100px] animate-bounce-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-pink-400/30 blur-[100px] animate-wiggle" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[25%] h-[25%] rounded-full bg-cyan-400/30 blur-[100px] animate-spin-slow" style={{ animationDelay: '1s' }} />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      {/* Navigation Header */}
      <Suspense fallback={<div className="h-16 bg-transparent" />}>
        <Navbar />
      </Suspense>

      {/* Split hero */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left copy */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-blue-100 shadow-sm mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-bold text-blue-600 tracking-wide">RAQAMLI TA'LIM PLATFORMASI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-4 leading-tight">
                Ta'lim yutuqlaringiz <br className="hidden sm:block" />
                <span className="text-blue-600">Raqamli Dunyoda</span>
              </h1>

              <p className="mt-2 max-w-lg text-lg text-gray-600 leading-relaxed font-medium">
                Diplom, sertifikat va ilmiy ishlaringizni yagona ishonchli platformada saqlang va ulashing.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/auth/register" className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white bg-gray-900 shadow-lg hover:bg-black hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <span className="relative z-10">Boshlash</span>
                  <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <button type="button" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-3 w-3 text-blue-600 ml-0.5" fill="currentColor" />
                  </div>
                  <span>Demoni ko'rish</span>
                </button>
              </div>

              <div className="mt-6 relative max-w-md">
                <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-2xl border border-gray-200 p-1.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 group">
                  <div className="pl-3 pr-2 text-gray-400">
                    <Search className="h-5 w-5 group-focus-within:text-gray-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Sertifikat ID raqamini kiriting"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="flex-1 h-10 bg-transparent outline-none text-gray-900 placeholder-gray-500 font-medium text-sm"
                  />
                  <button
                    type="submit"
                    className="ml-2 rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all duration-300 active:scale-95"
                  >
                    Tekshirish
                  </button>
                </form>
              </div>

              {/* Trust Indicators - Minimalist */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span>Ro‘yxatdan o‘tish shart emas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-500" />
                  <span>Soxtalashtirishga qarshi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <QrCode className="h-3.5 w-3.5 text-purple-500" />
                  <span>QR orqali tekshiruv</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D Glass Elements */}
            <div className="hidden md:block relative h-[600px] w-full perspective-1000">
              {/* Main Certificate Card - Floating Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl p-6 animate-float z-20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      L
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-gray-800/10 rounded mb-1"></div>
                      <div className="h-2 w-16 bg-gray-800/10 rounded"></div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 w-3/4 bg-gray-800/10 rounded"></div>
                  <div className="h-4 w-full bg-gray-800/10 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-800/10 rounded"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                    ))}
                  </div>
                  <div className="px-4 py-1.5 bg-blue-600 text-white text-xs rounded-full font-medium">
                    Verified
                  </div>
                </div>
              </div>

              {/* Badge Card - Floating Top Right */}
              <div className="absolute top-20 right-10 w-48 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl p-4 animate-bounce-slow z-10" style={{ animationDelay: '1s' }}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-3 flex items-center justify-center shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="font-bold text-gray-800 text-sm">Top Student</div>
                  <div className="text-xs text-gray-600">Spring 2024</div>
                </div>
              </div>

              {/* Stats Card - Floating Bottom Left */}
              <div className="absolute bottom-32 left-0 w-56 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl p-4 animate-float-gentle z-30" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Score</div>
                    <div className="font-bold text-gray-900">2,450 XP</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className="bg-purple-600 h-1.5 rounded-full w-[75%]"></div>
                </div>
                <div className="text-right text-[10px] text-gray-500">Top 5%</div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-10 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
                icon: <Users className="h-8 w-8" />,
                color: "from-blue-500 to-cyan-500",
                bgClass: "bg-blue-50/50"
              },
              {
                number: "200+",
                label: "Hujjatlar",
                icon: <FileText className="h-8 w-8" />,
                color: "from-green-500 to-emerald-500",
                bgClass: "bg-green-50/50"
              },
              {
                number: "10+",
                label: "Badge'lar",
                icon: <Award className="h-8 w-8" />,
                color: "from-purple-500 to-pink-500",
                bgClass: "bg-purple-50/50"
              },
              {
                number: "5+",
                label: "Ilmiy ishlar",
                icon: <Database className="h-8 w-8" />,
                color: "from-orange-500 to-red-500",
                bgClass: "bg-orange-50/50"
              }
            ].map((stat, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-3xl ${stat.bgClass} backdrop-blur-md border border-white/60 p-6 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-xl`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
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

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                step: "01",
                title: "Ro'yxatdan o'tish",
                description: "Muassasalar sertifikat ma’lumotlarini yuklaydi va brendlashadi",
                icon: <Users className="h-6 w-6" />,
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50/50",
                border: "border-blue-100"
              },
              {
                step: "02",
                title: "Kontent yaratish",
                description: "Hujjatlar yuklang, badge berish yoki ilmiy ish joylashtiring",
                icon: <FileText className="h-6 w-6" />,
                gradient: "from-purple-500 to-pink-500",
                bg: "bg-purple-50/50",
                border: "border-purple-100"
              },
              {
                step: "03",
                title: "Faollik va reyting",
                description: "Badge oling, ilmiy ishlar yuklang va hamjamiyatda qatnashing",
                icon: <Award className="h-6 w-6" />,
                gradient: "from-orange-500 to-red-500",
                bg: "bg-orange-50/50",
                border: "border-orange-100"
              },
              {
                step: "04",
                title: "Portfolio yaratish",
                description: "Barcha yutuqlaringizni bir joyda to'plang va ulashing",
                icon: <Globe className="h-6 w-6" />,
                gradient: "from-green-500 to-emerald-500",
                bg: "bg-green-50/50",
                border: "border-green-100"
              }
            ].map((item, index) => (
              <div key={index} className={`relative group overflow-hidden rounded-3xl p-8 ${item.bg} backdrop-blur-md border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                {/* Background Glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`} />

                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <span className={`text-5xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300 select-none`}>
                    {item.step}
                  </span>
                </div>

                <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="relative z-10 text-gray-600 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Platforma imkoniyatlari</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">Lernis — hujjatlar, badge'lar, ilmiy ishlar va hamjamiyatni birlashtiruvchi to'liq raqamli ta'lim ekotizimi.</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            {/* Research Hub - Large */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-xl border border-purple-100/50 p-8 hover:shadow-xl transition-all duration-300 hover:border-purple-200">
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Research Hub</h3>
                <p className="text-gray-600 leading-relaxed font-medium max-w-md text-lg">
                  Ilmiy ishlaringizni xalqaro darajada chop eting, DOI oling va iqtiboslar to'plang. Global ilmiy bazaga ulaning.
                </p>

                {/* Mini UI: Document Stack */}
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-64 h-64 opacity-60 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                  <div className="absolute top-0 right-10 w-40 h-52 bg-white rounded-xl shadow-xl border border-purple-100 transform rotate-[-6deg] z-10 p-4">
                    <div className="w-full h-2 bg-purple-50 rounded mb-2"></div>
                    <div className="w-3/4 h-2 bg-purple-50 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-gray-50 rounded"></div>
                      <div className="w-full h-1.5 bg-gray-50 rounded"></div>
                      <div className="w-5/6 h-1.5 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-40 h-52 bg-purple-100 rounded-xl shadow-lg transform rotate-[6deg] z-0 border border-purple-200"></div>
                </div>
              </div>
            </div>

            {/* Gamification - Tall */}
            <div className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-xl border border-orange-100/50 p-8 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-orange-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Gamification</h3>
                <p className="text-gray-600 leading-relaxed font-medium mb-8">
                  O'qish jarayonini qiziqarli o'yinga aylantiring. Badge'lar to'plang.
                </p>

                {/* Mini UI: Badges */}
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur rounded-xl border border-orange-100 shadow-sm transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-xs font-bold border border-yellow-200">1</div>
                    <div className="text-sm font-bold text-gray-800">Top Student</div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur rounded-xl border border-orange-100 shadow-sm transform translate-x-8 group-hover:translate-x-0 transition-transform duration-300 delay-75">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold border border-blue-200">2</div>
                    <div className="text-sm font-bold text-gray-800">Research Pro</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Community - Wide */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-xl border border-green-100/50 p-8 hover:shadow-xl transition-all duration-300 hover:border-green-200">
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-green-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Global Hamjamiyat</h3>
                  <p className="text-gray-600 font-medium text-lg">
                    Dunyo bo'ylab talabalar va ekspertlar bilan fikr almashing.
                  </p>
                </div>

                {/* Mini UI: Chat Bubbles */}
                <div className="relative w-full md:w-1/3 h-24">
                  <div className="absolute top-0 right-0 bg-white p-3 rounded-t-2xl rounded-bl-2xl shadow-sm border border-green-100 text-xs text-gray-600 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Salom! Loyihangiz ajoyib ekan 👋
                  </div>
                  <div className="absolute bottom-0 left-4 bg-green-100 p-3 rounded-t-2xl rounded-br-2xl shadow-sm border border-green-200 text-xs text-green-800 transform group-hover:translate-y-1 transition-transform duration-300">
                    Rahmat! Hamkorlik qilamizmi?
                  </div>
                </div>
              </div>
            </div>

            {/* Small Cards Grid */}
            <div className="md:col-span-1 grid grid-cols-1 gap-6">
              {/* Digital Docs */}
              <div className="group p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-xl border border-blue-100/50 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <FileText className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Raqamli hujjatlar</h3>
                <p className="text-sm text-gray-600 font-medium">Diplom va sertifikatlarni xavfsiz saqlash.</p>
              </div>
            </div>

            {/* Rating System */}
            <div className="md:col-span-1 group p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-blue-50/80 backdrop-blur-xl border border-indigo-100/50 hover:shadow-lg transition-all duration-300 hover:border-indigo-200">
              <Target className="h-8 w-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-gray-900 mb-1 text-lg">Reyting tizimi</h3>
              <p className="text-sm text-gray-600 font-medium">GPA va faollik asosida reyting.</p>
            </div>

            {/* Security */}
            <div className="md:col-span-1 group p-6 rounded-3xl bg-gradient-to-br from-red-50/80 to-pink-50/80 backdrop-blur-xl border border-red-100/50 hover:shadow-lg transition-all duration-300 hover:border-red-200">
              <Shield className="h-8 w-8 text-red-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-gray-900 mb-1 text-lg">Xavfsizlik</h3>
              <p className="text-sm text-gray-600 font-medium">Zero-Knowledge shifrlash.</p>
            </div>

            {/* QR Check */}
            <div className="md:col-span-1 group p-6 rounded-3xl bg-gradient-to-br from-teal-50/80 to-emerald-50/80 backdrop-blur-xl border border-teal-100/50 hover:shadow-lg transition-all duration-300 hover:border-teal-200">
              <QrCode className="h-8 w-8 text-teal-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-gray-900 mb-1 text-lg">QR tekshiruv</h3>
              <p className="text-sm text-gray-600 font-medium">Tezkor verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section - Interactive Tabs */}
      <section id="user-roles" className="py-12 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold mb-4">
              <Users className="h-3 w-3" />
              Foydalanuvchi rollari
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">Har bir rol uchun maxsus imkoniyatlar</h2>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'student', label: "Talaba", icon: <GraduationCap className="h-4 w-4" /> },
              { id: 'teacher', label: "O'qituvchi", icon: <Users className="h-4 w-4" /> },
              { id: 'university', label: "Universitet", icon: <Award className="h-4 w-4" /> },
              { id: 'hr', label: "HR", icon: <Shield className="h-4 w-4" /> },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${activeRole === role.id
                  ? 'bg-gray-900 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                {role.icon}
                {role.label}
              </button>
            ))}
          </div>

          {/* Role Content Area */}
          <div className="relative min-h-[400px]">
            {[
              {
                id: 'student',
                role: "Talaba / O'quvchi",
                description: "Hujjatlaringizni raqamlashtiring va kelajak karyerangizni quring.",
                features: [
                  "Barcha diplom va sertifikatlar bir joyda",
                  "Xalqaro darajadagi raqamli portfolio",
                  "Reyting va yutuqlar (Gamification)",
                  "Ilmiy ishlarni chop etish (DOI)"
                ],
                imageGradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50/50 to-cyan-50/50",
                mainIcon: <GraduationCap className="h-24 w-24 text-white opacity-90" />
              },
              {
                id: 'teacher',
                role: "O'qituvchi",
                description: "Talabalarni rag'batlantiring va professional brendingizni rivojlantiring.",
                features: [
                  "Talabalarga badge va sertifikat berish",
                  "Guruhlar va kurslarni boshqarish",
                  "Talabalar reytingini kuzatish",
                  "Ilmiy ishlarga taqriz yozish"
                ],
                imageGradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50/50 to-pink-50/50",
                mainIcon: <Users className="h-24 w-24 text-white opacity-90" />
              },
              {
                id: 'university',
                role: "Universitet / O'quv markaz",
                description: "Ta'lim jarayonini raqamlashtiring va muassasa nufuzini oshiring.",
                features: [
                  "Avtomatlashtirilgan sertifikatlash tizimi",
                  "Kengaytirilgan statistika va analytics",
                  "Bitiruvchilar monitoringi",
                  "Xalqaro hamkorlik imkoniyatlari"
                ],
                imageGradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50/50 to-emerald-50/50",
                mainIcon: <Award className="h-24 w-24 text-white opacity-90" />
              },
              {
                id: 'hr',
                role: "Ish beruvchi / HR",
                description: "Nomzodlarning malakasini tezkor va ishonchli tekshiring.",
                features: [
                  "QR kod orqali tezkor tekshiruv",
                  "Soxtalashtirishdan 100% himoya",
                  "Tasdiqlangan ko'nikmalar bazasi",
                  "Nomzodning to'liq portfoliosini ko'rish"
                ],
                imageGradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50/50 to-red-50/50",
                mainIcon: <Shield className="h-24 w-24 text-white opacity-90" />
              }
            ].map((role) => (
              <div
                key={role.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${activeRole === role.id ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 z-0 pointer-events-none'
                  }`}
              >
                <div className={`rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl overflow-hidden`}>
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left: Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <div className={`inline-flex items-center gap-2 mb-4`}>
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${role.imageGradient} text-white shadow-sm`}>
                          {role.id === 'student' && <GraduationCap className="h-4 w-4" />}
                          {role.id === 'teacher' && <Users className="h-4 w-4" />}
                          {role.id === 'university' && <Award className="h-4 w-4" />}
                          {role.id === 'hr' && <Shield className="h-4 w-4" />}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${role.imageGradient} bg-clip-text text-transparent`}>
                          {role.role}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                        {role.description}
                      </h3>

                      <ul className="space-y-3 mb-6">
                        {role.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className={`h-4 w-4 flex-shrink-0 text-gray-400`} />
                            <span className="text-gray-700 font-medium text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className={`w-fit px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}>
                        Batafsil
                      </button>
                    </div>

                    {/* Right: Visual */}
                    <div className={`bg-gradient-to-br ${role.bgGradient} p-8 flex items-center justify-center relative overflow-hidden`}>
                      {/* Abstract Shapes */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

                      {/* Main Icon */}
                      <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 drop-shadow-xl">
                        <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${role.imageGradient} flex items-center justify-center shadow-2xl`}>
                          {role.mainIcon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel */}
      <section id="testimonials" className="py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header with Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-semibold mb-3">
              <CheckCircle className="h-3 w-3" />
              Ishonch
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">Foydalanuvchilar fikri</h2>

            {/* Trust Counter */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">T</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">N</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">S</div>
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-gray-900">500+</div>
                <div className="text-xs text-gray-600 font-medium">Muassasa ishonadi</div>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Testimonials - Horizontal Scroll with Auto-scroll */}
            <div
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide testimonials-carousel"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.dataset.paused = 'true';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.dataset.paused = 'false';
              }}
            >
              {[
                {
                  name: "Prof. Aziza Rahimova",
                  role: "Rektor o'rinbosari",
                  institution: "TATU",
                  content: "Lernis platformasi orqali talabalarimizning barcha yutuqlarini bir joyda kuzatish va ularga raqamli sertifikatlar berish jarayoni juda soddalashdi. Xalqaro hamkorlarimiz ham platformani yuqori baholashmoqda.",
                  logoGradient: "from-blue-500 to-cyan-500",
                  logoBg: "bg-blue-50/80",
                  logoText: "TATU"
                },
                {
                  name: "Dr. Jamshid Karimov",
                  role: "Kafedra mudiri",
                  institution: "O'zMU",
                  content: "Talabalar endi o'z diplomlari va sertifikatlarini osongina ulashishlari mumkin. Blockchain texnologiyasi hujjatlarning haqiqiyligini kafolatlaydi. Bu katta yutuq!",
                  logoGradient: "from-green-500 to-emerald-500",
                  logoBg: "bg-green-50/80",
                  logoText: "O'zMU"
                },
                {
                  name: "Dilnoza Abdullayeva",
                  role: "Kadrlar bo'limi boshlig'i",
                  institution: "Uzum",
                  content: "Nomzodlarning hujjatlarini tekshirish endi bir necha soniya ichida amalga oshadi. QR kod orqali barcha ma'lumotlarni ko'rishimiz mumkin. Vaqt va resurslarni ancha tejadik.",
                  logoGradient: "from-purple-500 to-pink-500",
                  logoBg: "bg-purple-50/80",
                  logoText: "Uzum"
                },
                {
                  name: "Sardor Toshmatov",
                  role: "Talaba",
                  institution: "TDIU",
                  content: "Barcha sertifikatlarim bir joyda! Portfolio yaratish va ish beruvchilarga ko'rsatish juda qulay. Ilmiy ishlarimni ham platformaga joylashtirdim va DOI oldim.",
                  logoGradient: "from-orange-500 to-red-500",
                  logoBg: "bg-orange-50/80",
                  logoText: "TDIU"
                },
                {
                  name: "Prof. Nodira Yusupova",
                  role: "Ilmiy ishlar bo'limi",
                  institution: "SamDU",
                  content: "Ilmiy ishlarni chop etish va ularga DOI berish jarayoni juda tez va qulay. Talabalarimiz xalqaro darajada tan olingan platformada o'z ishlarini e'lon qilishlari mumkin.",
                  logoGradient: "from-indigo-500 to-blue-500",
                  logoBg: "bg-indigo-50/80",
                  logoText: "SamDU"
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-start">
                  <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 p-6 h-full">
                    {/* Gradient Glow on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.logoGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Institution Logo */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl ${testimonial.logoBg} backdrop-blur-xl flex items-center justify-center shadow-sm border border-white/40 group-hover:scale-110 transition-transform duration-300`}>
                          <span className={`text-lg font-black bg-gradient-to-br ${testimonial.logoGradient} bg-clip-text text-transparent`}>
                            {testimonial.logoText}
                          </span>
                        </div>
                        <Quote className="h-8 w-8 text-gray-200 group-hover:text-gray-300 transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <p className="text-gray-600 italic mb-6 leading-relaxed text-sm flex-grow">"{testimonial.content}"</p>

                      {/* Author Info */}
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{testimonial.role}, {testimonial.institution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Hint */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                <span>Avtomatik scroll</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full text-orange-700 text-xs font-semibold mb-3">
              <Award className="h-3 w-3" />
              Biz haqimizda
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Lernis haqida</h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
              LERNIS — ta'lim tizimidagi barcha hujjatlarni raqamli, xavfsiz va tekshiriladigan shaklda saqlaydigan platforma.
            </p>
          </div>

          {/* Mission & Vision - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Missiyamiz</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Har bir foydalanuvchining ta'limdagi yutuqlarini raqamli portfolioga aylantirish va global darajada tan olinadigan shaklda saqlash.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Vizyonimiz</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Talaba va o'qituvchilar uchun yagona raqamli ta'lim muhiti. O'rganish, motivatsiya va muloqotni birlashtiruvchi platforma.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values - 4 Column Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Xavfsizlik",
                description: "Himoyalangan saqlash",
                gradient: "from-red-500 to-pink-500",
                iconBg: "bg-gradient-to-br from-red-500 to-pink-500"
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Global Kirish",
                description: "24/7 istalgan joydan",
                gradient: "from-green-500 to-emerald-500",
                iconBg: "bg-gradient-to-br from-green-500 to-emerald-500"
              },
              {
                icon: <Database className="h-6 w-6" />,
                title: "Shaffoflik",
                description: "Ochiq tekshirish",
                gradient: "from-blue-500 to-cyan-500",
                iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Hamjamiyat",
                description: "Yagona muhit",
                gradient: "from-orange-500 to-amber-500",
                iconBg: "bg-gradient-to-br from-orange-500 to-amber-500"
              }
            ].map((value, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 rounded-xl ${value.iconBg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 text-white shadow-md`}>
                    {value.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{value.title}</h4>
                  <p className="text-xs text-gray-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Role-Based Tabs */}
      <section id="pricing" className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-semibold mb-3">
              <Zap className="h-3 w-3" />
              Tarif rejalar
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Har bir rol uchun mos narxlar</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto font-medium">Barcha funksiyalar bilan boshlang. Istalgan vaqtda bekor qiling.</p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'student', label: "Talaba", icon: <GraduationCap className="h-4 w-4" /> },
              { id: 'teacher', label: "O'qituvchi", icon: <Users className="h-4 w-4" /> },
              { id: 'university', label: "Universitet", icon: <Award className="h-4 w-4" /> },
              { id: 'hr', label: "HR", icon: <Shield className="h-4 w-4" /> },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setActivePricingRole(role.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${activePricingRole === role.id
                  ? 'bg-gray-900 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                {role.icon}
                {role.label}
              </button>
            ))}
          </div>

          {/* Pricing Cards Container */}
          <div className="relative min-h-[600px]">
            {/* Student Pricing */}
            <div className={`absolute inset-0 transition-all duration-500 ${activePricingRole === 'student' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Freemium",
                    price: "Bepul",
                    period: "Abadiy",
                    description: "Asosiy funksiyalar",
                    features: ["Hujjatlar saqlash", "Badge olish", "Portfolio", "Public profil", "Community"],
                    cta: "Boshlash",
                    highlighted: false
                  },
                  {
                    name: "Pro",
                    price: "25,000",
                    period: "oyiga",
                    description: "Kengaytirilgan imkoniyatlar",
                    features: ["Barcha Freemium", "Ilmiy ish yuklash", "DOI olish", "Advanced analytics", "Priority support"],
                    cta: "Sinov boshlash",
                    highlighted: true
                  },
                  {
                    name: "Premium",
                    price: "60,000",
                    period: "oyiga",
                    description: "Maksimal imkoniyatlar",
                    features: ["Barcha Pro", "Cheksiz ilmiy ishlar", "Custom domain", "Verified badge", "1-on-1 mentorship"],
                    cta: "Sinov boshlash",
                    highlighted: false
                  }
                ].map((plan, idx) => (
                  <div key={idx} className={`relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl scale-105'
                    : 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl'
                    }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">Tavsiya etiladi</span>
                      </div>
                    )}
                    <div className={`text-center mb-6 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        {plan.price === "Bepul" || plan.price === "Maxsus" ? (
                          <span className="text-4xl font-black">{plan.price}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className="text-lg font-semibold ml-1">so'm</span>
                          </>
                        )}
                      </div>
                      <p className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{plan.period}</p>
                      <p className={`text-xs mt-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-600'}`} />
                          <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gray-900 text-white hover:bg-black'
                      }`}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Pricing */}
            <div className={`absolute inset-0 transition-all duration-500 ${activePricingRole === 'teacher' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Freemium",
                    price: "Bepul",
                    period: "Abadiy",
                    description: "Asosiy o'qituvchi funksiyalari",
                    features: ["5 tagacha badge", "10 tagacha talaba", "Asosiy statistika", "Community"],
                    cta: "Boshlash",
                    highlighted: false
                  },
                  {
                    name: "Pro",
                    price: "110,000",
                    period: "oyiga",
                    description: "Professional o'qituvchi",
                    features: ["Cheksiz badge", "100 tagacha talaba", "Sertifikat yaratish", "Advanced analytics", "Priority support"],
                    cta: "Sinov boshlash",
                    highlighted: true
                  },
                  {
                    name: "Enterprise",
                    price: "360,000",
                    period: "oyiga",
                    description: "Katta guruhlar uchun",
                    features: ["Cheksiz talaba", "Custom branding", "API access", "Dedicated support", "Team collaboration"],
                    cta: "Bog'lanish",
                    highlighted: false
                  }
                ].map((plan, idx) => (
                  <div key={idx} className={`relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl scale-105'
                    : 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl'
                    }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">Eng ommabop</span>
                      </div>
                    )}
                    <div className={`text-center mb-6 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        {plan.price === "Bepul" || plan.price === "Maxsus" ? (
                          <span className="text-4xl font-black">{plan.price}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className="text-lg font-semibold ml-1">so'm</span>
                          </>
                        )}
                      </div>
                      <p className={`text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-500'}`}>{plan.period}</p>
                      <p className={`text-xs mt-2 ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-purple-200' : 'text-green-600'}`} />
                          <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${plan.highlighted
                      ? 'bg-white text-purple-600 hover:bg-purple-50'
                      : 'bg-gray-900 text-white hover:bg-black'
                      }`}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* University Pricing */}
            <div className={`absolute inset-0 transition-all duration-500 ${activePricingRole === 'university' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Starter",
                    price: "600,000",
                    period: "oyiga",
                    description: "Kichik universitetlar",
                    features: ["500 tagacha talaba", "Admin panel", "Bulk upload", "Basic analytics", "Email support"],
                    cta: "Sinov boshlash",
                    highlighted: false
                  },
                  {
                    name: "Professional",
                    price: "1,850,000",
                    period: "oyiga",
                    description: "O'rta universitetlar",
                    features: ["5000 tagacha talaba", "Advanced analytics", "API access", "Custom branding", "Priority support"],
                    cta: "Sinov boshlash",
                    highlighted: true
                  },
                  {
                    name: "Enterprise",
                    price: "Maxsus",
                    period: "Shartnoma asosida",
                    description: "Katta universitetlar",
                    features: ["Cheksiz talaba", "Dedicated server", "Custom features", "24/7 support", "SLA guarantee"],
                    cta: "Savdo bo'limiga",
                    highlighted: false
                  }
                ].map((plan, idx) => (
                  <div key={idx} className={`relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                    ? 'bg-gradient-to-br from-green-600 to-emerald-600 shadow-2xl scale-105'
                    : 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl'
                    }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">Tavsiya etiladi</span>
                      </div>
                    )}
                    <div className={`text-center mb-6 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        {plan.price === "Bepul" || plan.price === "Maxsus" ? (
                          <span className="text-4xl font-black">{plan.price}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className="text-lg font-semibold ml-1">so'm</span>
                          </>
                        )}
                      </div>
                      <p className={`text-sm ${plan.highlighted ? 'text-green-100' : 'text-gray-500'}`}>{plan.period}</p>
                      <p className={`text-xs mt-2 ${plan.highlighted ? 'text-green-100' : 'text-gray-600'}`}>{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-green-200' : 'text-green-600'}`} />
                          <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${plan.highlighted
                      ? 'bg-white text-green-600 hover:bg-green-50'
                      : 'bg-gray-900 text-white hover:bg-black'
                      }`}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* HR Pricing */}
            <div className={`absolute inset-0 transition-all duration-500 ${activePricingRole === 'hr' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Basic",
                    price: "240,000",
                    period: "oyiga",
                    description: "Kichik kompaniyalar",
                    features: ["50 tagacha tekshiruv", "QR verification", "Basic reports", "Email support"],
                    cta: "Sinov boshlash",
                    highlighted: false
                  },
                  {
                    name: "Professional",
                    price: "600,000",
                    period: "oyiga",
                    description: "O'rta kompaniyalar",
                    features: ["500 tagacha tekshiruv", "API access", "Advanced reports", "Bulk verification", "Priority support"],
                    cta: "Sinov boshlash",
                    highlighted: true
                  },
                  {
                    name: "Enterprise",
                    price: "2,500,000",
                    period: "oyiga",
                    description: "Katta kompaniyalar",
                    features: ["Cheksiz tekshiruv", "Dedicated API", "Custom integration", "24/7 support", "SLA guarantee"],
                    cta: "Savdo bo'limiga",
                    highlighted: false
                  }
                ].map((plan, idx) => (
                  <div key={idx} className={`relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                    ? 'bg-gradient-to-br from-orange-600 to-red-600 shadow-2xl scale-105'
                    : 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl'
                    }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">Tavsiya etiladi</span>
                      </div>
                    )}
                    <div className={`text-center mb-6 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        {plan.price === "Bepul" || plan.price === "Maxsus" ? (
                          <span className="text-4xl font-black">{plan.price}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className="text-lg font-semibold ml-1">so'm</span>
                          </>
                        )}
                      </div>
                      <p className={`text-sm ${plan.highlighted ? 'text-orange-100' : 'text-gray-500'}`}>{plan.period}</p>
                      <p className={`text-xs mt-2 ${plan.highlighted ? 'text-orange-100' : 'text-gray-600'}`}>{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-orange-200' : 'text-green-600'}`} />
                          <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${plan.highlighted
                      ? 'bg-white text-orange-600 hover:bg-orange-50'
                      : 'bg-gray-900 text-white hover:bg-black'
                      }`}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-xs font-semibold mb-3">
              <FileText className="h-3 w-3" />
              Yordam markazi
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Ko'p so'raladigan savollar</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">Lernis haqida bilishingiz kerak bo'lgan hamma narsa</p>
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
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white/40 overflow-hidden hover:shadow-lg transition-all duration-300">
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
      <section className="py-16 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        {/* Subtle Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Tayyormisiz?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto">
            Lernis'dan foydalanayotgan minglab muassasalarga qo'shiling. Bugun bepul sinovni boshlang.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/register"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <GraduationCap className="h-5 w-5" />
              Bepul sinovni boshlash
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold border-2 border-white/80 text-white hover:bg-white hover:text-purple-600 transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="h-5 w-5" />
              Demo namuni ko'rish
            </Link>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="contact" className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Waitlist Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 md:p-12">
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-xs font-semibold mb-4">
                <div className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                Erta kirish ro'yxati
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">Waitlist'ga qo'shiling</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 font-medium">
                Dastlabki yangiliklar va erta kirish haqida birinchi bo'lib xabardor bo'ling.
              </p>

              {/* Form */}
              <form onSubmit={handleJoinWaitlist} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium placeholder:text-gray-400"
                    aria-label="Waitlist email"
                  />
                  <button
                    type="submit"
                    disabled={waitlistSubmitting}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 disabled:opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
                  >
                    {waitlistSubmitting ? 'Yuborilmoqda…' : 'Qo\'shilish'}
                  </button>
                </div>
              </form>

              {/* Success/Error Message */}
              {waitlistSuccess && (
                <div className={`max-w-md mx-auto mt-4 rounded-2xl border px-4 py-3 text-sm flex items-start gap-2 ${waitlistStatus === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
                  }`}>
                  {waitlistStatus === 'success' ? (
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="font-medium">{waitlistSuccess}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold mb-3">
              <Mail className="h-3 w-3" />
              Biz bilan bog'laning
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Aloqa ma'lumotlari</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">Savolingiz bormi? Biz bilan bog'laning</p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: <Mail className="h-5 w-5" />,
                title: "Email",
                description: "yuldoshev.dsgn@gmail.com",
                link: "mailto:yuldoshev.dsgn@gmail.com",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Phone className="h-5 w-5" />,
                title: "Telefon",
                description: "+998 93 009 3785",
                link: "tel:+998930093785",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <MapPin className="h-5 w-5" />,
                title: "Manzil",
                description: "Toshkent, O'zbekiston",
                link: "#",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Clock className="h-5 w-5" />,
                title: "Ish vaqti",
                description: "24/7",
                link: "#",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((info, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mx-auto mb-4 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{info.title}</h3>
                  <a
                    href={info.link}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    {info.description}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-xl md:text-2xl font-black mb-3">Boshlashda yordam kerakmi?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto font-medium">
                Jamoamiz Lernis'ni muassasangizda joriy etishda yordam beradi
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  Savdo bo'limiga murojaat
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/schedule-demo"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold border-2 border-white/80 text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  <Play className="h-4 w-4" />
                  Demo uchun
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      < Suspense fallback={< div className="h-32 bg-gray-900" />}>
        <Footer />
      </Suspense >

    </div >
  );
}
