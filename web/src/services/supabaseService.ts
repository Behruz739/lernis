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

export interface Experience {
    id: string;
    userId: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
    createdAt: string;
}

export interface Education {
    id: string;
    userId: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
    createdAt: string;
}

export interface Skill {
    id: string;
    userId: string;
    skillName: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    createdAt: string;
}

export interface Language {
    id: string;
    userId: string;
    language: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
    createdAt: string;
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

    // Get certificate by ID or Credential ID
    getById: async (idOrCredentialId: string): Promise<Certificate | null> => {
        try {
            // Check if input is UUID
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCredentialId);

            let query = supabase.from('certificates').select('*');

            if (isUuid) {
                query = query.eq('id', idOrCredentialId);
            } else {
                query = query.eq('credential_id', idOrCredentialId);
            }

            const { data, error } = await query.single();

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
            console.error('Error getting certificate by ID:', error);
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

// Profile Services
export const experienceService = {
    getAll: async (userId: string): Promise<Experience[]> => {
        try {
            const { data, error } = await supabase
                .from('user_experiences')
                .select('*')
                .eq('user_id', userId)
                .order('start_date', { ascending: false });

            if (error) throw error;

            return (data || []).map(exp => ({
                id: exp.id,
                userId: exp.user_id,
                company: exp.company,
                position: exp.position,
                location: exp.location,
                startDate: exp.start_date,
                endDate: exp.end_date,
                current: exp.current,
                description: exp.description,
                createdAt: exp.created_at
            }));
        } catch (error) {
            console.error('Error getting experiences:', error);
            return [];
        }
    },

    add: async (experience: Omit<Experience, 'id' | 'createdAt'>): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from('user_experiences')
                .insert([{
                    user_id: experience.userId,
                    company: experience.company,
                    position: experience.position,
                    location: experience.location,
                    start_date: experience.startDate,
                    end_date: experience.endDate,
                    current: experience.current,
                    description: experience.description
                }])
                .select()
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error('Error adding experience:', error);
            return null;
        }
    },

    update: async (id: string, experience: Partial<Omit<Experience, 'id' | 'userId' | 'createdAt'>>): Promise<boolean> => {
        try {
            const updateData: any = {};
            if (experience.company) updateData.company = experience.company;
            if (experience.position) updateData.position = experience.position;
            if (experience.location !== undefined) updateData.location = experience.location;
            if (experience.startDate) updateData.start_date = experience.startDate;
            if (experience.endDate !== undefined) updateData.end_date = experience.endDate;
            if (experience.current !== undefined) updateData.current = experience.current;
            if (experience.description !== undefined) updateData.description = experience.description;

            const { error } = await supabase
                .from('user_experiences')
                .update(updateData)
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error updating experience:', error);
            return false;
        }
    },

    delete: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('user_experiences')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting experience:', error);
            return false;
        }
    }
};

export const educationService = {
    getAll: async (userId: string): Promise<Education[]> => {
        try {
            const { data, error } = await supabase
                .from('user_educations')
                .select('*')
                .eq('user_id', userId)
                .order('start_date', { ascending: false });

            if (error) throw error;

            return (data || []).map(edu => ({
                id: edu.id,
                userId: edu.user_id,
                institution: edu.institution,
                degree: edu.degree,
                fieldOfStudy: edu.field_of_study,
                startDate: edu.start_date,
                endDate: edu.end_date,
                createdAt: edu.created_at
            }));
        } catch (error) {
            console.error('Error getting educations:', error);
            return [];
        }
    },

    add: async (education: Omit<Education, 'id' | 'createdAt'>): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from('user_educations')
                .insert([{
                    user_id: education.userId,
                    institution: education.institution,
                    degree: education.degree,
                    field_of_study: education.fieldOfStudy,
                    start_date: education.startDate,
                    end_date: education.endDate
                }])
                .select()
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error('Error adding education:', error);
            return null;
        }
    },

    update: async (id: string, education: Partial<Omit<Education, 'id' | 'userId' | 'createdAt'>>): Promise<boolean> => {
        try {
            const updateData: any = {};
            if (education.institution) updateData.institution = education.institution;
            if (education.degree) updateData.degree = education.degree;
            if (education.fieldOfStudy !== undefined) updateData.field_of_study = education.fieldOfStudy;
            if (education.startDate) updateData.start_date = education.startDate;
            if (education.endDate !== undefined) updateData.end_date = education.endDate;

            const { error } = await supabase
                .from('user_educations')
                .update(updateData)
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error updating education:', error);
            return false;
        }
    },

    delete: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('user_educations')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting education:', error);
            return false;
        }
    }
};

export const skillService = {
    getAll: async (userId: string): Promise<Skill[]> => {
        try {
            const { data, error } = await supabase
                .from('user_skills')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return (data || []).map(skill => ({
                id: skill.id,
                userId: skill.user_id,
                skillName: skill.skill_name,
                level: skill.level,
                createdAt: skill.created_at
            }));
        } catch (error) {
            console.error('Error getting skills:', error);
            return [];
        }
    },

    add: async (skill: Omit<Skill, 'id' | 'createdAt'>): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from('user_skills')
                .insert([{
                    user_id: skill.userId,
                    skill_name: skill.skillName,
                    level: skill.level
                }])
                .select()
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error('Error adding skill:', error);
            return null;
        }
    },

    delete: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('user_skills')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting skill:', error);
            return false;
        }
    }
};

