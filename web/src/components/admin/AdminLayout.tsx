import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
    const { userData, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is admin
        if (!loading && userData) {
            if (userData.role !== 'super_admin' && userData.role !== 'org_admin') {
                // Not an admin, redirect to dashboard
                navigate('/dashboard');
            }
        } else if (!loading && !userData) {
            // Not logged in, redirect to login
            navigate('/auth/login');
        }
    }, [userData, loading, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    // Only show admin panel if user is admin
    if (!userData || (userData.role !== 'super_admin' && userData.role !== 'org_admin')) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            <AdminSidebar />
            <div className="flex-1">
                <AdminHeader />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
