import { supabase } from '../lib/supabase';

export interface Certificate {
    id: string;
    userId: string;
    name: string;
    issuer: string;
    description?: string;
    date: string;
    type: 'certificate' | 'diploma' | 'badge';
    image?: string;
    credentialId?: string;
    credentialUrl?: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export const certificatesService = {
    // Get all certificates for a user
    getAll: async (userId: string): Promise<Certificate[]> => {
        try {
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: false });

            if (error) throw error;

            // Map snake_case to camelCase
            return (data || []).map(cert => ({
                id: cert.id,
                userId: cert.user_id,
                name: cert.name,
                issuer: cert.issuer,
                description: cert.description,
                date: cert.date,
                type: cert.type,
                image: cert.image,
                credentialId: cert.credential_id,
                credentialUrl: cert.credential_url,
                verified: cert.verified,
                createdAt: cert.created_at,
                updatedAt: cert.updated_at
            }));
        } catch (error) {
            console.error('Error getting certificates:', error);
            return [];
        }
    },

    // Get single certificate
    getById: async (id: string): Promise<Certificate | null> => {
        try {
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) return null;

            return {
                id: data.id,
                userId: data.user_id,
                name: data.name,
                issuer: data.issuer,
                description: data.description,
                date: data.date,
                type: data.type,
                image: data.image,
                credentialId: data.credential_id,
                credentialUrl: data.credential_url,
                verified: data.verified,
                createdAt: data.created_at,
                updatedAt: data.updated_at
            };
        } catch (error) {
            console.error('Error getting certificate:', error);
            return null;
        }
    },

    // Add new certificate
    add: async (certificate: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from('certificates')
                .insert([{
                    user_id: certificate.userId,
                    name: certificate.name,
                    issuer: certificate.issuer,
                    description: certificate.description,
                    date: certificate.date,
                    type: certificate.type,
                    image: certificate.image,
                    credential_id: certificate.credentialId,
                    credential_url: certificate.credentialUrl,
                    verified: certificate.verified
                }])
                .select()
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error('Error adding certificate:', error);
            return null;
        }
    },

    // Update certificate
    update: async (id: string, updates: Partial<Certificate>): Promise<boolean> => {
        try {
            const snakeCaseUpdates: any = {};
            if (updates.name) snakeCaseUpdates.name = updates.name;
            if (updates.issuer) snakeCaseUpdates.issuer = updates.issuer;
            if (updates.description) snakeCaseUpdates.description = updates.description;
            if (updates.date) snakeCaseUpdates.date = updates.date;
            if (updates.type) snakeCaseUpdates.type = updates.type;
            if (updates.image) snakeCaseUpdates.image = updates.image;
            if (updates.credentialId) snakeCaseUpdates.credential_id = updates.credentialId;
            if (updates.credentialUrl) snakeCaseUpdates.credential_url = updates.credentialUrl;

            snakeCaseUpdates.updated_at = new Date().toISOString();

            const { error } = await supabase
                .from('certificates')
                .update(snakeCaseUpdates)
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error updating certificate:', error);
            return false;
        }
    },

    // Delete a certificate
    delete: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('certificates')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting certificate:', error);
            throw error;
        }
    },

    // Delete all certificates for a user
    deleteAll: async (userId: string): Promise<void> => {
        try {
            const { error } = await supabase
                .from('certificates')
                .delete()
                .eq('user_id', userId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting all certificates:', error);
            throw error;
        }
    },

    // Upload certificate image
    uploadImage: async (file: File, userId: string): Promise<string> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('certificates')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('certificates')
                .getPublicUrl(fileName);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
};

// Generate unique certificate ID based on type
export const generateCertificateId = (type: 'certificate' | 'diploma' | 'badge'): string => {
    const prefix = type === 'diploma' ? 'DIP' : type === 'badge' ? 'BADGE' : 'CERT';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
};

export const waitlistService = {
    addWaitlistEntry: async (entry: { email: string }): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from('waitlist')
                .insert([{ email: entry.email, created_at: new Date().toISOString() }])
                .select()
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error('Error adding to waitlist:', error);
            return null;
        }
    }
};
