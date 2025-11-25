import React, { useEffect, useState } from 'react';
import { adminUsersService, type AdminUser, type UserFilters } from '../../services/supabaseService';
import { Search, Filter, UserPlus, MoreVertical, Shield, Building2 } from 'lucide-react';

const UsersManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('');

    useEffect(() => {
        loadUsers();
    }, [roleFilter]);

    const loadUsers = async () => {
        setLoading(true);
        const filters: UserFilters = {};
        if (roleFilter) filters.role = roleFilter;
        if (searchTerm) filters.search = searchTerm;

        const data = await adminUsersService.getAll(filters);
        setUsers(data);
        setLoading(false);
    };

    const handleSearch = () => {
        loadUsers();
    };

    const getRoleBadge = (role: string) => {
        const colors = {
            super_admin: 'bg-red-100 text-red-700',
            org_admin: 'bg-blue-100 text-blue-700',
            user: 'bg-gray-100 text-gray-700'
        };
        const labels = {
            super_admin: 'Super Admin',
            org_admin: 'Org Admin',
            user: 'User'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors[role as keyof typeof colors]}`}>
                {labels[role as keyof typeof labels]}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Foydalanuvchilar</h1>
                    <p className="text-gray-600">Barcha foydalanuvchilarni boshqaring</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
                    <UserPlus className="h-5 w-5" />
                    Yangi foydalanuvchi
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-4 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Email yoki ism bo'yicha qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Barcha rollar</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="org_admin">Org Admin</option>
                        <option value="user">User</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
                    >
                        Qidirish
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Foydalanuvchi</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Tashkilot</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ro'yxatdan o'tgan</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Harakatlar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {user.display_name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span className="font-bold text-gray-900">{user.display_name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.organization_name || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(user.created_at).toLocaleDateString('uz-UZ')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 p-4">
                    <p className="text-sm font-bold text-gray-600">Jami foydalanuvchilar</p>
                    <p className="text-2xl font-black text-gray-900">{users.length}</p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 p-4">
                    <p className="text-sm font-bold text-gray-600">Adminlar</p>
                    <p className="text-2xl font-black text-gray-900">
                        {users.filter(u => u.role !== 'user').length}
                    </p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 p-4">
                    <p className="text-sm font-bold text-gray-600">Oddiy foydalanuvchilar</p>
                    <p className="text-2xl font-black text-gray-900">
                        {users.filter(u => u.role === 'user').length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;
