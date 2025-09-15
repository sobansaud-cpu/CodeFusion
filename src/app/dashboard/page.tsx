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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">CodeFusion</h1>
              </div>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="hidden md:inline text-slate-600 font-medium">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
              <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-initial">
                <Link href="/builder">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">New Project</span>
                </Link>
              </Button>
              <Button size="sm" asChild className="flex-1 sm:flex-initial">
                <Link href="/builder">
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {userProfile?.displayName || user.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-slate-600 text-base md:text-lg">
                Manage your AI-generated websites and create amazing new projects
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex space-x-2 sm:space-x-4 w-full lg:w-auto">
              <Card className="flex-1 lg:w-32 text-center">
                <CardContent className="p-4 md:pt-4">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">{projects.length}</div>
                  <div className="text-xs md:text-sm text-slate-600">Projects</div>
                </CardContent>
              </Card>
              <Card className="flex-1 lg:w-32 text-center">
                <CardContent className="p-4 md:pt-4">
                  <div className="text-xl md:text-2xl font-bold text-green-600">
                    {userProfile?.plan === 'pro' ? '20' : '3'}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">Daily Limit</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    {userProfile?.plan === 'pro' ? (
                      <Crown className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    ) : (
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {userProfile?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base">
                      {userProfile?.plan === 'pro' 
                        ? 'Unlimited projects with 20 generations per day' 
                        : 'Upgrade to Pro for unlimited projects and 20 generations per day'
                      }
                    </p>
                  </div>
                </div>
                {userProfile?.plan !== 'pro' && (
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full md:w-auto">
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
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full md:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder-slate-500 font-medium"
                  style={{
                    color: searchTerm ? '#1e293b' : '#64748b',
                    fontWeight: searchTerm ? '600' : '500'
                  }}
                />
                {searchLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  </div>
                )}
                {!searchLoading && searchTerm && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      {filteredProjects.length} found
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="px-3 py-2 md:px-4 md:py-2.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium shadow-sm hover:border-slate-300 transition-colors w-full md:w-auto text-sm md:text-base"
              >
                {frameworks.map(framework => (
                  <option key={framework} value={framework}>
                    {framework === 'all' 
                      ? '🌐 All Frameworks' 
                      : `⚡ ${(framework || 'unknown').toString().toUpperCase()}`
                    }
                  </option>
                ))}
              </select>
              
              <div className="flex border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 md:p-2.5 transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600 border-r border-slate-200' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 md:p-2.5 transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50'
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Your Projects ({filteredProjects.length})
              </h2>
              {(searchTerm || selectedFramework !== 'all') && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                    🔍 Filtered
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedFramework('all');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 hidden sm:block"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/builder">
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-slate-600">Loading your projects...</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="text-center py-12 md:py-16">
              <CardContent>
                <div className="mx-auto h-20 w-20 md:h-24 md:w-24 text-slate-300 mb-4">
                  {searchTerm || selectedFramework !== 'all' ? (
                    <Search className="w-full h-full" />
                  ) : (
                    <Code className="w-full h-full" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {searchTerm || selectedFramework !== 'all' ? 'No projects found' : 'No projects yet'}
                </h3>
                <p className="text-slate-600 mb-6 text-sm md:text-base">
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
                    className="text-sm md:text-base"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button asChild className="text-sm md:text-base">
                    <Link href="/builder">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Your First Project
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' 
              : 'space-y-4'
            }>
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-blue-300 h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2 flex-wrap gap-y-2">
                          {getFrameworkBadge(project.framework)}
                          <span className="text-xs text-slate-500">
                            {formatDate(project.createdAt)}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/builder?edit=${project.id}`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Project
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/preview/${project.id}`} target="_blank">
                              <Eye className="w-4 h-4 mr-2" />
                              View Live
                            </Link>
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
                  
                  <CardContent className="pb-4 flex-1">
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {project.prompt}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>Created {formatDate(project.createdAt)}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/builder?edit=${project.id}`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/preview/${project.id}`} target="_blank">
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/builder">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm md:text-base">Generate New Website</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">Create a new AI-powered website</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/tutorials">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm md:text-base">View Tutorials</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">Learn how to use CodeFusion</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/pricing">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Crown className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm md:text-base">Upgrade Plan</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">Get unlimited generations</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" onClick={() => setShowDeleteDialog(null)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => showDeleteDialog && handleDelete(showDeleteDialog)}
              disabled={deletingId === showDeleteDialog}
              className="w-full sm:w-auto"
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