import React, { useEffect, useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Eye, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    verified: boolean;
    credential_id: string;
    user_id: string;
    created_at: string;
    profiles: {
        display_name: string;
        email: string;
    };
}

const CertificatesManagement: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('certificates')
                .select(`
                    *,
                    profiles (
                        display_name,
                        email
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCertificates(data || []);
        } catch (error) {
            console.error('Error loading certificates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (certId: string, verified: boolean) => {
        try {
            const { error } = await supabase
                .from('certificates')
                .update({ verified })
                .eq('id', certId);

            if (error) throw error;

            // Update local state
            setCertificates(certificates.map(cert =>
                cert.id === certId ? { ...cert, verified } : cert
            ));

            // Log action
            await supabase.rpc('log_admin_action', {
                p_action: verified ? 'certificate_verified' : 'certificate_unverified',
                p_target_type: 'certificate',
                p_target_id: certId
            });

        } catch (error) {
            console.error('Error updating certificate:', error);
            alert('Xatolik yuz berdi');
        }
    };

    const filteredCertificates = certificates.filter(cert => {
        const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.profiles?.display_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'verified' && cert.verified) ||
            (statusFilter === 'pending' && !cert.verified);

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Sertifikatlar</h1>
                    <p className="text-gray-600">Jami: {certificates.length} ta sertifikat</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">Barcha holatlar</option>
                            <option value="verified">Tasdiqlangan</option>
                            <option value="pending">Kutilmoqda</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sertifikat</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Egasi</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Berilgan sana</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Holati</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amallar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCertificates.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{cert.name}</div>
                                                <div className="text-xs text-gray-500">{cert.issuer}</div>
                                                {cert.credential_id && (
                                                    <div className="text-xs text-blue-600 mt-1 font-mono">ID: {cert.credential_id}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{cert.profiles?.display_name || 'Noma\'lum'}</div>
                                            <div className="text-xs text-gray-500">{cert.profiles?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(cert.date).toLocaleDateString('uz-UZ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {cert.verified ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Tasdiqlangan
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Kutilmoqda
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/c/${cert.credential_id || cert.id}`}
                                                    target="_blank"
                                                    className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                                                    title="Ko'rish"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>

                                                {cert.verified ? (
                                                    <button
                                                        onClick={() => handleVerification(cert.id, false)}
                                                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                        title="Bekor qilish"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleVerification(cert.id, true)}
                                                        className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                                                        title="Tasdiqlash"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredCertificates.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            Sertifikatlar topilmadi
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CertificatesManagement;
