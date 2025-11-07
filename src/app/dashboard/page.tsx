'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Loader2, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Download, 
  Github, 
  Play,
  Code,
  FileText,
  Calendar,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { deleteProject, getProjects } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';

interface Project {
  id: string;
  name: string;
  prompt: string;
  framework: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await getProjects(user.uid);
        if (response.success) {
          setProjects(response.projects);
        } else {
          toast.error('Failed to load projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, router]);

  // Debounced search effect
  useEffect(() => {
    setSearchLoading(true);
    const timer = setTimeout(() => {
      setSearchLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFramework]);

  const handleDelete = async (projectId: string) => {
    try {
      setDeletingId(projectId);
      const response = await deleteProject(projectId);
      
      if (response.success) {
        setProjects(projects.filter(p => p.id !== projectId));
        toast.success('Project deleted successfully');
        setShowDeleteDialog(null);
      } else {
        throw new Error(response.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFrameworkBadge = (framework: string | null | undefined) => {
    // Handle null/undefined framework values
    if (!framework) {
      return (
        <Badge className="bg-gray-500 text-white text-xs px-2 py-1">
          UNKNOWN
        </Badge>
      );
    }
    
    const colors: Record<string, string> = {
      react: 'bg-blue-500 hover:bg-blue-600',
      nextjs: 'bg-black hover:bg-gray-800',
      vue: 'bg-green-500 hover:bg-green-600',
      angular: 'bg-red-500 hover:bg-red-600',
      html: 'bg-orange-500 hover:bg-orange-600',
      python: 'bg-yellow-500 hover:bg-yellow-600 text-black',
      nodejs: 'bg-green-700 hover:bg-green-800',
      php: 'bg-purple-500 hover:bg-purple-600',
      svelte: 'bg-red-600 hover:bg-red-700',
      go: 'bg-blue-600 hover:bg-blue-700',
      java: 'bg-red-700 hover:bg-red-800',
    };
    
    return (
      <Badge className={`${colors[framework] || 'bg-gray-500'} text-white text-xs px-2 py-1`}>
        {framework.toUpperCase()}
      </Badge>
    );
  };

  const filteredProjects = projects.filter(project => {
    // Ensure project has required properties before filtering
    if (!project.name || !project.prompt || !project.framework) {
      return false; // Skip projects with missing data
    }
    
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = selectedFramework === 'all' || project.framework === selectedFramework;
    return matchesSearch && matchesFramework;
  });

  const frameworks = ['all', ...Array.from(new Set(projects.map(p => p.framework).filter(Boolean)))];

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0a0a13] via-[#181825] to-[#0a0a13] text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#181825]/80 via-transparent to-transparent backdrop-blur-xl border-b border-[#232336]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-900 via-indigo-600 to-blue-900 rounded-lg flex items-center justify-center shadow-md">
              <img 
              src="/CODEFUSION.png" 
              alt="CodeFusionAI Logo" 
              className="h-10 w-10 rounded-full shadow-md transition-all duration-300 group-hover:shadow-purple-500/50"
              />  
              </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-100">CodeFusion</h1>
              </div>
              <span className="text-cyan-300/60">|</span>
              <span className="text-cyan-200 font-medium">Dashboard</span>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild className="border-cyan-700 text-cyan-200">
                <Link href="/builder">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500">
                <Link href="/builder">
                  <Zap className="w-4 h-4 mr-2 text-white" />
                  Generate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2">
                Welcome back, {userProfile?.displayName || user.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-cyan-200 text-base max-w-xl">
                Manage your AI-generated websites and create amazing new projects
              </p>
              {/* Mobile Buttons Below Title */}
              <div className="flex flex-col sm:hidden w-full gap-2 mt-4">
                <Button variant="outline" size="sm" asChild className="w-full border-cyan-700 text-cyan-200">
                  <Link href="/builder">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Link>
                </Button>
                <Button size="sm" asChild className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500">
                  <Link href="/builder">
                    <Zap className="w-4 h-4 mr-2 text-white" />
                    Generate
                  </Link>
                </Button>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="flex flex-row w-full md:w-auto space-x-2 sm:space-x-4 mt-4 md:mt-0 justify-start md:justify-end">
              <Card className="w-1/2 sm:w-28 text-center bg-[#181825] border border-cyan-800">
                <CardContent className="pt-4">
                  <div className="text-xl font-bold text-cyan-400">{projects.length}</div>
                  <div className="text-xs text-cyan-200">Projects</div>
                </CardContent>
              </Card>
              <Card className="w-1/2 sm:w-28 text-center bg-[#181825] border border-cyan-800">
                <CardContent className="pt-4">
                  <div className="text-xl font-bold text-green-400">
                    {userProfile?.plan === 'pro' ? '20' : '3'}
                  </div>
                  <div className="text-xs text-cyan-200">Daily Limit</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="mb-8">
          <Card className="bg-[#181825] border border-cyan-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-full flex items-center justify-center shadow-md">
                    {userProfile?.plan === 'pro' ? (
                      <Crown className="w-6 h-6 text-white" />
                    ) : (
                      <Star className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-100">
                      {userProfile?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                    </h3>
                    <p className="text-cyan-200 text-sm">
                      {userProfile?.plan === 'pro' 
                        ? 'Unlimited projects with 20 generations per day' 
                        : 'Upgrade to Pro for unlimited projects and 20 generations per day'
                      }
                    </p>
                  </div>
                </div>
                {userProfile?.plan !== 'pro' && (
                  <Button className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                    <Link href="/payment-selection"></Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between w-full">
            <div className="flex-1 w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                <Input
                  placeholder="Search projects by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0b1220] border border-blue-800 focus:border-indigo-500 focus:ring-indigo-500 text-blue-100 placeholder-blue-300 font-medium"
                  style={{
                    color: searchTerm ? '#e6eef8' : '#9fb0c9',
                    fontWeight: searchTerm ? '600' : '500'
                  }}
                />
                {searchLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  </div>
                )}
                {!searchLoading && searchTerm && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-blue-300 bg-[#071024]/40 px-2 py-1 rounded-full">
                      {filteredProjects.length} found
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto mt-3 sm:mt-0">
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="px-4 py-2.5 border border-blue-800 rounded-lg bg-[#071024] text-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium shadow-sm hover:border-blue-700 transition-colors"
              >
                {frameworks.map(framework => (
                  <option key={framework} value={framework} className="bg-[#071024] text-blue-100">
                    {framework === 'all' 
  ? '🌐 All Frameworks' 
  : `⚡ ${(framework || 'unknown').toString().toUpperCase()}`}

                  </option>
                ))}
              </select>
              
              <div className="flex border border-blue-800 rounded-lg bg-[#071024] shadow-sm overflow-hidden w-full sm:w-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 w-1/2 sm:w-auto transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-[#0b1220] text-indigo-300 border-r border-blue-800' 
                      : 'text-blue-300 hover:bg-[#071024]/60'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 w-1/2 sm:w-auto transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-[#0b1220] text-indigo-300' 
                      : 'text-blue-300 hover:bg-[#071024]/60'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-gray-100">
                Your Projects ({filteredProjects.length})
              </h2>
              {(searchTerm || selectedFramework !== 'all') && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                    🔍 Filtered
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedFramework('all');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
            <Button asChild>
              <Link href="/builder">
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-indigo-400" />
                <p className="text-blue-200">Loading your projects...</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="text-center py-16 bg-[#0b1220] border border-blue-800">
              <CardContent>
                <div className="mx-auto h-24 w-24 text-blue-300 mb-4">
                  {searchTerm || selectedFramework !== 'all' ? (
                    <Search className="w-full h-full" />
                  ) : (
                    <Code className="w-full h-full" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {searchTerm || selectedFramework !== 'all' ? 'No projects found' : 'No projects yet'}
                </h3>
                <p className="text-blue-200 mb-6">
                  {searchTerm || selectedFramework !== 'all' 
                    ? `No projects match your search "${searchTerm}" or framework "${selectedFramework}". Try adjusting your filters.`
                    : 'Start building amazing websites with AI. Your first project is just a prompt away!'
                  }
                </p>
                {searchTerm || selectedFramework !== 'all' ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedFramework('all');
                    }}
                    className="text-blue-200 border-blue-700"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Link href="/builder">
                      <Sparkles className="w-4 h-4 mr-2 text-white" />
                      Create Your First Project
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}>
              {filteredProjects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-xl transition-all duration-200 bg-[#181825] border border-cyan-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          {getFrameworkBadge(project.framework)}
                          <span className="text-xs text-blue-300">
                            {formatDate(project.createdAt)}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4 text-blue-200" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#071024] border border-blue-800">
                          <DropdownMenuItem asChild>
                            <Link href={`/builder?edit=${project.id}`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Project
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            {/* <Link href={`/preview/${project.id}`} target="_blank">
                              <Eye className="w-4 h-4 mr-2" />
                              View Live
                            </Link> */}
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/builder?view=${project.id}`}>
                              <Code className="w-4 h-4 mr-2" />
                              View Code
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/builder?download=${project.id}`}>
                              <Download className="w-4 h-4 mr-2" />
                              Download ZIP
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/builder?github=${project.id}`}>
                              <Github className="w-4 h-4 mr-2" />
                              Push to GitHub
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                        <p className="text-cyan-200 text-xs line-clamp-2 mb-4">
                      {project.prompt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-cyan-300">
                        <Calendar className="w-3 h-3" />
                        <span>Created {formatDate(project.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1 border-cyan-700 text-cyan-200" asChild>
                        <Link href={`/builder?edit=${project.id}`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      {/* <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/preview/${project.id}`} target="_blank">
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Link>
                      </Button> */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-400 hover:text-red-500 hover:bg-red-900/30 border-red-800"
                        onClick={() => setShowDeleteDialog(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-100 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Link href="/builder">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group bg-[#181825] border border-cyan-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Generate New Website</h4>
                      <p className="text-xs text-cyan-200">Create a new AI-powered website</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:text-cyan-400 transition-colors ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/tutorials">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group bg-[#181825] border border-cyan-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">View Tutorials</h4>
                      <p className="text-xs text-cyan-200">Learn how to use CodeFusion</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:text-emerald-300 transition-colors ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/pricing">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group bg-[#181825] border border-cyan-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <img src="/logostart.png" alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Upgrade Plan</h4>
                      <p className="text-xs text-cyan-200">Get unlimited generations</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:text-cyan-400 transition-colors ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
  <DialogContent className="bg-[#181825] border border-cyan-800 text-cyan-100">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Project</DialogTitle>
            <DialogDescription className="text-blue-200">
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowDeleteDialog(null)} className="text-blue-200 border-blue-700">
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => showDeleteDialog && handleDelete(showDeleteDialog)}
              disabled={deletingId === showDeleteDialog}
              className="bg-red-600 hover:bg-red-700 border-red-700"
            >
              {deletingId === showDeleteDialog ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


