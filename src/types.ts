export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  plan: 'free' | 'pro' | 'unlimited';
  dailyGenerations: number;
  maxDailyGenerations: number;
  lastGenerationDate: string; // ISO date string
  planExpiry?: string; // ISO date string
  maxSites: number;
  sitesUsed: number;
  createdAt: string; // ISO date string
}

export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  prompt: string;
  files: ProjectFile[];
  framework: string;
  theme: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isBackendOnly?: boolean;
  userId?: string;
  projectType?: 'frontend' | 'backend' | 'fullstack';
  frontendFramework?: string;
  backendFramework?: string;
  databaseType?: string;
  setupInstructions?: string;
  deploymentGuide?: string;
}

// New types for admin functionality
export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  plan: 'free' | 'pro' | 'unlimited';
  sitesUsed: number;
  totalGenerations: number;
  createdAt: string;
  lastActive: string;
  isBanned: boolean;
}

export interface PaymentRequest {
  id: string;
  userId: string;
  userEmail: string;
  paymentMethod: 'easypaisa' | 'jazzcash' | 'polar';
  amount: number;
  plan: 'pro' | 'unlimited';
  status: 'pending' | 'approved' | 'rejected';
  screenshotUrl?: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  processedAt?: string;
  processedBy?: string;
}

export interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  totalGenerations: number;
  pendingPayments: number;
  totalRevenue: number;
}