

export interface GenerateSiteRequest {
  prompt: string;
  language: string;
  userId: string;
  email: string;
  projectId?: string; // Optional field for editing existing projects
  aiModel?: string; // Optional AI model selection
  apiKey?: string; // Optional API key for custom AI model
  projectType?: 'frontend' | 'backend' | 'fullstack'; // Project type selection
  frontendFramework?: string; // For full-stack projects
  backendFramework?: string; // For full-stack projects
  databaseType?: string; // For full-stack projects
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GenerateSiteResponse {
  success: boolean;
  files: GeneratedFile[];
  projectId: string;
  language: string;
  isFrontend: boolean;
  isBackendOnly: boolean;
  isEdit?: boolean; // Optional field to indicate if this was an edit operation
  isFullstack?: boolean; // New field for full-stack projects
  setupInstructions?: string; // For full-stack projects
  deploymentGuide?: string; // For full-stack projects
}

export interface TerminalCommandResponse {
  success: boolean;
  output: string;
  error: string;
  return_code: number;
}

export interface Project {
  id: string;
  name: string;
  prompt: string;
  files: GeneratedFile[];
  framework: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  projectType?: 'single' | 'fullstack';
  frontendFramework?: string;
  backendFramework?: string;
  databaseType?: string;
  setupInstructions?: string;
  deploymentGuide?: string;
}




const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
// Updated api.ts
export const generateSite = async (request: GenerateSiteRequest): Promise<GenerateSiteResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        framework: request.language,
        userId: request.userId,
        email: request.email,
        projectId: request.projectId,
        aiModel: request.aiModel,
        apiKey: request.apiKey,
        projectType: request.projectType || 'single',
        frontendFramework: request.frontendFramework,
        backendFramework: request.backendFramework,
        databaseType: request.databaseType || 'sqlite'
      }),
    });

    // First check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Server returned ${response.status}: ${text}`);
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Network error occurred');
  }
};

export const generateSiteWithImage = async (
  request: GenerateSiteRequest,
  imageFile: File
): Promise<GenerateSiteResponse> => {
  try {
    const formData = new FormData();
    formData.append('prompt', request.prompt);
    formData.append('framework', request.language);
    formData.append('userId', request.userId);
    formData.append('email', request.email);
    formData.append('theme', 'default');
    formData.append('projectType', request.projectType || 'single');

    if (request.frontendFramework) {
      formData.append('frontendFramework', request.frontendFramework);
    }
    if (request.backendFramework) {
      formData.append('backendFramework', request.backendFramework);
    }
    if (request.databaseType) {
      formData.append('databaseType', request.databaseType);
    }

    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/generate-with-image`, {
      method: 'POST',
      body: formData,
    });

    // First check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Server returned ${response.status}: ${text}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Network error occurred');
  }
};

export const getProject = async (projectId: string): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  return await response.json();
};

export const getProjects = async (userId: string): Promise<{ success: boolean; projects: Project[]; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return { success: true, projects: data.projects || [] };
  } catch (error) {
    return { 
      success: false, 
      projects: [], 
      error: error instanceof Error ? error.message : 'Failed to fetch projects' 
    };
  }
};

export const deleteProject = async (projectId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete project: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete project' 
    };
  }
};

export const updateProject = async (projectId: string, projectData: {
  name?: string;
  prompt?: string;
  framework?: string;
  files?: GeneratedFile[];
  userId: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to update project: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update project' 
    };
  }
};

export const getProjectFiles = async (projectId: string): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/files`);
  if (!response.ok) {
    throw new Error('Failed to fetch project files');
  }
  const data = await response.json();
  return data.files;
};

export const pushToGithub = async (projectId: string, repoName: string, token: string) => {
  const response = await fetch(`${API_BASE_URL}/github/push`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      repoName,
      token
    }),
  });
  return await response.json();
};


export const downloadZip = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/download/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to download project');
  }
  return await response.blob();
};

export const executeTerminalCommand = async (projectId: string, command: string): Promise<TerminalCommandResponse> => {
  const response = await fetch(`${API_BASE_URL}/terminal/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      command
    }),
  });
  return await response.json();
};

export const getProjectFile = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/files`);
  return await response.json();
};