export const languageService = {
    getAll: async (userId: string): Promise<Language[]> => {
        try {
            const { data, error } = await supabase
                .from('user_languages')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return (data || []).map(lang => ({
                id: lang.id,
                userId: lang.user_id,
                language: lang.language,
                proficiency: lang.proficiency,
                createdAt: lang.created_at
            }));
        } catch (error) {
            console.error('Error getting languages:', error);
            return [];
        }
    },

    add: async (language: Omit<Language, 'id' | 'createdAt'>): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from('user_languages')
                .insert([{
                    user_id: language.userId,
                    language: language.language,
                    proficiency: language.proficiency
                }])
                .select()
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error('Error adding language:', error);
            return null;
        }
    },

    delete: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('user_languages')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting language:', error);
            return false;
        }
    }
};

// ==================== ADMIN INTERFACES ====================

export interface Organization {
    id: string;
    name: string;
    domain?: string;
    logo_url?: string;
    created_at: string;
    updated_at: string;
}

export interface AdminUser {
    id: string;
    email: string;
    display_name: string;
    role: 'user' | 'org_admin' | 'super_admin';
    organization_id?: string;
    organization_name?: string;
    created_at: string;
    last_sign_in?: string;
}

export interface UserFilters {
    role?: string;
    organization_id?: string;
    search?: string;
}

export interface CertFilters {
    verified?: boolean;
    type?: string;
    user_id?: string;
    search?: string;
}

// ==================== ADMIN SERVICES ====================

// Organizations Service
export const organizationsService = {
    getAll: async (): Promise<Organization[]> => {
        try {
            const { data, error } = await supabase
                .from('organizations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching organizations:', error);
            return [];
        }
    },

    getById: async (id: string): Promise<Organization | null> => {
        try {
            const { data, error } = await supabase
                .from('organizations')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching organization:', error);
            return null;
        }
    },

    create: async (org: Omit<Organization, 'id' | 'created_at' | 'updated_at'>): Promise<Organization | null> => {
        try {
            const { data, error } = await supabase
                .from('organizations')
                .insert([org])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating organization:', error);
            return null;
        }
    },

    update: async (id: string, updates: Partial<Organization>): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('organizations')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error updating organization:', error);
            return false;
        }
    },

    delete: async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('organizations')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting organization:', error);
            return false;
        }
    }
};

// Admin Users Service
export const adminUsersService = {
    getAll: async (filters?: UserFilters): Promise<AdminUser[]> => {
        try {
            let query = supabase
                .from('profiles')
                .select(`
                    id,
                    email,
                    display_name,
                    role,
                    organization_id,
                    created_at,
                    organizations (
                        name
                    )
                `)
                .order('created_at', { ascending: false });

            if (filters?.role) {
                query = query.eq('role', filters.role);
            }

            if (filters?.organization_id) {
                query = query.eq('organization_id', filters.organization_id);
            }

            if (filters?.search) {
                query = query.or(`email.ilike.%${filters.search}%,display_name.ilike.%${filters.search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            return (data || []).map((user: any) => ({
                id: user.id,
                email: user.email,
                display_name: user.display_name,
                role: user.role,
                organization_id: user.organization_id,
                organization_name: user.organizations?.name,
                created_at: user.created_at
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },

    getById: async (id: string): Promise<AdminUser | null> => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    *,
                    organizations (
                        name
                    )
                `)
                .eq('id', id)
                .single();

            if (error) throw error;

            return {
                id: data.id,
                email: data.email,
                display_name: data.display_name,
                role: data.role,
                organization_id: data.organization_id,
                organization_name: data.organizations?.name,
                created_at: data.created_at
            };
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    },

    updateRole: async (userId: string, role: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role })
                .eq('id', userId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error updating user role:', error);
            return false;
        }
    },

    updateOrganization: async (userId: string, organizationId: string | null): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ organization_id: organizationId })
                .eq('id', userId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error updating user organization:', error);
            return false;
        }
    },

    delete: async (userId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', userId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }
};

// Admin Certificates Service
export const adminCertificatesService = {
    getAll: async (filters?: CertFilters): Promise<Certificate[]> => {
        try {
            let query = supabase
                .from('certificates')
                .select(`
                    *,
                    profiles (
                        email,
                        display_name
                    )
                `)
                .order('created_at', { ascending: false });

            if (filters?.verified !== undefined) {
                query = query.eq('verified', filters.verified);
            }

            if (filters?.type) {
                query = query.eq('type', filters.type);
            }

            if (filters?.user_id) {
                query = query.eq('user_id', filters.user_id);
            }

            if (filters?.search) {
                query = query.or(`name.ilike.%${filters.search}%,issuer.ilike.%${filters.search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            return (data || []).map((cert: any) => ({
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
            console.error('Error fetching certificates:', error);
            return [];
        }
    },

    verify: async (certId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('certificates')
                .update({ verified: true })
                .eq('id', certId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error verifying certificate:', error);
            return false;
        }
    },

    unverify: async (certId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('certificates')
                .update({ verified: false })
                .eq('id', certId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error unverifying certificate:', error);
            return false;
        }
    },

    bulkDelete: async (certIds: string[]): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('certificates')
                .delete()
                .in('id', certIds);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error bulk deleting certificates:', error);
            return false;
        }
    }
};
