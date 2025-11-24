import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { certificatesService } from '../../services/supabaseService';
// import { achievementService } from '../../services/firebaseService'; // TODO: Migrate achievements
import {
    FileText,
    Award,
    TrendingUp,
    Users,
    Plus,
    ArrowRight,
    Clock,
    Sparkles
} from 'lucide-react';

const Home: React.FC = () => {
    const { userData } = useAuth();
    const [stats, setStats] = useState({
        certificates: 0,
        achievements: 0,
        activity: 0,
        completion: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            if (!userData?.id) return;

            try {
                const [certificates] = await Promise.all([
                    certificatesService.getAll(userData.id),
                    // achievementService.getAchievements(userData.id)
                ]);
                const achievements: any[] = []; // Placeholder

                setStats({
                    certificates: certificates.length,
                    achievements: achievements.length,
                    activity: certificates.length + achievements.length,
                    completion: certificates.length > 0 ? 75 : 0
                });
            } catch (error) {
                console.error('Error loading stats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, [userData]);

    const statCards = [
        {
            title: 'Sertifikatlar',
            value: stats.certificates,
            icon: FileText,
            gradient: 'from-blue-500 to-cyan-500',
            change: '+12%'
        },
        {
            title: 'Yutuqlar',
            value: stats.achievements,
            icon: Award,
            gradient: 'from-purple-500 to-pink-500',
            change: '+8%'
        },
        {
            title: 'Faollik',
            value: stats.activity,
            icon: TrendingUp,
            gradient: 'from-green-500 to-emerald-500',
            change: '+23%'
        },
        {
            title: 'Bajarilish',
            value: `${stats.completion}%`,
            icon: Users,
            gradient: 'from-orange-500 to-red-500',
            change: '+5%'
        }
    ];

    const quickActions = [
        { label: 'Sertifikat yuklash', icon: Plus, gradient: 'from-blue-500 to-cyan-500', soon: false },
        { label: 'Blog yozish', icon: Plus, gradient: 'from-purple-500 to-pink-500', soon: true },
        { label: 'Jamiyatga qo\'shilish', icon: Users, gradient: 'from-green-500 to-emerald-500', soon: true },
    ];

    const recentActivity = [
        { action: 'Sertifikat qo\'shildi', item: 'Web Development Bootcamp', time: '2 soat oldin', type: 'certificate' },
        { action: 'Yutuq qo\'lga kiritildi', item: 'Birinchi Sertifikat', time: '3 soat oldin', type: 'achievement' },
        { action: 'Profil yangilandi', item: 'Ism o\'zgartirildi', time: '1 kun oldin', type: 'profile' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white shadow-2xl">
                {/* Animated Gradient Orbs */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-semibold mb-4">
                        <Sparkles className="h-3 w-3" />
                        Xush kelibsiz
                    </div>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">
                        Qaytganingizdan xursandmiz, {userData?.displayName || 'Foydalanuvchi'}! 👋
                    </h1>
                    <p className="text-blue-100 font-medium">
                        Bugun ta'lim sayohatingizda nima yangiliklar bor.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-bold text-green-600">{stat.change}</span>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-600 font-semibold">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-sm">
                <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Tezkor harakatlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;

                        return (
                            <button
                                key={index}
                                className={`
                                    relative overflow-hidden flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                                    ${action.soon
                                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                                    }
                                `}
                                disabled={action.soon}
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-md`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-gray-900">{action.label}</span>
                                {action.soon && (
                                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-semibold">
                                        Tez kunda
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">So'nggi faollik</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors">
                        Barchasini ko'rish
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
                <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-600 truncate font-medium">{activity.item}</p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap font-semibold">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
