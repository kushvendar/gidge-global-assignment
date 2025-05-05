import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle, Clock, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useTasks } from '../contexts/TaskContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Welcome, {currentUser?.name}!</h2>
            <p className="mt-1 text-slate-600">Here's an overview of your projects and tasks</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button 
              variant="primary"
              onClick={() => navigate('/projects')}
              rightIcon={<PlusCircle className="h-4 w-4" />}
            >
              Create New Project
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-500">Total Tasks</p>
                <p className="text-3xl font-bold text-slate-900">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <p className="text-3xl font-bold text-slate-900">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-500">In Progress</p>
                <p className="text-3xl font-bold text-slate-900">{inProgressTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Completion</p>
                <p className="text-3xl font-bold text-slate-900">{completionPercentage}%</p>
              </div>
              <div className="h-16 w-16">
                <svg viewBox="0 0 36 36" className="h-16 w-16 transform -rotate-90">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${completionPercentage}, 100`}
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Projects */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Your Projects</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/projects')}
          >
            View All
          </Button>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <CardContent className="p-6 text-center">
              <p className="text-slate-600">You don't have any projects yet.</p>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => navigate('/projects')}
              >
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;