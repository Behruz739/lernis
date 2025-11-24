import React, { useState, useEffect } from 'react';
import { Plus, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { certificatesService } from '../../services/supabaseService';
import type { Certificate } from '../../services/supabaseService';
import CertificateCard from '../../components/dashboard/CertificateCard';
import AddCertificateModal from '../../components/dashboard/AddCertificateModal';

const Certificates = () => {
    const { userData } = useAuth();
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState<Certificate | null>(null);

    const fetchCertificates = async () => {
        if (!userData?.id) return;
        try {
            const data = await certificatesService.getAll(userData.id);
            setCertificates(data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, [userData]);

    const handleEdit = (cert: Certificate) => {
        setEditingCert(cert);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Haqiqatan ham ushbu sertifikatni o\'chirmoqchimisiz?')) {
            try {
                await certificatesService.delete(id);
                fetchCertificates();
            } catch (error) {
                console.error('Error deleting certificate:', error);
                alert('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingCert(null);
    };

    const handleSuccess = () => {
        fetchCertificates();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Sertifikatlar</h1>
                    <p className="text-gray-600 font-medium">Yutuqlaringiz va sertifikatlaringizni boshqaring</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Plus className="h-5 w-5" />
                    Sertifikat qo'shish
                </button>
            </div>

            {/* Content */}
            {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <CertificateCard
                            key={cert.id}
                            certificate={cert}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-12 text-center shadow-sm">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="h-10 w-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Sertifikatlar yo'q</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-8 font-medium">
                        Hozircha sizda hech qanday sertifikat yo'q. Yangi sertifikat qo'shish orqali portfoliongizni boyiting.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        <Plus className="h-5 w-5" />
                        Birinchi sertifikatni qo'shish
                    </button>
                </div>
            )}

            {/* Modal */}
            <AddCertificateModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleSuccess}
                editData={editingCert}
            />
        </div>
    );
};

export default Certificates;
