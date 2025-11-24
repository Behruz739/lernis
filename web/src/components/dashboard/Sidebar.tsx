import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Home,
    User,
    Settings,
    FileText,
    BookOpen,
    Users,
    PenTool,
    LogOut,
    X,
    GraduationCap
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userData, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auth/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Bosh sahifa', exact: true },
        { path: '/dashboard/profile', icon: User, label: 'Profil' },
        { path: '/dashboard/certificates', icon: FileText, label: 'Sertifikatlar', badge: '3' },
        { path: '/dashboard/research', icon: BookOpen, label: 'Tadqiqotlar' },
        { path: '/dashboard/blog', icon: PenTool, label: 'Blog', soon: true },
        { path: '/dashboard/community', icon: Users, label: 'Jamiyat', soon: true },
        { path: '/dashboard/settings', icon: Settings, label: 'Sozlamalar' },
    ];

    const isActive = (path: string, exact?: boolean) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full bg-white/70 backdrop-blur-xl border-r border-white/40 z-50
                    transition-transform duration-300 ease-in-out shadow-2xl
                    w-64 lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/40">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">Lernis</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-white/40">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 border border-white/40">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
                            <span className="text-white font-black text-lg">
                                {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate">
                                {userData?.displayName || 'Foydalanuvchi'}
                            </p>
                            <p className="text-xs text-gray-600 truncate font-semibold">{userData?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path, item.exact);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                    ${active
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black shadow-lg shadow-blue-500/30'
                                        : 'text-gray-700 hover:bg-gray-50 font-semibold'
                                    }
                                    ${item.soon ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                                {...(item.soon && { onClick: (e: React.MouseEvent) => e.preventDefault() })}
                            >
                                <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-500'}`} />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${active ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'}`}>
                                        {item.badge}
                                    </span>
                                )}
                                {item.soon && (
                                    <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-500 rounded-full">
                                        Tez kunda
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-white/40">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Chiqish</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
