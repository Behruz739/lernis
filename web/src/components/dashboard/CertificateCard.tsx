import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, ExternalLink, Calendar, Award, Trash2, Edit2, Share2 } from 'lucide-react';
import type { Certificate } from '../../services/supabaseService';

interface CertificateCardProps {
    certificate: Certificate;
    onEdit: (cert: Certificate) => void;
    onDelete: (id: string) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

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
                    <Link
                        to={`/dashboard/certificates/${certificate.id}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Ko'rish
                    </Link>

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
        </div>
    );
};

export default React.memo(CertificateCard);
