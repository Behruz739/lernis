import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    ScrollText,
    Shield,
    BarChart3
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const navItems = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/statistics', icon: BarChart3, label: 'Statistika' },
        { to: '/admin/users', icon: Users, label: 'Foydalanuvchilar' },
        { to: '/admin/certificates', icon: FileText, label: 'Sertifikatlar' },
        { to: '/admin/logs', icon: ScrollText, label: 'Loglar' },
        { to: '/admin/settings', icon: Settings, label: 'Sozlamalar' },
    ];

    return (
        <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-white/40 min-h-screen sticky top-0">
            {/* Logo */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900">Admin Panel</h1>
                        <p className="text-xs text-gray-500">Lernis Platform</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Back to Dashboard */}
            <div className="p-4 border-t border-gray-100 absolute bottom-0 w-64">
                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-all"
                >
                    <LayoutDashboard className="h-5 w-5" />
                    User Dashboard
                </NavLink>
            </div>
        </aside>
    );
};

export default AdminSidebar;
