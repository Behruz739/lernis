import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { supabase } from '../../lib/supabase';

const Statistics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userGrowth, setUserGrowth] = useState<any[]>([]);
    const [certStats, setCertStats] = useState<any[]>([]);
    const [activityData, setActivityData] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            // 1. Prepare dates for the last 7 days
            const dates = Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i)); // Start from 6 days ago to today
                return d.toISOString().split('T')[0];
            });

            const startDate = dates[0];

            // 2. Fetch data for Growth Chart (Users & Certificates created in last 7 days)
            const { data: newUsers } = await supabase
                .from('profiles')
                .select('created_at')
                .gte('created_at', startDate);

            const { data: newCerts } = await supabase
                .from('certificates')
                .select('created_at')
                .gte('created_at', startDate);

            const growthData = dates.map(date => {
                const dayUsers = newUsers?.filter(u => u.created_at.startsWith(date)).length || 0;
                const dayCerts = newCerts?.filter(c => c.created_at.startsWith(date)).length || 0;
                return {
                    name: new Date(date).toLocaleDateString('uz-UZ', { weekday: 'short' }),
                    users: dayUsers,
                    certs: dayCerts
                };
            });
            setUserGrowth(growthData);

            // 3. Fetch data for Certificate Distribution
            const { count: verifiedCount } = await supabase
                .from('certificates')
                .select('*', { count: 'exact', head: true })
                .eq('verified', true);

            const { count: pendingCount } = await supabase
                .from('certificates')
                .select('*', { count: 'exact', head: true })
                .eq('verified', false);

            setCertStats([
                { name: 'Tasdiqlangan', value: verifiedCount || 0, color: '#10B981' },
                { name: 'Kutilmoqda', value: pendingCount || 0, color: '#F59E0B' },
            ]);

            // 4. Fetch data for Activity Overview (Total counts)
            const { count: totalUsers } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            const { count: totalCerts } = await supabase
                .from('certificates')
                .select('*', { count: 'exact', head: true });

            // Count admin verifications from logs
            const { count: totalVerifications } = await supabase
                .from('admin_logs')
                .select('*', { count: 'exact', head: true })
                .eq('action', 'certificate_verified');

            setActivityData([
                { name: 'Users', value: totalUsers || 0 },
                { name: 'Certificates', value: totalCerts || 0 },
                { name: 'Tasdiqlashlar', value: totalVerifications || 0 },
            ]);

        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Statistika</h1>
                <p className="text-gray-600">Platforma o'sish ko'rsatkichlari</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User & Certificate Growth */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-sm min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">O'sish Dinamikasi (7 kun)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="99%" height="100%">
                            <AreaChart data={userGrowth}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorCerts" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" name="Foydalanuvchilar" />
                                <Area type="monotone" dataKey="certs" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorCerts)" name="Sertifikatlar" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Certificate Distribution */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-sm min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Sertifikatlar Holati</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="99%" height="100%">
                            <PieChart>
                                <Pie
                                    data={certStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {certStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Bar Chart */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-sm lg:col-span-2 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Faollik Turlari</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="99%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} name="Soni" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
