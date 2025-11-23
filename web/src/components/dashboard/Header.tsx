import React, { useState } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    onMenuClick: () => void;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Boshqaruv paneli' }) => {
    const { userData } = useAuth();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const notifications = [
        { id: 1, title: 'Yangi sertifikat', message: 'Web Development sertifikatini qo\'shdingiz', time: '2 soat oldin', unread: true },
        { id: 2, title: 'Yutuq qo\'lga kiritildi', message: 'Birinchi Sertifikat yutuqini oldingiz', time: '3 soat oldin', unread: true },
        { id: 3, title: 'Profil yangilandi', message: 'Profilingiz muvaffaqiyatli yangilandi', time: '1 kun oldin', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Qidiruv:', searchQuery);
        // TODO: Implement search functionality
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

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                        <Bell className="h-5 w-5 text-gray-600" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {notificationsOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setNotificationsOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-black text-gray-900">Bildirishnomalar</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50/50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900">{notification.title}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1 font-semibold">{notification.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-200 bg-gray-50">
                                    <button className="w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                        Barchasini ko'rish
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-white text-sm font-black">
                        {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                    </span>
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
