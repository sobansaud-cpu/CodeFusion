'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProject } from '@/context/ProjectConext';
import { CodePreview } from '@/components/CodePreview';
import { generateSite, generateSiteWithImage, pushToGithub, /* deployToNetlify, */ downloadZip, updateProject } from '@/lib/api';
import { Loader2, AlertCircle, Save, Sparkles, Code, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Project} from "@/types"
import Router from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EnhancedPromptForm } from '@/components/EnhancedPromptForm';

// SearchParamsWrapper component to handle search params safely
function SearchParamsWrapper({ children }: { children: (searchParams: URLSearchParams) => React.ReactNode }) {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);
  
  return <>{children(searchParams)}</>;
}

// Main content component
function BuilderPageContent() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { currentProject, setCurrentProject, isGenerating, setIsGenerating } = useProject();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [remainingGenerations, setRemainingGenerations] = useState(3);
  const [isEditing, setIsEditing] = useState(false);
  const [actionMode, setActionMode] = useState<'generate' | 'edit' | 'view' | 'download' | 'github'>('generate');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  // Get all possible action parameters
  const editProjectId = searchParams?.get('edit') || null;
  const viewProjectId = searchParams?.get('view') || null;
  const downloadProjectId = searchParams?.get('download') || null;
  const githubProjectId = searchParams?.get('github') || null;
  const initialPrompt = searchParams?.get('prompt') || '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);

  useEffect(() => {
    if (!searchParams) return;
    
    if (!user) {
      router.push('/');
      return;
    }

    if (editProjectId) {
      setActionMode('edit');
      loadProjectForEdit(editProjectId);
    } else if (viewProjectId) {
      setActionMode('view');
      loadProjectForView(viewProjectId);
    } else if (downloadProjectId) {
      setActionMode('download');
      handleDownload(downloadProjectId);
    } else if (githubProjectId) {
      setActionMode('github');
      handleGitHubPush(githubProjectId);
    } else {
      setActionMode('generate');
    }

    checkGenerationLimits();
  }, [user, router, searchParams, editProjectId, viewProjectId, downloadProjectId, githubProjectId]);

  useEffect(() => {
    if (user && userProfile) {
      checkGenerationLimits();
    }
  }, [userProfile]);

  const checkGenerationLimits = async () => {
    try {
      const response = await fetch('/api/check-limits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setRemainingGenerations(data.remaining);
        if (data.remaining === 0) {
          const errorMsg = userProfile?.plan === 'free' 
            ? `You have reached your daily limit (3/24h). Upgrade to Pro for 20 generations per day.`
            : `You have reached your daily limit (20/24h). Limit resets in 24 hours from your first generation.`;
          setError(errorMsg);
        } else {
          setError(null);
        }
      }
    } catch (err) {
      console.error('Error checking limits:', err);
    }
  };

  const loadProjectForEdit = async (projectId: string) => {
    try {
      setIsGenerating(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to load project');
      }
      
      const project = await response.json();
      setCurrentProject(project);
      setIsEditing(true);
      toast.success('Project loaded successfully for editing');
    } catch (error) {
      toast.error('Failed to load project for editing');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const loadProjectForView = async (projectId: string) => {
    try {
      setIsGenerating(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to load project');
      }
      
      const project = await response.json();
      setCurrentProject(project);
      setActionMode('view');
      toast.success('Project loaded successfully for viewing');
    } catch (error) {
      toast.error('Failed to load project for viewing');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (projectId: string) => {
    try {
      setIsGenerating(false);
      setActionMessage('📦 Preparing download...');
      
      const blob = await downloadZip(projectId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project-${projectId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
      setActionMessage('✅ Download completed successfully! Check your downloads folder.');
      toast.success('🎉 Project downloaded successfully! Check your downloads folder.');
      
      setTimeout(() => {
        setActionMessage('');
        router.push('/dashboard');
      }, 3000);
    } catch (error: any) {
      console.error('Download error:', error);
      setIsGenerating(false);
      toast.error(error.message || 'Failed to download project');
      setActionMessage('❌ Download failed. Please try again.');
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  const handleGitHubPush = async (projectId: string) => {
    try {
      setIsGenerating(true);
      const repoName = prompt('Enter repository name (e.g., username/repo):');
      if (!repoName) return;

      const token = prompt('Enter GitHub personal access token:');
      if (!token) return;

      if (
        (!token.startsWith('ghp_') || token.length !== 40) &&
        (!token.startsWith('github_pat_') || token.length < 60)
      ) {
        throw new Error('Invalid GitHub token format');
      }

      const result = await pushToGithub(projectId, repoName, token);
      if (result.success) {
        toast.success(`🚀 Successfully pushed to GitHub: ${result.repoUrl || repoName}`);
        setActionMessage('✅ Project pushed to GitHub successfully! 🎉');
        setTimeout(() => {
          setActionMessage('🔗 Check your GitHub repository for the latest code!');
          setTimeout(() => setActionMessage(''), 4000);
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to push to GitHub');
      }
    } catch (error: any) {
      console.error('GitHub push error:', error);
      toast.error(error.message || 'Failed to push to GitHub');
      setActionMessage('❌ GitHub push failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveProject = async () => {
    if (!currentProject || !user) return;
    try {
      setIsGenerating(true);
      const result = await updateProject(currentProject.id, {
        name: currentProject.name,
        prompt: currentProject.prompt,
        framework: currentProject.framework,
        files: currentProject.files,
        userId: user.uid
      });
      if (result.success) {
        toast.success('✅ Project changes saved successfully!');
        setActionMessage('✅ Project updated and saved!');
        setTimeout(() => setActionMessage(''), 3000);
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        throw new Error(result.error || 'Failed to save project');
      }
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('Failed to save project changes');
      setActionMessage('❌ Save failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateInEditMode = async (newPrompt: string, language: string, aiModel?: string, apiKey?: string) => {
    if (!user || !currentProject) return;
    
    try {
      setIsGenerating(true);
      
      const response = await generateSite({
        prompt: newPrompt,
        language,
        userId: user.uid,
        email: user.email || '',
        projectId: currentProject.id,
        aiModel,
        apiKey,
      });

      const updatedProject: Project = {
        ...currentProject,
        prompt: response.isEdit ? `${currentProject.prompt}\n\nAdditional: ${newPrompt}` : newPrompt,
        framework: language,
        files: response.files.map((f: any) => ({
          path: f.path,
          content: f.content,
          language: f.language || 'text'
        })),
        updatedAt: new Date().toISOString()
      };

      setCurrentProject(updatedProject);
      
      toast.success('🎉 New content generated and added to your project!');
      
      const promptInput = document.getElementById('newPrompt') as HTMLTextAreaElement;
      if (promptInput) {
        promptInput.value = '';
      }
      
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate new content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async (prompt: string, language: string, options?: any) => {
    if (!user || remainingGenerations === 0) {
      const maxGenerations = userProfile?.plan === 'pro' ? 20 : 3;
      const errorMsg = `You have reached your daily generation limit (${maxGenerations}/24h). ${userProfile?.plan === 'free' ? 'Upgrade to Pro for 20 generations per day.' : 'Limit resets in 24 hours from your first generation.'}`;
      setError(errorMsg);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      let response;

      if (options?.imageFile) {
        response = await generateSiteWithImage({
          prompt,
          language,
          userId: user.uid,
          email: user.email || '',
          projectType: options?.projectType || 'single',
          frontendFramework: options?.frontendFramework,
          backendFramework: options?.backendFramework,
          databaseType: options?.databaseType || 'sqlite',
          aiModel: options?.aiModel,
          apiKey: options?.apiKey,
        }, options.imageFile);
      } else {
        response = await generateSite({
          prompt,
          language,
          userId: user.uid,
          email: user.email || '',
          projectType: options?.projectType || 'single',
          frontendFramework: options?.frontendFramework,
          backendFramework: options?.backendFramework,
          databaseType: options?.databaseType || 'sqlite',
          aiModel: options?.aiModel,
          apiKey: options?.apiKey,
        });
      }

      const project: Project = {
        id: response.projectId,
        name: `Project - ${new Date().toLocaleString()}`,
        prompt,
        files: response.files.map((f: any) => ({
          path: f.path,
          content: f.content,
          language: f.language || 'text'
        })),
        framework: language,
        theme: 'default',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.uid,
        projectType: options?.projectType || 'single',
        frontendFramework: options?.frontendFramework,
        backendFramework: options?.backendFramework,
        databaseType: options?.databaseType || 'sqlite',
        setupInstructions: response.setupInstructions,
        deploymentGuide: response.deploymentGuide
      };

      setCurrentProject(project);
      await checkGenerationLimits();
      toast.success('Website generated successfully! Check it');
    } catch (error: any) {
      console.error('Generation error:', error);
      let errorMessage = 'An error occurred while generating your website.';
      if (error.message.includes('Failed to generate site')) {
        errorMessage = 'Website generation failed. Please try a different prompt.';
      } else if (error.message.includes('Network error')) {
        errorMessage = 'Network connection issue. Please check your internet.';
      } else if (error.message.includes('daily generation limit')) {
        const match = error.message.match(/\((\d+)\/(\d+)\)/);
        if (match) {
          const currentCount = parseInt(match[1]);
          const maxCount = parseInt(match[2]);
          const remaining = Math.max(0, maxCount - currentCount);
          errorMessage = `You have reached your daily generation limit (${currentCount}/${maxCount}). ${remaining === 0 ? 'Limit resets in 24 hours from your first generation.' : `You have ${remaining} generations remaining.`}`;
        } else {
          errorMessage = 'You have reached your daily generation limit.';
        }
      } else {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateProjectName = (project: { id: string }): string => {
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const randomId = Math.random().toString(36).substring(2, 6);
    return `codefusion-${date}-${randomId}`;
  };

   useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isGenerating) {
        e.preventDefault();
        e.returnValue = 'Your website is still being generated. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    const handleRouteChange = () => {
      if (isGenerating && !window.confirm('Your website is still being generated. Are you sure you want to leave?')) {
        throw 'Route change aborted';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isGenerating]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const savedPrompt = localStorage.getItem('builder_prompt');
    const savedProject = localStorage.getItem('builder_project');
    if (savedPrompt && actionMode === 'generate') {
      setActionMessage(savedPrompt);
    }
    if (savedProject) {
      try {
        const parsedProject = JSON.parse(savedProject);
        setCurrentProject(parsedProject);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (actionMessage) {
      localStorage.setItem('builder_prompt', actionMessage);
    }
    if (currentProject) {
      localStorage.setItem('builder_project', JSON.stringify(currentProject));
    }
  }, [actionMessage, currentProject]);


    if (!searchParams || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-full mx-auto space-y-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent truncate">
                  {actionMode === 'edit' ? 'Edit Project' :
                   actionMode === 'view' ? 'View Project' :
                   actionMode === 'download' ? 'Downloading...' :
                   actionMode === 'github' ? 'Push to GitHub' :
                   'AI Website Builder'}
                </h1>
                <p className="text-gray-300 text-base sm:text-lg truncate">
                  {actionMode === 'edit' ? 'Add new features or modify your existing project' :
                   actionMode === 'view' ? 'Review your project code' :
                   actionMode === 'download' ? 'Downloading your project files...' :
                   actionMode === 'github' ? 'Pushing your project to GitHub...' :
                   'Create professional websites with AI in any programming language'}
                </p>
              </div>
            </div>
            {userProfile && actionMode === 'generate' && (
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${userProfile.plan === 'pro' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-blue-500'}`}></div>
                  <span className="text-sm text-gray-300 truncate">{userProfile.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-300 truncate">{remainingGenerations} generations remaining</span>
                </div>
              </div>
            )}
          </div>
          {actionMode !== 'generate' && (
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="text-white border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 px-6 py-2 flex-shrink-0"
            >
              ← Back to Dashboard
            </Button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-500 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Action message overlay */}
        {actionMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-8 max-w-md w-full text-center">
              <div className="text-4xl mb-4 select-none">
                {actionMessage.includes('✅') ? '✅' :
                 actionMessage.includes('❌') ? '❌' :
                 actionMessage.includes('📦') ? '📦' : '🎯'}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {actionMessage.includes('Download completed') ? 'Download Successful!' :
                 actionMessage.includes('Download failed') ? 'Download Failed' :
                 actionMessage.includes('Preparing download') ? 'Preparing Download' :
                 'Action Completed'}
              </h3>
              <p className="text-gray-300 break-words">{actionMessage}</p>
              <button 
                onClick={() => setActionMessage(null)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Main Content by Action Mode */}
        {actionMode === 'generate' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-250px)]">
            {/* Left Panel */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-600/50 shadow-2xl flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white truncate">Describe Your Project</h2>
              </div>
              <div className="flex-grow min-h-0 overflow-auto">
                <EnhancedPromptForm
                  onSubmitAction={handleGenerate}
                  loading={isGenerating}
                  remainingGenerations={remainingGenerations}
                  initialPrompt={initialPrompt}
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-gray-600/50 shadow-2xl overflow-hidden flex flex-col">
              {isGenerating ? (
                <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Loader2 className="w-10 h-10 text-white animate-spin" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">AI is generating your project...</h3>
                  <p className="text-gray-300 text-base sm:text-lg">This may take a few moments</p>
                  <div className="flex space-x-2 justify-center mt-6" aria-hidden="true">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : currentProject ? (
                <CodePreview
                  files={currentProject.files}
                  language={currentProject.framework}
                  isBackendOnly={currentProject.framework === 'python' || currentProject.framework === 'nodejs'}
                  isFrontend={['react', 'nextjs', 'vue', 'html'].includes(currentProject.framework)}
                  projectType={currentProject.projectType}
                  projectId={currentProject.id}
                  onDownload={() => handleDownload(currentProject.id)}
                  onGithubPush={() => handleGitHubPush(currentProject.id)}
                  // onNetlifyDeploy={() => {/* handleDeploy(currentProject.id) */}}
                />
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <div className="text-4xl">🚀</div>
                    </div>
                    <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to create?</h3>
                  <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto">
                    Describe your project in any language and watch AI build it! Create stunning websites, powerful applications, and more.
                  </p>
                  <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-400 mt-6">
                    <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-500 rounded-full" />Frontend</div>
                    <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-purple-500 rounded-full" />Backend</div>
                    <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-green-500 rounded-full" />Database</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : actionMode === 'edit' && currentProject ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-250px)]">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-600/50 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Save className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Your Project</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                  <Input
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Project Description</label>
                  <textarea
                    value={currentProject.prompt}
                    onChange={(e) => setCurrentProject({...currentProject, prompt: e.target.value})}
                    className="w-full h-24 bg-gray-700 border border-gray-600 rounded-md p-3 text-white resize-none focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Describe your project..."
                  />
                </div>
                
                <div className="border-t border-gray-600 pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Generate New Content</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Describe what you want to add or modify in your existing project. The AI will integrate the new content with your current project structure.
                  </p>
                  
                  {/* Enhanced loading state for edit form */}
                  {isGenerating && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/50 rounded-lg">
                      <div className="flex items-center text-blue-200">
                        <div className="relative mr-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <div className="absolute inset-0 w-5 h-5 bg-blue-500 rounded-full opacity-20 animate-ping" />
                        </div>
                        <span className="text-sm font-medium">🚀 Generating new content for your project...</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Prompt</label>
                      <textarea
                        id="newPrompt"
                        className="w-full h-20 bg-gray-700 border border-gray-600 rounded-md p-3 text-white resize-none focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        placeholder="e.g., Add a contact form, Create a new page, Add dark mode toggle, Improve the styling..."
                        disabled={isGenerating}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language/Framework</label>
                      <select
  id="newLanguage"
  className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
  disabled={isGenerating}
>
  {/* Frontend Frameworks */}
  <optgroup label="Frontend Frameworks">
    <option value="html">HTML/CSS</option>
    <option value="react">React</option>
    <option value="nextjs">Next.js</option>
    <option value="vue">Vue.js</option>
    <option value="angular">Angular</option>
    <option value="svelte">Svelte</option>
    <option value="nuxt">Nuxt.js</option>
    <option value="gatsby">Gatsby</option>
  </optgroup>

  {/* Backend Frameworks */}
  <optgroup label="Backend Frameworks">
    <option value="nodejs-express">Node.js (Express)</option>
    <option value="nodejs-nestjs">Node.js (NestJS)</option>
    <option value="python-django">Python (Django)</option>
    <option value="python-flask">Python (Flask)</option>
    <option value="python-fastapi">Python (FastAPI)</option>
    <option value="php-laravel">PHP (Laravel)</option>
    <option value="php-codeigniter">PHP (CodeIgniter)</option>
    <option value="ruby-rails">Ruby (Rails)</option>
    <option value="ruby-sinatra">Ruby (Sinatra)</option>
    <option value="java-spring">Java (Spring Boot)</option>
    <option value="csharp-dotnet">C# (.NET Core)</option>
    <option value="go-gin">Go (Gin)</option>
    <option value="go-echo">Go (Echo)</option>
    <option value="rust-actix">Rust (Actix)</option>
    <option value="rust-rocket">Rust (Rocket)</option>
  </optgroup>

  {/* Database Types */}
  <optgroup label="Databases">
    <option value="sqlite">SQLite</option>
    <option value="postgresql">PostgreSQL</option>
    <option value="mysql">MySQL</option>
    <option value="mongodb">MongoDB</option>
    <option value="redis">Redis</option>
    <option value="sqlserver">SQL Server</option>
    <option value="oracle">Oracle</option>
    <option value="couchdb">CouchDB</option>
  </optgroup>
</select>

                    </div>
                    <Button 
                      onClick={() => {
                        const newPrompt = (document.getElementById('newPrompt') as HTMLTextAreaElement).value;
                        const newLanguage = (document.getElementById('newLanguage') as HTMLSelectElement).value;
                        if (newPrompt.trim()) {
                          handleGenerateInEditMode(newPrompt, newLanguage);
                        } else {
                          toast.error('Please enter a prompt for new content');
                        }
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 transition-all duration-200 transform hover:scale-105"
                      disabled={isGenerating}
                    >
                      {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                      {isGenerating ? 'Generating...' : 'Generate New Content'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-6">
                  <Button 
                    onClick={() => handleSaveProject()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 transition-all duration-200 transform hover:scale-105"
                    disabled={isGenerating}
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/dashboard')}
                    className="border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 px-6 py-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-gray-600/50 shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-600/50 bg-gradient-to-r from-gray-800 to-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Project Code</h3>
                    <p className="text-gray-300 text-sm">Review and edit your generated code</p>
                  </div>
                </div>
              </div>
              <CodePreview
                files={currentProject.files}
                language={currentProject.framework}
                isBackendOnly={currentProject.framework === 'python' || currentProject.framework === 'nodejs'}
                isFrontend={currentProject.framework === 'react' || currentProject.framework === 'nextjs' || currentProject.framework === 'vue' || currentProject.framework === 'html'}
                projectType={currentProject.projectType}
                projectId={currentProject.id}
                onDownload={() => handleDownload(currentProject.id)}
                onGithubPush={() => handleGitHubPush(currentProject.id)}
                // onNetlifyDeploy={() => {/* handleDeploy(currentProject.id) */}}
              />
            </div>
          </div>
        ) : actionMode === 'edit' && !currentProject ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Loading Project for Editing...</h3>
              <p className="text-gray-300 text-base sm:text-lg">Please wait while we load your project files</p>
            </div>
          </div>
        ) : actionMode === 'view' && currentProject ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-600/50 shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{currentProject.name}</h2>
                  <p className="text-gray-300 text-base sm:text-lg">{currentProject.prompt}</p>
                </div>
              </div>
            </div>
            <CodePreview
              files={currentProject.files}
              language={currentProject.framework}
              isBackendOnly={currentProject.framework === 'python' || currentProject.framework === 'nodejs'}
              isFrontend={currentProject.framework === 'react' || currentProject.framework === 'nextjs' || currentProject.framework === 'vue' || currentProject.framework === 'html'}
              projectType={currentProject.projectType}
              projectId={currentProject.id}
              onDownload={() => handleDownload(currentProject.id)}
              onGithubPush={() => handleGitHubPush(currentProject.id)}
              // onNetlifyDeploy={() => {/* handleDeploy(currentProject.id) */}}
            />
          </div>
        ) : actionMode === 'download' ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-20 animate-ping" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Preparing Download...</h3>
              <p className="text-gray-300 text-base sm:text-lg">Creating ZIP file with your project files</p>
            </div>
          </div>
        ) : actionMode === 'github' ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full opacity-20 animate-ping" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Setting up GitHub Push...</h3>
              <p className="text-gray-300 text-base sm:text-lg">Connecting to GitHub and preparing your repository</p>
            </div>
          </div>
        ) : (
          // Loading and fallback UI for unhandled modes or loading states
          <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Loading...</h3>
              <p className="text-gray-300 text-base sm:text-lg">Please wait...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom spacing for footer */}
      <div className="h-16"></div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    }>
      <SearchParamsWrapper>
        {(searchParams) => <BuilderPageContent />}
      </SearchParamsWrapper>
    </Suspense>
  );
}
