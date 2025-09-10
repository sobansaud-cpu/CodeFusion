'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Ban, 
  Search, 
  AlertTriangle, 
  Activity, 
  CreditCard, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  DollarSign,
  UserCheck,
  Shield
} from 'lucide-react';
import { AdminUser, PaymentRequest, AdminStats } from '@/types';

export default function AdminPage() {
  const { user, userProfile } = useAuth();

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    totalGenerations: 0,
    pendingPayments: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminEmail = localStorage.getItem('adminEmail');
    
    if (!adminLoggedIn || adminEmail !== 'sobansaud3@gmail.com') {
      router.push('/admin-login');
      return;
    }
    loadData();
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const loadData = async () => {
    try {
      // Fetch real data from API endpoints
      const [usersResponse, paymentsResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/payments'),
        fetch('/api/admin/stats')
      ]);

      if (!usersResponse.ok || !paymentsResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch admin data');
      }

      const usersData = await usersResponse.json();
      const paymentsData = await paymentsResponse.json();
      const statsData = await statsResponse.json();

      setUsers(usersData.users);
      setPayments(paymentsData.payments);
      setStats(statsData.stats);
    } catch (error) {
      console.error('Error loading admin data:', error);
      // Fallback to empty data
      setUsers([]);
      setPayments([]);
      setStats({
        totalUsers: 0,
        premiumUsers: 0,
        freeUsers: 0,
        totalGenerations: 0,
        pendingPayments: 0,
        totalRevenue: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const banUser = (userId: string) => {
    if (confirm('Are you sure you want to ban this user?')) {
      setUsers(prev =>
        prev.map(u => (u.uid === userId ? { ...u, isBanned: true } : u))
      );
    }
  };

  const unbanUser = (userId: string) => {
    setUsers(prev =>
      prev.map(u => (u.uid === userId ? { ...u, isBanned: false } : u))
    );
  };

  const approvePayment = async (paymentId: string) => {
    if (confirm('Approve this payment and upgrade user to premium?')) {
      try {
        const adminEmail = localStorage.getItem('adminEmail') || 'admin@websitebuilder.com';
        
        const response = await fetch('/api/payment-status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId,
            status: 'approved',
            adminEmail,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to approve payment');
        }

        // Update local state
        setPayments(prev =>
          prev.map(p => 
            p.id === paymentId 
              ? { ...p, status: 'approved', processedAt: new Date().toISOString(), processedBy: adminEmail }
              : p
          )
        );
        
        // Update user plan to premium
        const payment = payments.find(p => p.id === paymentId);
        if (payment) {
          setUsers(prev =>
            prev.map(u => 
              u.uid === payment.userId 
                ? { ...u, plan: payment.plan as 'pro' | 'unlimited' }
                : u
            )
          );
        }
        
        // Update stats
        setStats(prev => ({
          ...prev,
          pendingPayments: prev.pendingPayments - 1,
          totalRevenue: prev.totalRevenue + (payment?.amount || 0),
          premiumUsers: prev.premiumUsers + 1,
          freeUsers: prev.freeUsers - 1
        }));

        alert('Payment approved successfully!');
      } catch (error) {
        console.error('Error approving payment:', error);
        alert('Error approving payment. Please try again.');
      }
    }
  };

  const rejectPayment = async (paymentId: string) => {
    if (confirm('Reject this payment request?')) {
      try {
        const adminEmail = localStorage.getItem('adminEmail') || 'admin@websitebuilder.com';
        
        const response = await fetch('/api/payment-status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId,
            status: 'rejected',
            adminEmail,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to reject payment');
        }

        // Update local state
        setPayments(prev =>
          prev.map(p => 
            p.id === paymentId 
              ? { ...p, status: 'rejected', processedAt: new Date().toISOString(), processedBy: adminEmail }
              : p
          )
        );
        
        setStats(prev => ({
          ...prev,
          pendingPayments: prev.pendingPayments - 1
        }));

        alert('Payment rejected successfully!');
      } catch (error) {
        console.error('Error rejecting payment:', error);
        alert('Error rejecting payment. Please try again.');
      }
    }
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.displayName && u.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPayments = payments.filter(p =>
    p.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if admin is logged in (client-side only)
  const [adminLoggedIn, setAdminLoggedIn] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    setAdminLoggedIn(localStorage.getItem('adminLoggedIn'));
    setAdminEmail(localStorage.getItem('adminEmail'));
  }, []);

  if (adminLoggedIn === null || adminEmail === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!adminLoggedIn || adminEmail !== 'admin@websitebuilder.com') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
          <Button 
            onClick={() => router.push('/admin-login')}
            className="mt-4"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/logostart.png"
            alt="Logo"
            className="h-40 w-40 animate-spin-slow mb-8 drop-shadow-2xl"
            style={{ animation: 'spin 2s linear infinite' }}
          />
          <h1 className="text-5xl font-extrabold text-white animate-bounce mb-4" style={{ letterSpacing: '2px' }}>
            Welcome to CodeFusion AI
          </h1>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin 2s linear infinite;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            .animate-bounce {
              animation: bounce 1s infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Logo at the top */}
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <img src="/logostart.png" alt="Website Logo" style={{ height: '60px', objectFit: 'contain' }} />
      </div> */}
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Manage users, payments, and system statistics</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-blue-500" />
                  <span className="text-white font-medium">Admin Access</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    localStorage.removeItem('adminLoggedIn');
                    localStorage.removeItem('adminEmail');
                    router.push('/admin-login');
                  }}
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              label="Total Users" 
              value={stats.totalUsers} 
              icon={<Users className="h-8 w-8 text-blue-500" />} 
            />
            <StatCard 
              label="Premium Users" 
              value={stats.premiumUsers} 
              icon={<UserCheck className="h-8 w-8 text-green-500" />} 
              textColor="text-green-400" 
            />
            <StatCard 
              label="Pending Payments" 
              value={stats.pendingPayments} 
              icon={<AlertTriangle className="h-8 w-8 text-yellow-500" />} 
              textColor="text-yellow-400" 
            />
            <StatCard 
              label="Total Revenue" 
              value={`$${stats.totalRevenue}`} 
              icon={<DollarSign className="h-8 w-8 text-purple-500" />} 
              textColor="text-purple-400" 
            />
          </div>

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users or payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
              <TabsTrigger value="users" className="text-white">Users</TabsTrigger>
              <TabsTrigger value="payments" className="text-white">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white text-sm">New user registered</p>
                          <p className="text-gray-400 text-xs">user6@example.com</p>
                        </div>
                        <span className="text-gray-500 text-xs">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Payment received</p>
                          <p className="text-gray-400 text-xs">$20 from user4@example.com</p>
                        </div>
                        <span className="text-gray-500 text-xs">4 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Website generated</p>
                          <p className="text-gray-400 text-xs">Portfolio site by user2@example.com</p>
                        </div>
                        <span className="text-gray-500 text-xs">6 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white text-sm">EasyPaisa</p>
                          <p className="text-gray-400 text-xs">03232204085</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white text-sm">JazzCash</p>
                          <p className="text-gray-400 text-xs">03232204085</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Stripe</p>
                          <p className="text-gray-400 text-xs">Credit Cards</p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div key={user.uid} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-white font-medium">{user.email}</span>
                            <Badge variant={user.plan === 'free' ? 'secondary' : 'default'}>
                              {user.plan}
                            </Badge>
                            {user.isBanned && <Badge variant="destructive">Banned</Badge>}
                          </div>
                          <div className="text-gray-400 text-sm space-y-1">
                            <p>Name: {user.displayName || 'N/A'}</p>
                            <p>Sites: {user.sitesUsed} | Generations: {user.totalGenerations}</p>
                            <p>Joined: {new Date(user.createdAt).toLocaleDateString()} | Last Active: {new Date(user.lastActive).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {user.isBanned ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => unbanUser(user.uid)}
                              className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black"
                            >
                              Unban
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => banUser(user.uid)}
                              className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black"
                            >
                              Ban
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Payment Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredPayments.map((payment) => (
                      <div key={payment.id} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-white font-medium">{payment.userEmail}</span>
                              <Badge variant={payment.paymentMethod === 'polar' ? 'default' : 'secondary'}>
                                {payment.paymentMethod.toUpperCase()}
                              </Badge>
                              <Badge variant={payment.status === 'pending' ? 'secondary' : payment.status === 'approved' ? 'default' : 'destructive'}>
                                {payment.status}
                              </Badge>
                            </div>
                            <div className="text-gray-400 text-sm space-y-1">
                              <p>Amount: ${payment.amount} | Plan: {payment.plan}</p>
                              <p>Account: {payment.accountName} ({payment.accountNumber})</p>
                              <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {payment.screenshotUrl && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-blue-400 border-blue-400"
                                onClick={() => {
                                  // Open screenshot in new window
                                  const newWindow = window.open('', '_blank');
                                  if (newWindow) {
                                    newWindow.document.write(`
                                      <html>
                                        <head>
                                          <title>Payment Screenshot - ${payment.userEmail}</title>
                                          <style>
                                            body { margin: 0; padding: 20px; background: #1f2937; color: white; font-family: Arial, sans-serif; }
                                            .header { text-align: center; margin-bottom: 20px; }
                                            .screenshot { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
                                            .details { background: #374151; padding: 20px; border-radius: 8px; margin-top: 20px; }
                                          </style>
                                        </head>
                                        <body>
                                          <div class="header">
                                            <h1>Payment Screenshot</h1>
                                            <p>User: ${payment.userEmail}</p>
                                            <p>Amount: $${payment.amount}</p>
                                            <p>Method: ${payment.paymentMethod.toUpperCase()}</p>
                                          </div>
                                          <img src="${payment.screenshotUrl}" alt="Payment Screenshot" class="screenshot" />
                                          <div class="details">
                                            <h3>Payment Details:</h3>
                                            <p><strong>User Email:</strong> ${payment.userEmail}</p>
                                            <p><strong>Amount:</strong> $${payment.amount}</p>
                                            <p><strong>Plan:</strong> ${payment.plan}</p>
                                            <p><strong>Payment Method:</strong> ${payment.paymentMethod.toUpperCase()}</p>
                                            <p><strong>Account:</strong> ${payment.accountName} (${payment.accountNumber})</p>
                                            <p><strong>Date:</strong> ${new Date(payment.createdAt).toLocaleString()}</p>
                                          </div>
                                        </body>
                                      </html>
                                    `);
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Screenshot
                              </Button>
                            )}
                            {payment.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => approvePayment(payment.id)}
                                  className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => rejectPayment(payment.id)}
                                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, textColor = 'text-white' }: { 
  label: string; 
  value: string | number; 
  icon: React.ReactNode; 
  textColor?: string; 
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
          </div>
          <img src="/logostart.png" alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        </div>
      </CardContent>
    </Card>
  );
}
