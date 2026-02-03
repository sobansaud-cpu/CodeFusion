'use client';

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Copy, Download, Github,  Terminal, Code, Eye, ExternalLink, RefreshCw, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { useProject } from '@/context/ProjectConext';


interface ProjectFile {
  path: string;
  content: string;
  language?: string;
}

interface CodePreviewProps {
  files: ProjectFile[];
  language: string;
  isBackendOnly?: boolean;
  isFrontend?: boolean;
  projectType?: 'frontend' | 'backend' | 'fullstack';
  projectId?: string;
  onDownload?: () => void;
  onGithubPush?: () => void;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  files,
  language,
  isBackendOnly = false,
  isFrontend = false,
  projectType = 'frontend',
  projectId = '',
  onDownload,
  onGithubPush,
}) => {
  const { currentProject } = useProject();
  const validFiles = Array.isArray(files) ? files.filter(file => file && file.path && file.content) : [];
  const [selectedFile, setSelectedFile] = useState(validFiles[0]?.path || '');

  const [isFixing, setIsFixing] = useState(false);
  const previewMode = 'code';
  const setPreviewMode = () => {};

  useEffect(() => {
    if (validFiles.length > 0 && validFiles[0] && validFiles[0].path && !validFiles.some(f => f && f.path === selectedFile)) {
      setSelectedFile(validFiles[0].path);
    }
  }, [validFiles, selectedFile]);

  const currentFile = validFiles.find(file => file && file.path === selectedFile);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('File content copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const getLanguage = (path: string) => {
    if (!path || typeof path !== 'string') return 'text';
    const ext = path.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx': return 'tsx';
      case 'jsx': return 'jsx';
      case 'ts': return 'typescript';
      case 'js': return 'javascript';
      case 'css': return 'css';
      case 'html': return 'html';
      case 'json': return 'json';
      case 'py': return 'python';
      case 'php': return 'php';
      case 'go': return 'go';
      case 'java': return 'java';
      case 'md': return 'markdown';
      case 'toml': return 'toml';
      case 'yml': return 'yaml';
      case 'yaml': return 'yaml';
      default: return 'text';
    }
  };



  const openInNewTab = () => {
    if (currentProject?.id) {
      window.open(`/preview/${currentProject.id}`, '_blank');
    }
  };

  const fixProject = async () => {
    if (!projectId) {
      toast.error('No project ID available');
      return;
    }

    setIsFixing(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fix-project/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fix project');
      }

      const data = await response.json();

      if (data.success) {
        toast.success(`Project fixed! Applied ${data.fixes.length} fixes.`);


      } else {
        toast.error('Failed to fix project');
      }
    } catch (error) {
      console.error('Fix project error:', error);
      toast.error('Failed to fix project. Please try again.');
    } finally {
      setIsFixing(false);
    }
  };



  // Always show preview for any frontend or fullstack framework
  const shouldShowPreview = projectType === 'frontend' || projectType === 'fullstack' || isFrontend;
  
  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 p-2 sm:p-4 border-b border-gray-700 bg-gray-800">
        <Button 
          size="sm" 
          onClick={onDownload} 
          variant="outline"
          className="bg-gray-700 hover:bg-gray-600 text-xs sm:text-sm"
        >
          <Download className="h-4 w-4 mr-1 sm:mr-2" />
          Download ZIP
        </Button>
        <Button
          size="sm"
          onClick={onGithubPush}
          variant="outline"
          className="bg-gray-700 hover:bg-gray-600 text-xs sm:text-sm"
        >
          <Github className="h-4 w-4 mr-1 sm:mr-2" />
          Push to GitHub
        </Button>
        <Button
          size="sm"
          onClick={fixProject}
          variant="outline"
          className="bg-orange-700 hover:bg-orange-600 text-xs sm:text-sm"
          disabled={isFixing}
        >
          {isFixing ? (
            <RefreshCw className="h-4 w-4 mr-1 sm:mr-2 animate-spin" />
          ) : (
            <Wrench className="h-4 w-4 mr-1 sm:mr-2" />
          )}
          {isFixing ? 'Fixing...' : 'Fix Project'}
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex border-b border-gray-700">
        {/* Only show code and terminal buttons, remove previewMode logic */}
        <button
          className={`flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-gray-700 text-white border-b-2 border-blue-500`}
        >
          <Code className="h-4 w-4 mr-1 sm:mr-2" />
          Code
        </button>
        
        {/* Terminal button is commented out for backend projects */}
        {false && (
          <button
            className={`flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-white`}
          >
            <Terminal className="h-4 w-4 mr-1 sm:mr-2" />
            Terminal
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* File Tree */}
        <div className="w-full lg:w-64 bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-700 p-2 sm:p-4 overflow-y-auto max-h-48 lg:max-h-full">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Files</h3>
          <div className="space-y-1">
            {validFiles.length > 0 ? (
              validFiles.map((file, index) => (
                <button
                  key={`${file.path}-${index}`}
                  onClick={() => setSelectedFile(file.path)}
                  className={`block w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm truncate ${
                    selectedFile === file.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  title={file.path}
                >
                  {file.path}
                </button>
              ))
            ) : (
              <div className="text-gray-400 text-xs sm:text-sm p-2">
                No files available
              </div>
            )}
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentFile && currentFile.path && currentFile.content ? (
            <>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-800 border-b border-gray-700">
                <span className="text-xs sm:text-sm text-gray-300 truncate" title={currentFile.path}>
                  {currentFile.path}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(currentFile.content)}
                  className="text-gray-300 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto">
                <SyntaxHighlighter
                  language={getLanguage(currentFile.path)}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '12px',
                    height: '100%',
                  }}
                  showLineNumbers
                >
                  {currentFile.content}
                </SyntaxHighlighter>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 p-4 text-center">
              <p>No file selected or file content is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




