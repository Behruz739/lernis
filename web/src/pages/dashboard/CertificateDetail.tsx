import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, Calendar, ExternalLink, Award, CheckCircle2,
    AlertCircle, Share2, Download, Clock, Shield
} from 'lucide-react';
import { certificatesService } from '../../services/supabaseService';
import type { Certificate } from '../../services/supabaseService';
import { useAuth } from '../../contexts/AuthContext';

const CertificateDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { userData } = useAuth();
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await certificatesService.getById(id);
                if (!data) {
                    setError('Sertifikat topilmadi');
                } else {
                    setCertificate(data);
                }
            } catch (err) {
                console.error(err);
                setError('Xatolik yuz berdi');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [id]);

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/c/${id}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${certificate?.name} - Lernis`,
                    text: `${certificate?.name} sertifikatini ko'ring`,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('Havola nusxalandi!');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sertifikat topilmadi</h2>
                <p className="text-gray-600 mb-6">Siz qidirayotgan sertifikat mavjud emas yoki o'chirilgan.</p>
                <Link to="/dashboard/certificates" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Ortga qaytish
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header / Navigation */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Ortga
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleShare}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Ulashish"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                        {certificate.image && (
                            <a
                                href={certificate.image}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Yuklab olish"
                            >
                                <Download className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-2">
                            <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
                                {certificate.image ? (
                                    <img
                                        src={certificate.image}
                                        alt={certificate.name}
                                        className="max-w-full max-h-[80vh] object-contain shadow-lg"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 p-12">
                                        <Award className="h-24 w-24 mb-4 opacity-20" />
                                        <p>Rasm mavjud emas</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description Section */}
                        {certificate.description && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Tavsif</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {certificate.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Main Info Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            {/* Type Badge */}
                            <div className="mb-6">
                                <span className={`
                                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                                    ${certificate.type === 'diploma' ? 'bg-purple-100 text-purple-700' :
                                        certificate.type === 'badge' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'}
                                `}>
                                    <Award className="h-3.5 w-3.5" />
                                    {certificate.type === 'diploma' ? 'Diplom' :
                                        certificate.type === 'badge' ? 'Badge' : 'Sertifikat'}
                                </span>
                            </div>

                            <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                                {certificate.name}
                            </h1>
                            <p className="text-lg text-gray-600 font-medium mb-6">
                                {certificate.issuer}
                            </p>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Berilgan sana</p>
                                        <p className="font-medium text-gray-900">{formatDate(certificate.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Yuklangan vaqt</p>
                                        <p className="font-medium text-gray-900">
                                            {certificate.createdAt ? formatDate(certificate.createdAt) : 'Noma\'lum'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verification Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-blue-600" />
                                Tekshiruv
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">Credential ID</p>
                                    <p className="font-mono font-bold text-gray-900 break-all">
                                        {certificate.credentialId || certificate.id.substring(0, 8).toUpperCase()}
                                    </p>
                                </div>

                                <div className={`rounded-xl p-4 border flex items-center gap-3 ${certificate.verified
                                        ? 'bg-green-50 border-green-100 text-green-700'
                                        : 'bg-yellow-50 border-yellow-100 text-yellow-700'
                                    }`}>
                                    {certificate.verified ? (
                                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    )}
                                    <div>
                                        <p className="font-bold text-sm">
                                            {certificate.verified ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
                                        </p>
                                        <p className="text-xs opacity-80 mt-0.5">
                                            {certificate.verified
                                                ? 'Ushbu sertifikat haqiqiyligi tasdiqlangan.'
                                                : 'Ushbu sertifikat hali tasdiqlanmagan.'}
                                        </p>
                                    </div>
                                </div>

                                {certificate.credentialUrl && (
                                    <a
                                        href={certificate.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Asl manbani ko'rish
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDetail;
