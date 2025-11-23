import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Home, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, loginWithGoogle, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Iltimos, barcha maydonlarni to\'ldiring');
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } catch (err: any) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Email yoki parol noto\'g\'ri');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Juda ko\'p urinishlar. Keyinroq qayta urinib ko\'ring');
            } else {
                setError('Kirish amalga oshmadi. Qayta urinib ko\'ring');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsLoading(true);
        try {
            await loginWithGoogle();
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            setError('Google orqali kirish amalga oshmadi');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Container */}
            <div className="w-full max-w-6xl relative z-10">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden flex flex-col md:flex-row">
                    {/* Left Side - Form */}
                    <div className="w-full md:w-1/2 p-5 lg:p-4">
                        {/* Header */}
                        <div className="mb-4 lg:mb-3">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold mb-4 hover:bg-blue-100 transition-colors group"
                            >
                                <Home className="h-3 w-3" />
                                Bosh sahifaga qaytish
                            </Link>
                            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Tizimga kirish</h1>
                            <p className="text-gray-600 font-medium">O'z hisobingizga kiring va o'qishni davom ettiring</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-3">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Email manzil</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300 font-medium"
                                        placeholder="email@example.com"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Parol</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300 font-medium"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">Eslab qolish</span>
                                </label>
                                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                    Parolni unutdingizmi?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] group"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Kirish amalga oshirilmoqda...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Kirish</span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-4 bg-white text-gray-500 font-semibold">yoki</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 font-semibold text-gray-700 hover:text-gray-900 group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Google orqali kirish</span>
                        </button>

                        {/* Sign Up Link */}
                        <p className="mt-8 text-center text-sm text-gray-600 font-medium">
                            Hisobingiz yo'qmi?{' '}
                            <Link to="/auth/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                Ro'yxatdan o'tish
                            </Link>
                        </p>
                    </div>

                    {/* Right Side - Feature Showcase */}
                    <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden p-12">
                        {/* Animated Gradient Orbs */}
                        <div className="absolute inset-0">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            <div className="mb-4 lg:mb-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-semibold mb-6">
                                    <Sparkles className="h-3 w-3" />
                                    Premium ta'lim platformasi
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Lernis bilan o'rganing</h2>
                                <p className="text-lg text-blue-100 font-medium leading-relaxed">
                                    Global darajadagi ta'lim platformasi. Sertifikatlar, tadqiqotlar va ta'lim sayohatingiz bir joyda.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-4 lg:mb-3">
                                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                    <div className="text-3xl font-black text-white mb-1">10K+</div>
                                    <div className="text-sm text-blue-200 font-semibold">Foydalanuvchilar</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                    <div className="text-3xl font-black text-white mb-1">50K+</div>
                                    <div className="text-sm text-blue-200 font-semibold">Sertifikatlar</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                    <div className="text-3xl font-black text-white mb-1">100+</div>
                                    <div className="text-sm text-blue-200 font-semibold">Muassasalar</div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-4">
                                {[
                                    { icon: '🎓', text: 'Raqamli sertifikatlar' },
                                    { icon: '📚', text: 'Tadqiqot materiallari' },
                                    { icon: '🌍', text: 'Global tan olinish' },
                                    { icon: '🔒', text: 'Xavfsiz saqlash' }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 text-white">
                                        <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xl">
                                            {feature.icon}
                                        </div>
                                        <span className="font-semibold">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
