import React, { useState } from 'react';
import { MoreVertical, ExternalLink, Calendar, Award, Trash2, Edit2, Share2 } from 'lucide-react';
import type { Certificate } from '../../services/supabaseService';

interface CertificateCardProps {
    certificate: Certificate;
    onEdit: (cert: Certificate) => void;
    onDelete: (id: string) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // Format date
    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        // Handle Firestore Timestamp
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        // Handle string or Date object
        return new Date(timestamp).toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="group relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Certificate Image (if exists) */}
            {certificate.image && (
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-50">
                    <img
                        src={certificate.image}
                        alt={certificate.name}
                        className="w-full h-full object-contain p-4"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-5">
                {/* Type Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`
                        px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${certificate.type === 'diploma' ? 'bg-purple-100 text-purple-700' :
                            certificate.type === 'badge' ? 'bg-orange-100 text-orange-700' :
                                'bg-blue-100 text-blue-700'}
                    `}>
                        {certificate.type === 'diploma' ? 'Diplom' :
                            certificate.type === 'badge' ? 'Badge' : 'Sertifikat'}
                    </span>
                </div>

                {/* Certificate Info */}
                <div className="mb-4">
                    <h3 className="text-lg font-black text-gray-900 mb-1 line-clamp-2" title={certificate.name}>
                        {certificate.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium mb-2">{certificate.issuer}</p>

                    {/* Certificate ID */}
                    <div className="mb-3">
                        <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            ID: {certificate.credentialId || certificate.id.substring(0, 8).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Berilgan: {formatDate(certificate.date)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                        onClick={() => setShowViewModal(true)}
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Ko'rish
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                        >
                            <MoreVertical className="h-4 w-4" />
                        </button>

                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 bottom-full mb-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 py-1">
                                    <button
                                        onClick={() => { setShowMenu(false); onEdit(certificate); }}
                                        className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Tahrirlash
                                    </button>
                                    <button
                                        onClick={() => { setShowMenu(false); }}
                                        className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Share2 className="h-3.5 w-3.5" />
                                        Ulashish
                                    </button>
                                    <button
                                        onClick={() => { setShowMenu(false); onDelete(certificate.id!); }}
                                        className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        O'chirish
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {showViewModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewModal(false)}>
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* Close button */}
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Certificate Image */}
                        {certificate.image && (
                            <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                                <img
                                    src={certificate.image}
                                    alt={certificate.name}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        )}

                        {/* Certificate Details */}
                        <div className="p-8">
                            {/* Type Badge */}
                            <span className={`
                                inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4
                                ${certificate.type === 'diploma' ? 'bg-purple-100 text-purple-700' :
                                    certificate.type === 'badge' ? 'bg-orange-100 text-orange-700' :
                                        'bg-blue-100 text-blue-700'}
                            `}>
                                {certificate.type === 'diploma' ? 'Diplom' :
                                    certificate.type === 'badge' ? 'Badge' : 'Sertifikat'}
                            </span>

                            <h2 className="text-2xl font-black text-gray-900 mb-2">{certificate.name}</h2>
                            <p className="text-lg text-gray-600 font-medium mb-6">{certificate.issuer}</p>

                            {/* Certificate ID */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <p className="text-sm text-gray-500 mb-1">Sertifikat ID</p>
                                <p className="text-lg font-mono font-bold text-gray-900">
                                    {certificate.credentialId || certificate.id.substring(0, 8).toUpperCase()}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Berilgan sana</p>
                                    <p className="font-bold text-gray-900">{formatDate(certificate.date)}</p>
                                </div>
                                {certificate.credentialUrl && (
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Tasdiqlash</p>
                                        <a
                                            href={certificate.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                                        >
                                            Tekshirish
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {certificate.description && (
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-2">Tavsif</p>
                                    <p className="text-gray-700">{certificate.description}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setShowViewModal(false); onEdit(certificate); }}
                                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Tahrirlash
                                </button>
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="px-4 py-3 border-2 border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                >
                                    Yopish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(CertificateCard);
