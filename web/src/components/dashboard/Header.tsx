import React, { useState } from 'react';
import { Menu, Bell, Search, X, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    onMenuClick: () => void;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Boshqaruv paneli' }) => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Qidiruv:', searchQuery);
        // TODO: Implement search functionality
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/40 flex items-center justify-between px-4 lg:px-8 shadow-sm relative z-30">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">{title}</h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                {/* Search - Desktop */}
                <div className="hidden md:block relative">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Qidirish..."
                            className="w-64 pl-10 pr-4 py-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white backdrop-blur-sm text-sm font-semibold text-gray-900 placeholder-gray-500"
                        />
                    </form>
                </div>

                {/* Search - Mobile */}
                <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
                >
                    <Search className="h-5 w-5 text-gray-600" />
                </button>

                {/* Notifications (Disabled) */}
                {/* <div className="relative">
                    <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110">
                        <Bell className="h-5 w-5 text-gray-600" />
                    </button>
                </div> */}

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <span className="text-white text-sm font-black">
                            {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                <p className="text-sm font-bold text-gray-900">{userData?.displayName || 'Foydalanuvchi'}</p>
                                <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                            </div>

                            <button
                                onClick={() => {
                                    navigate('/dashboard/profile');
                                    setIsUserMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <User className="h-4 w-4" />
                                Profil
                            </button>

                            <button
                                onClick={() => {
                                    navigate('/dashboard/settings');
                                    setIsUserMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Settings className="h-4 w-4" />
                                Sozlamalar
                            </button>

                            <div className="h-px bg-gray-100 my-1"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Chiqish
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {searchOpen && (
                <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-white/40 p-4 md:hidden shadow-lg">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Qidirish..."
                            className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-gray-900 placeholder-gray-500"
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={() => setSearchOpen(false)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;
