import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, User } from 'lucide-react';

const AdminHeader: React.FC = () => {
    const { userData } = useAuth();

    return (
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-gray-200">
            <div className="flex items-center justify-between px-4 lg:px-8 h-16">
                {/* Page Title - Will be updated by each page */}
                <div className="flex-1">
                    {/* Empty - pages will add their own titles */}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Info */}
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-lg">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">{userData?.displayName}</p>
                            <p className="text-xs text-gray-500">{userData?.role === 'super_admin' ? 'Super Admin' : 'Org Admin'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
