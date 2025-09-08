'use client';

import React, { createContext, useContext, useState } from 'react';
import { Project, ProjectFile } from '@/types';

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ 
  children: React.ReactNode,
  initialProjects?: Project[] 
}> = ({ children, initialProjects = [] }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ProjectContext.Provider value={{ 
      currentProject,
      setCurrentProject,
      projects,
      setProjects,
      isGenerating,
      setIsGenerating
    }}>
      {children}
    </ProjectContext.Provider>
  );
};