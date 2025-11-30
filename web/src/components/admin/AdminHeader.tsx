import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, LogOut, User, Settings } from 'lucide-react';

const AdminHeader: React.FC = () => {
    const { userData, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/40 sticky top-0 z-10">
            <div className="px-6 h-16 flex items-center justify-between">
                {/* Page Title */}
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Admin Dashboard</h2>
                    <p className="text-sm text-gray-600">Platformani boshqarish</p>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Notifications (Disabled for now) */}
                    {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button> */}

                    {/* User Menu Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{userData?.displayName || 'Admin'}</p>
                                <p className="text-xs text-gray-500">{userData?.role || 'super_admin'}</p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-2 border-b border-gray-100 mb-2 sm:hidden">
                                    <p className="text-sm font-bold text-gray-900">{userData?.displayName || 'Admin'}</p>
                                    <p className="text-xs text-gray-500">{userData?.role || 'super_admin'}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        navigate('/admin/settings');
                                        setIsDropdownOpen(false);
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
            </div>
        </header>
    );
};

export default AdminHeader;
