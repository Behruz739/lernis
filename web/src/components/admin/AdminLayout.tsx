import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
    const { userData, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Check if user is admin
    if (!userData || (userData.role !== 'super_admin' && userData.role !== 'org_admin')) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
            {/* Admin Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Admin Header */}
                <AdminHeader />

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
