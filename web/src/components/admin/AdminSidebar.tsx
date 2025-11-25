import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    LayoutDashboard, Users, Award, Building2, Settings,
    X, Menu, Shield
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const { userData } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isSuperAdmin = userData?.role === 'super_admin';

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/admin',
            icon: LayoutDashboard,
            roles: ['super_admin', 'org_admin']
        },
        {
            name: 'Foydalanuvchilar',
            path: '/admin/users',
            icon: Users,
            roles: ['super_admin', 'org_admin']
        },
        {
            name: 'Sertifikatlar',
            path: '/admin/certificates',
            icon: Award,
            roles: ['super_admin', 'org_admin']
        },
        {
            name: 'Tashkilotlar',
            path: '/admin/organizations',
            icon: Building2,
            roles: ['super_admin'] // Only super admin
        },
        {
            name: 'Sozlamalar',
            path: '/admin/settings',
            icon: Settings,
            roles: ['super_admin', 'org_admin']
        }
    ];

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.includes(userData?.role || 'user')
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            >
                {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
                ) : (
                    <Menu className="h-6 w-6 text-gray-700" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200
                    transform transition-transform duration-300 ease-in-out z-40
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200">
                        <Link to="/admin" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-gray-900">Admin Panel</h1>
                                <p className="text-xs text-gray-500 font-medium">
                                    {isSuperAdmin ? 'Super Admin' : 'Org Admin'}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {filteredMenuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Back to Dashboard */}
                    <div className="p-4 border-t border-gray-200">
                        <Link
                            to="/dashboard"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-gray-700 transition-colors"
                        >
                            ← Dashboard'ga qaytish
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default AdminSidebar;
