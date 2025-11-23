import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    onMenuClick: () => void;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Dashboard' }) => {
    const { userData } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                {/* Search - Desktop only */}
                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Search className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Search...</span>
                </button>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                        {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
