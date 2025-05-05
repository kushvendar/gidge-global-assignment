import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ProjectContextType, Project } from '../types';
import { getProjects, saveProjects, getProjectsByUserId } from '../utils/storage';
import { useAuth } from './AuthContext';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { currentUser } = useAuth();

  // Load projects when the component mounts or user changes
  useEffect(() => {
    if (currentUser) {
      const userProjects = getProjectsByUserId(currentUser.id);
      setProjects(userProjects);
    } else {
      setProjects([]);
    }
  }, [currentUser]);

  const getUserProjects = (): Project[] => {
    if (!currentUser) return [];
    return projects;
  };

  const addProject = (name: string, description: string): Project | null => {
    if (!currentUser) return null;
    
    // Check if user already has 4 projects
    const userProjects = getProjectsByUserId(currentUser.id);
    if (userProjects.length >= 4) {
      throw new Error('You can only have up to 4 projects');
    }
    
    const newProject: Project = {
      id: uuidv4(),
      userId: currentUser.id,
      name,
      description,
      createdAt: new Date().toISOString()
    };
    
    const allProjects = getProjects();
    allProjects.push(newProject);
    saveProjects(allProjects);
    
    setProjects([...projects, newProject]);
    return newProject;
  };

  const getProject = (id: string): Project | null => {
    return projects.find(project => project.id === id) || null;
  };

  const value = {
    projects,
    addProject,
    getProject,
    getUserProjects
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};