'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Code, 
  Download, 
  Github, 
  ExternalLink, 
  Terminal,
  Play,
  Settings,
  FileText,
  Globe,
  Database,
  Server
} from 'lucide-react';
import { Project, ProjectFile } from '@/types';


function PreviewPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(true);

  const projectId = searchParams.get('id');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (projectId) {
      loadProject(projectId);
    } else {
      router.push('/dashboard');
    }
  }, [user, projectId, router]);

  const loadProject = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/project/${id}`);
      if (!response.ok) {
        throw new Error('Failed to load project');
      }
      
      const projectData = await response.json();
      setProject(projectData);
      
      // Set first file as selected by default
      if (projectData.files && projectData.files.length > 0) {
        setSelectedFile(projectData.files[0]);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const runProject = async () => {
    if (!project) return;
    
    setIsRunning(true);
    setTerminalOutput('🚀 Starting project...\n');
    
    try {
      // Simulate running the project based on framework
      const commands = getRunCommands(project.framework);
      
      for (const command of commands) {
        setTerminalOutput(prev => prev + `$ ${command}\n`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (command.includes('npm install') || command.includes('pip install')) {
          setTerminalOutput(prev => prev + 'Installing dependencies...\n');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setTerminalOutput(prev => prev + '✅ Dependencies installed successfully!\n');
        } else if (command.includes('npm start') || command.includes('python') || command.includes('node')) {
          setTerminalOutput(prev => prev + '🚀 Project is running!\n');
          setTerminalOutput(prev => prev + '🌐 Open your browser and navigate to the URL shown above\n');
        }
      }
    } catch (error) {
      setTerminalOutput(prev => prev + '❌ Error running project\n');
    } finally {
      setIsRunning(false);
    }
  };

  const getRunCommands = (framework: string): string[] => {
    switch (framework.toLowerCase()) {
      case 'react':
        return ['npm install', 'npm start'];
      case 'nextjs':
        return ['npm install', 'npm run dev'];
      case 'vue':
        return ['npm install', 'npm run serve'];
      case 'python':
        return ['pip install -r requirements.txt', 'python main.py'];
      case 'nodejs':
        return ['npm install', 'npm start'];
      case 'django':
        return ['pip install django', 'python manage.py runserver'];
      case 'php':
        return ['php -S localhost:8000'];
      case 'html':
        return ['# Open index.html in your browser'];
      default:
        return ['# Check project documentation for setup instructions'];
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework.toLowerCase()) {
      case 'react':
        return '⚛️';
      case 'nextjs':
        return '▲';
      case 'vue':
        return '💚';
      case 'python':
        return '🐍';
      case 'nodejs':
        return '🟢';
      case 'django':
        return '🐍';
      case 'php':
        return '🐘';
      case 'html':
        return '🌐';
      default:
        return '📁';
    }
  };

  const getFileIcon = (file: ProjectFile) => {
    const ext = file.path.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return '📄';
      case 'ts':
      case 'tsx':
        return '📘';
      case 'html':
        return '🌐';
      case 'css':
        return '🎨';
      case 'py':
        return '🐍';
      case 'json':
        return '⚙️';
      case 'md':
        return '📝';
      default:
        return '📁';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading project preview...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Project not found</p>
          <Button onClick={() => router.push('/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* ...existing code... */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ...existing code... */}
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewPageContent />
    </Suspense>
  );
}
