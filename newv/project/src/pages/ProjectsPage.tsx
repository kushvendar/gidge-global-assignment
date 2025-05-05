import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useTasks } from '../contexts/TaskContext';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';
import NewProjectModal from '../components/projects/NewProjectModal';
import { Card, CardContent } from '../components/ui/Card';

const ProjectsPage: React.FC = () => {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
        
        <Button
          variant="primary"
          onClick={() => setIsNewProjectModalOpen(true)}
          rightIcon={<PlusCircle className="h-4 w-4" />}
          disabled={projects.length >= 4}
        >
          New Project
        </Button>
      </div>
      
      {projects.length >= 4 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            You've reached the maximum limit of 4 projects. Please remove a project before creating a new one.
          </p>
        </div>
      )}
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              createdAt={project.createdAt}
              taskCount={tasks.filter(task => task.projectId === project.id).length}
            />
          ))}
        </div>
      ) : (
        <Card className="border border-slate-200 bg-slate-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No projects yet</h3>
            <p className="text-slate-600 mb-6">
              Create your first project to start tracking tasks.
            </p>
            <Button
              variant="primary"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
      
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsPage;