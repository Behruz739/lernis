import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar, Award, FileText, Save, Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
    const { userData } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        displayName: userData?.displayName || '',
        email: userData?.email || '',
        phone: '',
        bio: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                displayName: userData.displayName || '',
                email: userData.email || '',
                phone: '',
                bio: ''
            });
        }
    }, [userData]);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setIsEditing(false);
    };

    const stats = [
        { label: 'Certificates', value: '3', icon: FileText, color: 'blue' },
        { label: 'Achievements', value: '5', icon: Award, color: 'purple' },
        { label: 'Member Since', value: 'Jan 2024', icon: Calendar, color: 'green' },
    ];

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                        {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {userData?.displayName || 'User'}
                        </h1>
                        <p className="text-gray-600 mb-2">{userData?.email}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                                {userData?.role || 'User'}
                            </span>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h2>

                <div className="space-y-6">
                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                disabled={!isEditing}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                placeholder="Enter your display name"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="+998 90 123 45 67"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            disabled={!isEditing}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    {/* Save Button */}
                    {isEditing && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
