'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/api';
import dynamic from 'next/dynamic';

const SandpackComponent = dynamic(
  () => import('@/components/SandpackComponent'),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen">Loading preview...</div>
  }
);

export default function PreviewPage({ params }: { params: { id: string } }) {
  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProject = async () => {
      try {
        // Proper way to access params in Next.js 13+
        const { id: projectId } = params;
        if (!projectId) throw new Error('Project ID is required');
        
        const projectData = await getProject(projectId);
        if (!projectData?.files) throw new Error('Project files missing');
        
        // Convert files to array format if needed
        const files = Array.isArray(projectData.files) ? 
          projectData.files : 
          Object.entries(projectData.files).map(([path, content]) => ({
            path,
            content: typeof content === 'string' ? content : JSON.stringify(content)
          }));
        
        setProject({
          ...projectData,
          files,
          framework: projectData.framework || 'html'
        });
      } catch (err) {
        setError('Failed to load project');
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params]); // Keep params as dependency

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="mt-1 text-gray-600">{project.prompt}</p>
            </div>
            <div className="flex space-x-3">
              <a
                href={`/builder?edit=${project.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Edit Project
              </a>
            </div>
          </div>
        </div>
        
        <div className="h-[calc(100vh-80px)]">
          {project.framework?.includes('+') ? (
            // Full-stack project - show both frontend and backend info
            <div className="h-full flex flex-col">
              <div className="bg-blue-50 border-b border-blue-200 p-4">
                <h3 className="text-lg font-semibold text-blue-900">Full-Stack Application Preview</h3>
                <p className="text-blue-700">Framework: {project.framework}</p>
                <p className="text-sm text-blue-600 mt-2">
                  This is a full-stack application. In a production environment, both frontend and backend would be running.
                </p>
              </div>
              <div className="flex-1">
                <SandpackComponent
                  files={project.files}
                  framework={project.framework.split('+')[0]} // Use frontend framework for preview
                  previewOnly={true}
                />
              </div>
            </div>
          ) : (
            // Single framework project
            <SandpackComponent
              files={project.files}
              framework={project.framework}
              previewOnly={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}