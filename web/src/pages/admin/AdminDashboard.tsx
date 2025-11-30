import React, { useEffect, useState } from 'react';
import { Users, FileText, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Statistics {
    totalUsers: number;
    newUsersWeek: number;
    newUsersMonth: number;
    totalCertificates: number;
    verifiedCertificates: number;
    pendingCertificates: number;
    newCertificatesWeek: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Statistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {
        try {
            setLoading(true);

            // Get statistics from view
            const { data, error } = await supabase
                .from('admin_statistics')
                .select('*')
                .single();

            if (error) throw error;

            setStats({
                totalUsers: data.total_users || 0,
                newUsersWeek: data.new_users_week || 0,
                newUsersMonth: data.new_users_month || 0,
                totalCertificates: data.total_certificates || 0,
                verifiedCertificates: data.verified_certificates || 0,
                pendingCertificates: data.pending_certificates || 0,
                newCertificatesWeek: data.new_certificates_week || 0
            });
        } catch (error) {
            console.error('Error loading statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Jami Foydalanuvchilar',
            value: stats?.totalUsers || 0,
            change: stats?.newUsersWeek || 0,
            changeLabel: 'Oxirgi 7 kun',
            icon: Users,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Jami Sertifikatlar',
            value: stats?.totalCertificates || 0,
            change: stats?.newCertificatesWeek || 0,
            changeLabel: 'Oxirgi 7 kun',
            icon: FileText,
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Tasdiqlangan',
            value: stats?.verifiedCertificates || 0,
            change: stats?.verifiedCertificates && stats?.totalCertificates
                ? Math.round((stats.verifiedCertificates / stats.totalCertificates) * 100)
                : 0,
            changeLabel: 'Foiz',
            icon: CheckCircle,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Kutilayotgan',
            value: stats?.pendingCertificates || 0,
            change: stats?.pendingCertificates && stats?.totalCertificates
                ? Math.round((stats.pendingCertificates / stats.totalCertificates) * 100)
                : 0,
            changeLabel: 'Foiz',
            icon: Clock,
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Platformaning umumiy holati</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    const isPositive = card.change > 0;

                    return (
                        <div
                            key={index}
                            className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {isPositive ? (
                                        <TrendingUp className="h-3 w-3" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3" />
                                    )}
                                    <span className="text-xs font-bold">+{card.change}</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                            <p className="text-3xl font-black text-gray-900 mb-1">{card.value.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{card.changeLabel}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4">Tezkor Harakatlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        Yangi Foydalanuvchi
                    </button>
                    <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        Sertifikatlarni Ko'rish
                    </button>
                    <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        Sozlamalar
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4">So'nggi Harakatlar</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">Yangi foydalanuvchi ro'yxatdan o'tdi</p>
                            <p className="text-xs text-gray-500">2 daqiqa oldin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">Sertifikat tasdiqlandi</p>
                            <p className="text-xs text-gray-500">15 daqiqa oldin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">Yangi sertifikat yuklandi</p>
                            <p className="text-xs text-gray-500">1 soat oldin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
