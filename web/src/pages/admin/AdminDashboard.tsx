import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminUsersService, adminCertificatesService, organizationsService } from '../../services/supabaseService';
import { Users, Award, Building2, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface Stats {
    totalUsers: number;
    totalCertificates: number;
    totalOrganizations: number;
    verifiedCertificates: number;
    pendingCertificates: number;
    newUsersThisMonth: number;
}

const AdminDashboard: React.FC = () => {
    const { userData } = useAuth();
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalCertificates: 0,
        totalOrganizations: 0,
        verifiedCertificates: 0,
        pendingCertificates: 0,
        newUsersThisMonth: 0
    });
    const [loading, setLoading] = useState(true);

    const isSuperAdmin = userData?.role === 'super_admin';

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);

            // Load users
            const users = await adminUsersService.getAll();

            // Load certificates
            const certificates = await adminCertificatesService.getAll();

            // Load organizations (super admin only)
            let organizations: any[] = [];
            if (isSuperAdmin) {
                organizations = await organizationsService.getAll();
            }

            // Calculate stats
            const verifiedCount = certificates.filter(c => c.verified).length;
            const pendingCount = certificates.filter(c => !c.verified).length;

            // New users this month
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const newUsers = users.filter(u => new Date(u.created_at) >= firstDayOfMonth).length;

            setStats({
                totalUsers: users.length,
                totalCertificates: certificates.length,
                totalOrganizations: organizations.length,
                verifiedCertificates: verifiedCount,
                pendingCertificates: pendingCount,
                newUsersThisMonth: newUsers
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Jami Foydalanuvchilar',
            value: stats.totalUsers,
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700'
        },
        {
            title: 'Jami Sertifikatlar',
            value: stats.totalCertificates,
            icon: Award,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700'
        },
        ...(isSuperAdmin ? [{
            title: 'Tashkilotlar',
            value: stats.totalOrganizations,
            icon: Building2,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700'
        }] : []),
        {
            title: 'Tasdiqlangan',
            value: stats.verifiedCertificates,
            icon: CheckCircle,
            color: 'from-emerald-500 to-teal-500',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-700'
        },
        {
            title: 'Kutilmoqda',
            value: stats.pendingCertificates,
            icon: Clock,
            color: 'from-orange-500 to-amber-500',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700'
        },
        {
            title: 'Yangi (Bu oy)',
            value: stats.newUsersThisMonth,
            icon: TrendingUp,
            color: 'from-indigo-500 to-blue-500',
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-700'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Xush kelibsiz, {userData?.displayName}!</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-lg hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-600 mb-1">{stat.title}</h3>
                            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-lg">
                <h2 className="text-xl font-black text-gray-900 mb-4">Tezkor Harakatlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a
                        href="/admin/users"
                        className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-blue-900">Foydalanuvchilar</span>
                    </a>
                    <a
                        href="/admin/certificates"
                        className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                    >
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-bold text-purple-900">Sertifikatlar</span>
                    </a>
                    {isSuperAdmin && (
                        <a
                            href="/admin/organizations"
                            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                        >
                            <Building2 className="h-5 w-5 text-green-600" />
                            <span className="font-bold text-green-900">Tashkilotlar</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-black mb-2">🎉 Admin Panel'ga xush kelibsiz!</h2>
                <p className="text-blue-100">
                    Siz {isSuperAdmin ? 'Super Admin' : 'Organization Admin'} sifatida tizimni to'liq boshqarishingiz mumkin.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
