import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { certificateService, achievementService } from '../../services/firebaseService';
import {
    FileText,
    Award,
    TrendingUp,
    Users,
    Plus,
    ArrowRight,
    Clock
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
            if (!userData?.uid) return;

            try {
                const [certificates, achievements] = await Promise.all([
                    certificateService.getCertificates(userData.uid),
                    achievementService.getAchievements(userData.uid)
                ]);

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
            title: 'Certificates',
            value: stats.certificates,
            icon: FileText,
            color: 'blue',
            change: '+12%'
        },
        {
            title: 'Achievements',
            value: stats.achievements,
            icon: Award,
            color: 'purple',
            change: '+8%'
        },
        {
            title: 'Activity',
            value: stats.activity,
            icon: TrendingUp,
            color: 'green',
            change: '+23%'
        },
        {
            title: 'Completion',
            value: `${stats.completion}%`,
            icon: Users,
            color: 'orange',
            change: '+5%'
        }
    ];

    const quickActions = [
        { label: 'Upload Certificate', icon: Plus, color: 'blue', soon: false },
        { label: 'Write Blog Post', icon: Plus, color: 'purple', soon: true },
        { label: 'Join Community', icon: Users, color: 'green', soon: true },
    ];

    const recentActivity = [
        { action: 'Certificate added', item: 'Web Development Bootcamp', time: '2 hours ago', type: 'certificate' },
        { action: 'Achievement unlocked', item: 'First Certificate', time: '3 hours ago', type: 'achievement' },
        { action: 'Profile updated', item: 'Display name changed', time: '1 day ago', type: 'profile' },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; icon: string }> = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-500' },
            purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-500' },
            green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-500' },
            orange: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'text-orange-500' },
        };
        return colors[color] || colors.blue;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {userData?.displayName || 'User'}! 👋
                </h1>
                <p className="text-blue-100">
                    Here's what's happening with your learning journey today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    const colors = getColorClasses(stat.color);

                    return (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                                </div>
                                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        const colors = getColorClasses(action.color);

                        return (
                            <button
                                key={index}
                                className={`
                  flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all
                  ${action.soon
                                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                                        : `border-${action.color}-200 hover:border-${action.color}-400 hover:bg-${action.color}-50`
                                    }
                `}
                                disabled={action.soon}
                            >
                                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                                </div>
                                <span className="font-medium text-gray-900">{action.label}</span>
                                {action.soon && (
                                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                        Soon
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
