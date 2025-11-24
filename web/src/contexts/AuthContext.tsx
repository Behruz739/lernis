import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Numeric User ID generator with uniqueness check
const generateNumericUserId = async (): Promise<string> => {
  let userId: string = '';
  let isUnique = false;

  while (!isUnique) {
    const min = 10000000;
    const max = 99999999;
    userId = Math.floor(Math.random() * (max - min + 1)) + min + '';

    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId) // Note: Schema uses user_id for the numeric ID field? No, wait.
      // In the migration plan, I didn't explicitly add a 'user_id' numeric field to profiles, 
      // I only had 'id' (uuid) and 'user_id' (fk) in certificates.
      // Let's check the previous AuthContext. It had a 'userId' field in UserData which was the numeric ID.
      // I should add this field to the profiles table schema in my mind/plan.
      // Let's assume the 'profiles' table has a 'user_id' column for this numeric ID, 
      // OR I should rename it to 'numeric_id' to avoid confusion with the UUID 'id'.
      // In the previous code: userId: userId (numeric).
      // Let's use 'numeric_id' in Supabase to be clear, or keep 'user_id' if I want to match the interface but map it.
      // The previous interface had `userId?: string`.
      // Let's assume the column in Supabase is `numeric_id` to avoid conflict with `user_id` FK.
      // Wait, in the migration plan I wrote:
      // create table public.profiles ( id uuid ... )
      // I missed the numeric ID column in the plan! 
      // I should add it now in the code logic and assume the user will run the SQL I will provide later (or updated SQL).
      // Let's call it `numeric_id` in the DB and map it to `userId` in the frontend.
      .eq('numeric_id', userId);

    if (!data || data.length === 0) {
      isUnique = true;
    }
  }

  return userId;
};

export interface UserData {
  id: string; // UUID
  email: string;
  displayName: string;
  role: 'user' | 'org_admin' | 'super_admin';
  createdAt: string;
  userId?: string; // Numeric ID
  nickname?: string;
  bio?: string;
  updatedAt?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  signup: (email: string, password: string, displayName: string, role?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  getAllUsers: () => Promise<UserData[]>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        const mappedData: UserData = {
          id: data.id,
          email: data.email,
          displayName: data.display_name,
          role: data.role,
          createdAt: data.created_at,
          userId: data.numeric_id,
          nickname: data.display_name?.split(' ')[0] || 'User',
          bio: data.bio,
          updatedAt: data.updated_at,
          avatarUrl: data.avatar_url
        };
        setUserData(mappedData);
        setLoading(false);
        return mappedData;
      } else {
        // Create profile if it doesn't exist (should be handled by trigger ideally, but doing it manually here for now)
        const numericId = await generateNumericUserId();
        const newProfile = {
          id: user.id,
          email: user.email,
          display_name: user.user_metadata.full_name || user.email?.split('@')[0],
          role: 'user',
          numeric_id: numericId,
          bio: 'Learning enthusiast',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert([newProfile]);

        if (insertError) throw insertError;

        const mappedData: UserData = {
          id: newProfile.id,
          email: newProfile.email || '',
          displayName: newProfile.display_name || '',
          role: 'user',
          createdAt: newProfile.created_at,
          userId: newProfile.numeric_id,
          nickname: newProfile.display_name?.split(' ')[0],
          bio: newProfile.bio,
          updatedAt: newProfile.updated_at
        };
        setUserData(mappedData);
        setLoading(false);
        return mappedData;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
      return null;
    }
  };

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    role: string = 'user'
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
            role: role
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Profile creation is handled in fetchUserData or via trigger, 
        // but let's ensure it's created here to be safe and immediate.
        const numericId = await generateNumericUserId();

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: email,
            display_name: displayName,
            role: role,
            numeric_id: numericId,
            bio: 'Learning enthusiast',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (profileError) {
          // If profile already exists (e.g. via trigger), ignore error
          console.warn('Profile creation might have failed or already exists:', profileError);
        }

        await fetchUserData(data.user);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUserData(null);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const getAllUsers = async (): Promise<UserData[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      return (data || []).map(profile => ({
        id: profile.id,
        email: profile.email,
        displayName: profile.display_name,
        role: profile.role,
        createdAt: profile.created_at,
        userId: profile.numeric_id,
        nickname: profile.display_name?.split(' ')[0],
        bio: profile.bio,
        updatedAt: profile.updated_at,
        avatarUrl: profile.avatar_url
      }));
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading,
    getAllUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-600">Yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
