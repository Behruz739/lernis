import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Calendar, ExternalLink, Award, CheckCircle2,
    AlertCircle, Share2, Download, Shield, ArrowRight
} from 'lucide-react';
import { certificatesService } from '../services/supabaseService';
import type { Certificate } from '../services/supabaseService';

const PublicCertificate = () => {
    const { id } = useParams<{ id: string }>();
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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${certificate?.name} - Lernis`,
                    text: `${certificate?.name} sertifikatini ko'ring`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Havola nusxalandi!');
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sertifikat topilmadi</h2>
                <p className="text-gray-600 mb-6">Siz qidirayotgan sertifikat mavjud emas yoki o'chirilgan.</p>
                <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Bosh sahifaga qaytish
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-black text-xl text-blue-600">
                        Lernis
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                        >
                            <Share2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Ulashish</span>
                        </button>
                        <Link
                            to="/auth/register"
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors text-sm"
                        >
                            Ro'yxatdan o'tish
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Certificate Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Image Section */}
                    <div className="bg-gray-100 border-b border-gray-100 relative">
                        {certificate.image ? (
                            <img
                                src={certificate.image}
                                alt={certificate.name}
                                className="w-full h-auto max-h-[600px] object-contain"
                            />
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                                <Award className="h-16 w-16 mb-4 opacity-20" />
                                <p>Rasm mavjud emas</p>
                            </div>
                        )}

                        {/* Verification Badge Overlay */}
                        <div className="absolute top-6 right-6">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-md ${certificate.verified
                                    ? 'bg-green-500/90 text-white'
                                    : 'bg-yellow-500/90 text-white'
                                }`}>
                                {certificate.verified ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    <AlertCircle className="h-5 w-5" />
                                )}
                                <span className="font-bold text-sm">
                                    {certificate.verified ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-10">
                            <span className={`
                                inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6
                                ${certificate.type === 'diploma' ? 'bg-purple-100 text-purple-700' :
                                    certificate.type === 'badge' ? 'bg-orange-100 text-orange-700' :
                                        'bg-blue-100 text-blue-700'}
                            `}>
                                {certificate.type === 'diploma' ? 'Diplom' :
                                    certificate.type === 'badge' ? 'Badge' : 'Sertifikat'}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {certificate.name}
                            </h1>
                            <p className="text-xl text-gray-600 font-medium">
                                {certificate.issuer}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="h-5 w-5 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Credential ID</span>
                                </div>
                                <p className="font-mono font-bold text-gray-900 text-lg break-all">
                                    {certificate.credentialId || certificate.id.substring(0, 8).toUpperCase()}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Berilgan sana</span>
                                </div>
                                <p className="font-bold text-gray-900 text-lg">
                                    {formatDate(certificate.date)}
                                </p>
                            </div>
                        </div>

                        {certificate.description && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Tavsif</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {certificate.description}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                            {certificate.credentialUrl && (
                                <a
                                    href={certificate.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors text-lg shadow-lg shadow-blue-200"
                                >
                                    Asl manbani ko'rish
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                            )}

                            {certificate.image && (
                                <a
                                    href={certificate.image}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors text-lg"
                                >
                                    Yuklab olish
                                    <Download className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Siz ham o'z yutuqlaringizni Lernis bilan boshqaring</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                    >
                        Lernis haqida ko'proq bilish
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default PublicCertificate;
