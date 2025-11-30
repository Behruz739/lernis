import React, { useEffect, useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Setting {
    key: string;
    value: any;
    description: string;
}

const SystemSettings: React.FC = () => {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('system_settings')
                .select('*')
                .order('key');

            if (error) throw error;
            setSettings(data || []);
        } catch (error) {
            console.error('Error loading settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key: string, newValue: any) => {
        try {
            setSaving(true);
            const { error } = await supabase
                .from('system_settings')
                .update({ value: newValue })
                .eq('key', key);

            if (error) throw error;

            // Update local state
            setSettings(settings.map(s =>
                s.key === key ? { ...s, value: newValue } : s
            ));

            alert('Sozlamalar saqlandi');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Xatolik yuz berdi');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Tizim Sozlamalari</h1>
                <p className="text-gray-600">Platforma konfiguratsiyasi</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-6 space-y-6">
                    {settings.map((setting) => (
                        <div key={setting.key} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-gray-900 font-mono">{setting.key}</h3>
                                <p className="text-xs text-gray-500">{setting.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    defaultValue={setting.value}
                                    onBlur={(e) => handleSave(setting.key, e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                />
                                <button
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    disabled={saving}
                                >
                                    {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    ))}

                    {settings.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            Sozlamalar topilmadi
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SystemSettings;
