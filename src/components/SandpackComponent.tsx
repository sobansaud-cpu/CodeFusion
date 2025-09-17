'use client';

import { Sandpack } from '@codesandbox/sandpack-react';
import { sandpackDark } from '@codesandbox/sandpack-themes';
import React from 'react';

interface SandpackFile {
  code: string;
  hidden?: boolean;
  active?: boolean;
}

interface SandpackPreviewProps {
  files: Array<{
    path: string;
    content: string;
  }>;
  framework: string;
  previewOnly?: boolean; // New prop to control preview-only mode
}

const SandpackComponent = ({ files, framework, previewOnly = false }: SandpackPreviewProps) => {
  const processedFiles = React.useMemo(() => {
    const result: Record<string, SandpackFile> = {};
    
    // Convert files to array if needed
    const filesArray = Array.isArray(files) ? files : 
      Object.entries(files).map(([path, content]) => ({
        path,
        content: typeof content === 'string' ? content : JSON.stringify(content)
      }));

    // Process each file
    filesArray.forEach(file => {
      if (!file.path || !file.content) return;
      
      const path = file.path.startsWith('/') ? file.path : `/${file.path}`;
      result[path] = { 
        code: file.content,
        active: path === '/index.html' || path === '/App.js' || path === '/App.tsx'
      };
    });

    // Ensure we have an entry file
    if (!Object.values(result).some(f => f.active)) {
      const firstFile = filesArray[0];
      if (firstFile) {
        const path = firstFile.path.startsWith('/') ? firstFile.path : `/${firstFile.path}`;
        result[path] = {
          ...result[path],
          active: true
        };
      }
    }

    // Add index.html for static templates
    if (framework === 'html' && !result['/index.html']) {
      const htmlContent = filesArray.find(f => f.path.endsWith('.html'))?.content || 
        `<!DOCTYPE html>
<html>
<head>
  <title>${framework} Preview</title>
  <style>
    body { 
      font-family: sans-serif; 
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    ${filesArray[0]?.content || 'Preview content will appear here'}
  </div>
</body>
</html>`;
      
      result['/index.html'] = {
        code: htmlContent,
        active: true
      };
    }

    // Add package.json for JS frameworks
    if (framework !== 'html' && !result['/package.json']) {
      result['/package.json'] = {
        code: JSON.stringify({
          name: "sandpack-project",
          version: "1.0.0",
          main: "index.js",
          scripts: {
            start: framework === 'react' ? "react-scripts start" : "vite",
            build: framework === 'react' ? "react-scripts build" : "vite build"
          },
          dependencies: {
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
            ...(framework === 'react' ? { 'react-scripts': '^5.0.1' } : {})
          },
          devDependencies: {
            ...(framework !== 'react' ? { 'vite': '^4.0.0' } : {})
          }
        }, null, 2),
        hidden: true
      };
    }

    return result;
  }, [files, framework]);

  const template = framework === 'html' ? 'static' : 
                  framework === 'vue' ? 'vue' : 
                  framework === 'svelte' ? 'svelte' : 
                  'react-ts';

  return (
    <div style={{ 
      height: '100%',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Sandpack
        template={template}
        theme={previewOnly ? 'light' : sandpackDark}
        options={{
          showNavigator: !previewOnly,
          showTabs: !previewOnly,
          showLineNumbers: !previewOnly,
          showConsole: !previewOnly,
          showConsoleButton: !previewOnly,
          editorHeight: previewOnly ? '0px' : '100%',
          editorWidthPercentage: previewOnly ? 0 : 50,
          layout: previewOnly ? 'preview' : undefined,
          classes: {
            "sp-layout": "!h-full !absolute",
            "sp-stack": "!h-full",
            "sp-preview-container": "!h-full",
            "sp-preview-iframe": "!h-full !w-full"
          }
        }}
        customSetup={{
          dependencies: {
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
            ...(framework === 'react' ? { 'react-scripts': '^5.0.1' } : {})
          },
          entry: template === 'static' ? '/index.html' : '/App.js'
        }}
        files={processedFiles}
      />
    </div>
  );
};

export default SandpackComponent;