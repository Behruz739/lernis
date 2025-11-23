import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Types
export interface Certificate {
  id?: string;
  name: string;
  issuer: string;
  description: string;
  date: string;
  type: 'certificate' | 'diploma' | 'badge';
  image: string;
  verified: boolean;
  hash: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Achievement {
  id?: string;
  name: string;
  description: string;
  type: 'badge' | 'sticker' | 'award';
  image: string;
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Transaction {
  id?: string;
  type: 'mint' | 'transfer' | 'verify' | 'claim';
  description: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  time: string;
  hash: string;
  gas: string;
  amount?: string;
  currency?: string;
  from?: string;
  to?: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Student {
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  course: string;
  progress: number;
  status: 'active' | 'completed' | 'inactive';
  joinDate: string;
  lastActive: string;
  certificates: number;
  achievements: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Teacher {
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  courses: string[];
  students: number;
  rating: number;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
  certificatesIssued: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AnalyticsData {
  id?: string;
  totalStudents: number;
  totalTeachers: number;
  totalCertificates: number;
  activeCourses: number;
  completionRate: number;
  monthlyGrowth: number;
  weeklyActivity: number;
  topCourses: { name: string; students: number; completion: number }[];
  recentActivity: { action: string; course: string; time: string; type: string }[];
  monthlyData: { month: string; students: number; certificates: number }[];
  departmentStats: { department: string; students: number; teachers: number }[];
  enrollmentTrends: { date: string; enrollments: number }[];
  certificateTrends: { date: string; issued: number }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface WaitlistEntry {
  id?: string;
  email: string;
  source?: string;
  userId?: string;
  metadata?: Record<string, any>;
  createdAt: Timestamp;
}

export interface ResearchPaper {
  id?: string;
  title: string;
  abstract: string;
  authors: string[];
  publicationDate: string;
  journal?: string;
  doi?: string;
  tags: string[];
  fileUrl?: string;
  userId: string;
  views: number;
  citations: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  summary: string;
  coverImage?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  published: boolean;
  likes: number;
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CommunityPost {
  id?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  images?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id?: string;
  postId: string;
  postType: 'blog' | 'community';
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Simple cache for Firebase queries
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const createFirestoreService = <T>(collectionName: string) => ({
  async getAll(userId?: string): Promise<T[]> {
    try {
      let q;
      if (userId) {
        q = query(collection(db, collectionName), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      }
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as T[];
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
      return [];
    }
  },

  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const snap = await getDoc(docRef);
      return snap.exists() ? ({ id: snap.id, ...(snap.data() as any) } as T) : null;
    } catch (error) {
      console.error(`Error fetching ${collectionName} item:`, error);
      return null;
    }
  },

  async add(item: any): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...item,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error adding to ${collectionName}:`, error);
      return null;
    }
  },

  async update(id: string, data: any): Promise<boolean> {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
      return true;
    } catch (error) {
      console.error(`Error updating ${collectionName}:`, error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return true;
    } catch (error) {
      console.error(`Error deleting from ${collectionName}:`, error);
      return false;
    }
  }
});

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Certificate Service
export const certificateService = {
  // Get all certificates for a user
  async getCertificates(userId: string): Promise<Certificate[]> {
    const cacheKey = `certificates_${userId}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const q = query(
        collection(db, 'certificates'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Certificate[];

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error getting certificates:', error);
      return [];
    }
  },

  // Get single certificate
  async getCertificate(id: string): Promise<Certificate | null> {
    try {
      const docRef = doc(db, 'certificates', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Certificate;
      }
      return null;
    } catch (error) {
      console.error('Error getting certificate:', error);
      return null;
    }
  },

  // Add new certificate
  async addCertificate(certificate: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, 'certificates'), {
        ...certificate,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding certificate:', error);
      return null;
    }
  },

  // Update certificate
  async updateCertificate(id: string, updates: Partial<Certificate>): Promise<boolean> {
    try {
      const docRef = doc(db, 'certificates', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating certificate:', error);
      return false;
    }
  }
};

// Achievement Service
export const achievementService = {
  // Get all achievements for a user
  async getAchievements(userId: string): Promise<Achievement[]> {
    const cacheKey = `achievements_${userId}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const q = query(
        collection(db, 'achievements'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Achievement[];

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error getting achievements:', error);
      return [];
    }
  },

  // Add new achievement
  async addAchievement(achievement: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, 'achievements'), {
        ...achievement,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding achievement:', error);
      return null;
    }
  }
};

// Transaction Service
export const transactionService = {
  // Get all transactions for a user
  async getTransactions(userId: string): Promise<Transaction[]> {
    const cacheKey = `transactions_${userId}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  // Add new transaction
  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, 'transactions'), {
        ...transaction,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding transaction:', error);
      return null;
    }
  }
};

// User Service
export const userService = {
  // Get all users
  async getAllUsers(): Promise<any[]> {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  // Get user by ID
  async getUserById(userId: string): Promise<any | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  },

  // Search users
  async searchUsers(query: string, limitCount: number = 10): Promise<any[]> {
    try {
      const users = await this.getAllUsers();
      const searchQuery = query.toLowerCase();

      const filteredUsers = users.filter(user => {
        return (
          user.id?.toLowerCase().includes(searchQuery) ||
          user.email?.toLowerCase().includes(searchQuery) ||
          user.displayName?.toLowerCase().includes(searchQuery)
        );
      });

      return filteredUsers.slice(0, limitCount);
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }
};

// Student Service
export const studentService = {
  // Get all students
  async getStudents(): Promise<Student[]> {
    const cacheKey = 'students_all';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const q = query(
        collection(db, 'students'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error getting students:', error);
      return [];
    }
  },

  // Add new student
  async addStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, 'students'), {
        ...student,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding student:', error);
      return null;
    }
  },

  // Update student
  async updateStudent(id: string, updates: Partial<Student>): Promise<boolean> {
    try {
      const docRef = doc(db, 'students', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating student:', error);
      return false;
    }
  }
};

// Teacher Service
export const teacherService = {
  // Get all teachers
  async getTeachers(): Promise<Teacher[]> {
    const cacheKey = 'teachers_all';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const q = query(
        collection(db, 'teachers'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Teacher[];

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error getting teachers:', error);
      return [];
    }
  },

  // Add new teacher
  async addTeacher(teacher: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, 'teachers'), {
        ...teacher,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding teacher:', error);
      return null;
    }
  },

  // Update teacher
  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<boolean> {
    try {
      const docRef = doc(db, 'teachers', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating teacher:', error);
      return false;
    }
  }
};

// Analytics Service
export const analyticsService = {
  // Get analytics data
  async getAnalytics(): Promise<AnalyticsData | null> {
    const cacheKey = 'analytics_data';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const docRef = doc(db, 'analytics', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = { id: docSnap.id, ...docSnap.data() } as AnalyticsData;
        setCachedData(cacheKey, result);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error getting analytics:', error);
      return null;
    }
  },

  // Calculate real-time analytics
  async calculateRealTimeAnalytics(): Promise<AnalyticsData> {
    try {
      const [students, teachers, certificates] = await Promise.all([
        studentService.getStudents(),
        teacherService.getTeachers(),
        getDocs(collection(db, 'certificates'))
      ]);

      const totalStudents = students.length;
      const totalTeachers = teachers.length;
      const totalCertificates = certificates.size;
      const activeCourses = new Set(certificates.docs.map(doc => doc.data().name)).size;

      const completedStudents = students.filter(s => s.status === 'completed').length;
      const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0;

      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const monthlyGrowth = students.filter(s =>
        new Date(s.joinDate) >= monthAgo
      ).length;

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const weeklyActivity = students.filter(s =>
        new Date(s.lastActive) >= weekAgo
      ).length;

      // Top courses
      const courseStats = new Map<string, { students: number; completions: number }>();
      students.forEach(student => {
        const current = courseStats.get(student.course) || { students: 0, completions: 0 };
        current.students++;
        if (student.status === 'completed') current.completions++;
        courseStats.set(student.course, current);
      });

      const topCourses = Array.from(courseStats.entries())
        .map(([name, stats]) => ({
          name,
          students: stats.students,
          completion: stats.students > 0 ? Math.round((stats.completions / stats.students) * 100) : 0
        }))
        .sort((a, b) => b.students - a.students)
        .slice(0, 5);

      const analyticsData: AnalyticsData = {
        totalStudents,
        totalTeachers,
        totalCertificates,
        activeCourses,
        completionRate,
        monthlyGrowth,
        weeklyActivity,
        topCourses,
        recentActivity: [],
        monthlyData: [],
        departmentStats: [],
        enrollmentTrends: [],
        certificateTrends: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await this.updateAnalytics(analyticsData);
      return analyticsData;
    } catch (error) {
      console.error('Error calculating real-time analytics:', error);
      throw error;
    }
  },

  // Update analytics
  async updateAnalytics(analytics: AnalyticsData): Promise<boolean> {
    try {
      const docRef = doc(db, 'analytics', 'main');
      await setDoc(docRef, {
        ...analytics,
        updatedAt: Timestamp.now()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating analytics:', error);
      return false;
    }
  }
};

// Waitlist Service
export const waitlistService = {
  async addWaitlistEntry(entry: { email: string; source?: string; userId?: string; metadata?: Record<string, any> }): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'waitlist'), {
        email: entry.email,
        source: entry.source || 'landing',
        userId: entry.userId || null,
        metadata: entry.metadata || {},
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding waitlist entry:', error);
      return null;
    }
  },

  async getWaitlistEntries(limitCount: number = 50): Promise<WaitlistEntry[]> {
    try {
      const q = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'), limit(limitCount));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as WaitlistEntry[];
    } catch (error) {
      console.error('Error fetching waitlist entries:', error);
      return [];
    }
  }
};

export const researchService = createFirestoreService<ResearchPaper>('research_papers');
export const blogService = createFirestoreService<BlogPost>('blog_posts');

export const communityService = {
  ...createFirestoreService<CommunityPost>('community_posts'),

  async getComments(postId: string): Promise<Comment[]> {
    try {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Comment[];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  async addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        ...comment,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Increment comment count on post
      const collectionName = comment.postType === 'blog' ? 'blog_posts' : 'community_posts';
      const postRef = doc(db, collectionName, comment.postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const currentCount = postSnap.data().commentsCount || 0;
        await updateDoc(postRef, {
          commentsCount: currentCount + 1
        });
      }

      return docRef.id;
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  }
};

// Demo data seeding (simplified - no NFT/Wallet data)
export const seedDemoData = async (userId: string) => {
  try {
    const demoCertificates: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Web Development Bootcamp',
        issuer: 'Tech University',
        description: 'Complete web development course covering HTML, CSS, JavaScript, and React',
        date: '2024-01-15',
        type: 'certificate',
        image: '/api/placeholder/200/150',
        verified: true,
        hash: '0x1234...5678',
        userId
      },
      {
        name: 'Data Science Fundamentals',
        issuer: 'Tech University',
        description: 'Introduction to data science, machine learning, and statistical analysis',
        date: '2024-01-10',
        type: 'certificate',
        image: '/api/placeholder/200/150',
        verified: true,
        hash: '0x9876...5432',
        userId
      }
    ];

    const demoAchievements: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'First Certificate',
        description: 'Received your first certificate',
        type: 'badge',
        image: '/api/placeholder/100/100',
        date: '2024-01-15',
        rarity: 'common',
        points: 10,
        userId
      },
      {
        name: 'Top Performer',
        description: 'Achieved 95%+ in all courses',
        type: 'badge',
        image: '/api/placeholder/100/100',
        date: '2024-01-10',
        rarity: 'rare',
        points: 50,
        userId
      }
    ];

    for (const cert of demoCertificates) {
      await certificateService.addCertificate(cert);
    }

    for (const achievement of demoAchievements) {
      await achievementService.addAchievement(achievement);
    }

    console.log('Demo data seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding demo data:', error);
    return false;
  }
};
