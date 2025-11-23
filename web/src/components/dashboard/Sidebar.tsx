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
    X
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
        { path: '/dashboard', icon: Home, label: 'Home', exact: true },
        { path: '/dashboard/profile', icon: User, label: 'Profile' },
        { path: '/dashboard/certificates', icon: FileText, label: 'Certificates', badge: '3' },
        { path: '/dashboard/research', icon: BookOpen, label: 'Research' },
        { path: '/dashboard/blog', icon: PenTool, label: 'Blog', soon: true },
        { path: '/dashboard/community', icon: Users, label: 'Community', soon: true },
        { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
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
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
          transition-transform duration-300 ease-in-out
          w-64 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">L</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">LERNIS</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-semibold">
                                {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {userData?.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
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
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                  ${item.soon ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                                {...(item.soon && { onClick: (e: React.MouseEvent) => e.preventDefault() })}
                            >
                                <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                {item.soon && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                                        Soon
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
