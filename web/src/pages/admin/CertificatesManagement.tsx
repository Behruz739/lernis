import React, { useEffect, useState } from 'react';
import { adminCertificatesService, type Certificate, type CertFilters } from '../../services/supabaseService';
import { Search, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const CertificatesManagement: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [verifiedFilter, setVerifiedFilter] = useState<string>('');

    useEffect(() => {
        loadCertificates();
    }, [verifiedFilter]);

    const loadCertificates = async () => {
        setLoading(true);
        const filters: CertFilters = {};
        if (verifiedFilter !== '') filters.verified = verifiedFilter === 'true';
        if (searchTerm) filters.search = searchTerm;

        const data = await adminCertificatesService.getAll(filters);
        setCertificates(data);
        setLoading(false);
    };

    const handleVerify = async (certId: string) => {
        await adminCertificatesService.verify(certId);
        loadCertificates();
    };

    const handleUnverify = async (certId: string) => {
        await adminCertificatesService.unverify(certId);
        loadCertificates();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900">Sertifikatlar</h1>
                <p className="text-gray-600">Barcha sertifikatlarni boshqaring</p>
            </div>

            {/* Filters */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-4 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Sertifikat nomi yoki beruvchi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && loadCertificates()}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={verifiedFilter}
                        onChange={(e) => setVerifiedFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Barchasi</option>
                        <option value="true">Tasdiqlangan</option>
                        <option value="false">Tasdiqlanmagan</option>
                    </select>
                    <button
                        onClick={loadCertificates}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
                    >
                        Qidirish
                    </button>
                </div>
            </div>

            {/* Certificates Grid */}
            {loading ? (
                <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-4 shadow-lg">
                            {cert.image && (
                                <img src={cert.image} alt={cert.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                            )}
                            <h3 className="font-black text-gray-900 mb-2 line-clamp-2">{cert.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{cert.issuer}</p>

                            <div className="flex items-center gap-2 mb-4">
                                {cert.verified ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" />
                                        Tasdiqlangan
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1">
                                        <XCircle className="h-3 w-3" />
                                        Tasdiqlanmagan
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {cert.verified ? (
                                    <button
                                        onClick={() => handleUnverify(cert.id)}
                                        className="flex-1 px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm font-bold transition-colors"
                                    >
                                        Bekor qilish
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleVerify(cert.id)}
                                        className="flex-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-bold transition-colors"
                                    >
                                        Tasdiqlash
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 p-4">
                    <p className="text-sm font-bold text-gray-600">Jami sertifikatlar</p>
                    <p className="text-2xl font-black text-gray-900">{certificates.length}</p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 p-4">
                    <p className="text-sm font-bold text-gray-600">Tasdiqlangan</p>
                    <p className="text-2xl font-black text-green-600">
                        {certificates.filter(c => c.verified).length}
                    </p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-white/40 p-4">
                    <p className="text-sm font-bold text-gray-600">Kutilmoqda</p>
                    <p className="text-2xl font-black text-yellow-600">
                        {certificates.filter(c => !c.verified).length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CertificatesManagement;
