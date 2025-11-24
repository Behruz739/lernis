import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import {
    User, Lock, Bell, Globe, Trash2, Save, Eye, EyeOff,
    CheckCircle, AlertCircle, Mail
} from 'lucide-react';

const Settings: React.FC = () => {
    const { userData, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'account' | 'security' | 'preferences' | 'danger'>('account');

    // Account states
    const [displayName, setDisplayName] = useState(userData?.displayName || '');
    const [savingAccount, setSavingAccount] = useState(false);
    const [accountMessage, setAccountMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Security states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [savingSecurity, setSavingSecurity] = useState(false);
    const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Preferences states
    const [language, setLanguage] = useState('uz');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [savingPreferences, setSavingPreferences] = useState(false);
    const [preferencesMessage, setPreferencesMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Danger zone states
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [deleting, setDeleting] = useState(false);

    const handleSaveAccount = async () => {
        setSavingAccount(true);
        setAccountMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                data: { display_name: displayName }
            });

            if (error) throw error;

            setAccountMessage({ type: 'success', text: 'Profil muvaffaqiyatli yangilandi!' });
        } catch (error: any) {
            setAccountMessage({ type: 'error', text: error.message || 'Xatolik yuz berdi' });
        } finally {
            setSavingAccount(false);
        }
    };

    const handleChangePassword = async () => {
        setSavingSecurity(true);
        setSecurityMessage(null);

        if (newPassword !== confirmPassword) {
            setSecurityMessage({ type: 'error', text: 'Parollar mos kelmadi' });
            setSavingSecurity(false);
            return;
        }

        if (newPassword.length < 6) {
            setSecurityMessage({ type: 'error', text: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' });
            setSavingSecurity(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setSecurityMessage({ type: 'success', text: 'Parol muvaffaqiyatli o\'zgartirildi!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setSecurityMessage({ type: 'error', text: error.message || 'Xatolik yuz berdi' });
        } finally {
            setSavingSecurity(false);
        }
    };

    const handleSavePreferences = async () => {
        setSavingPreferences(true);
        setPreferencesMessage(null);

        try {
            // Save preferences to user metadata or local storage
            localStorage.setItem('lernis_language', language);
            localStorage.setItem('lernis_email_notifications', emailNotifications.toString());

            setPreferencesMessage({ type: 'success', text: 'Sozlamalar saqlandi!' });
        } catch (error: any) {
            setPreferencesMessage({ type: 'error', text: 'Xatolik yuz berdi' });
        } finally {
            setSavingPreferences(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== 'DELETE') {
            return;
        }

        setDeleting(true);

        try {
            // Delete user data from Supabase
            // Note: This requires admin privileges or RPC function
            alert('Hisobni o\'chirish funksiyasi hozircha ishlamaydi. Admin bilan bog\'laning.');

            // After successful deletion, logout
            // await logout();
        } catch (error: any) {
            alert('Xatolik: ' + error.message);
        } finally {
            setDeleting(false);
        }
    };

    const tabs = [
        { id: 'account' as const, label: 'Hisob', icon: User },
        { id: 'security' as const, label: 'Xavfsizlik', icon: Lock },
        { id: 'preferences' as const, label: 'Sozlamalar', icon: Globe },
        { id: 'danger' as const, label: 'Xavfli Zona', icon: Trash2 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Sozlamalar</h1>
                <p className="text-gray-600">Hisobingizni va sozlamalaringizni boshqaring</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Account Tab */}
            {activeTab === 'account' && (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Hisob Ma'lumotlari</h2>
                            <p className="text-sm text-gray-600">Shaxsiy ma'lumotlaringizni tahrirlang</p>
                        </div>
                    </div>

                    {accountMessage && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${accountMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {accountMessage.type === 'success' ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                            <span className="font-semibold">{accountMessage.text}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                To'liq Ism
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ismingizni kiriting"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={userData?.email || ''}
                                    disabled
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Email o'zgartirib bo'lmaydi</p>
                        </div>

                        <button
                            onClick={handleSaveAccount}
                            disabled={savingAccount}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Save className="h-5 w-5" />
                            {savingAccount ? 'Saqlanmoqda...' : 'Saqlash'}
                        </button>
                    </div>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                            <Lock className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Xavfsizlik</h2>
                            <p className="text-sm text-gray-600">Parolingizni o'zgartiring</p>
                        </div>
                    </div>

                    {securityMessage && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${securityMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {securityMessage.type === 'success' ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                            <span className="font-semibold">{securityMessage.text}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Yangi Parol
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                                    placeholder="Yangi parol"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Parolni Tasdiqlang
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Parolni qayta kiriting"
                            />
                        </div>

                        <button
                            onClick={handleChangePassword}
                            disabled={savingSecurity || !newPassword || !confirmPassword}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Lock className="h-5 w-5" />
                            {savingSecurity ? 'O\'zgartirilmoqda...' : 'Parolni O\'zgartirish'}
                        </button>
                    </div>
                </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                            <Globe className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Sozlamalar</h2>
                            <p className="text-sm text-gray-600">Tizim sozlamalarini o'zgartiring</p>
                        </div>
                    </div>

                    {preferencesMessage && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${preferencesMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {preferencesMessage.type === 'success' ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                            <span className="font-semibold">{preferencesMessage.text}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Tizim Tili
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="uz">O'zbek</option>
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-bold text-gray-900">Email Xabarnomalar</p>
                                <p className="text-sm text-gray-600">Yangi sertifikatlar haqida xabar olish</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={emailNotifications}
                                    onChange={(e) => setEmailNotifications(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>

                        <button
                            onClick={handleSavePreferences}
                            disabled={savingPreferences}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Save className="h-5 w-5" />
                            {savingPreferences ? 'Saqlanmoqda...' : 'Saqlash'}
                        </button>
                    </div>
                </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white">
                            <Trash2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-red-900">Xavfli Zona</h2>
                            <p className="text-sm text-red-700">Bu harakatlar qaytarib bo'lmaydi</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border-2 border-red-300">
                        <h3 className="text-lg font-black text-gray-900 mb-2">Hisobni O'chirish</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Hisobingizni o'chirsangiz, barcha ma'lumotlaringiz (sertifikatlar, profil, va h.k.) butunlay o'chiriladi.
                            Bu harakatni qaytarib bo'lmaydi.
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Tasdiqlash uchun <span className="text-red-600">DELETE</span> so'zini kiriting:
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="DELETE"
                            />
                        </div>

                        <button
                            onClick={handleDeleteAccount}
                            disabled={deleteConfirmation !== 'DELETE' || deleting}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="h-5 w-5" />
                            {deleting ? 'O\'chirilmoqda...' : 'Hisobni O\'chirish'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
