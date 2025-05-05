import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, FolderOpen } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useTasks } from '../contexts/TaskContext';
import Button from '../components/ui/Button';
import TaskCard from '../components/tasks/TaskCard';
import NewTaskModal from '../components/tasks/NewTaskModal';
import { Card, CardContent } from '../components/ui/Card';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject } = useProjects();
  const { getProjectTasks } = useTasks();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  
  if (!id) {
    return <div>Project not found</div>;
  }
  
  const project = getProject(id);
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">Project not found</h2>
        <p className="mt-2 text-slate-600">The project you're looking for doesn't exist.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/projects')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Projects
        </Button>
      </div>
    );
  }
  
  const tasks = getProjectTasks(id);
  
  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/projects')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Projects
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <FolderOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
            <p className="text-slate-600">{project.description}</p>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            onClick={() => setIsNewTaskModalOpen(true)}
            rightIcon={<PlusCircle className="h-4 w-4" />}
          >
            Add Task
          </Button>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <Card className="border border-slate-200 bg-slate-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No tasks yet</h3>
            <p className="text-slate-600 mb-6">
              Create your first task to start tracking progress.
            </p>
            <Button
              variant="primary"
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              Create Your First Task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center">
              To Do
              <span className="ml-2 inline-flex items-center justify-center bg-slate-100 text-slate-700 text-xs font-medium rounded-full h-5 w-5">
                {todoTasks.length}
              </span>
            </h2>
            
            {todoTasks.length > 0 ? (
              <div className="space-y-4">
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-center">
                <p className="text-sm text-slate-600">No tasks to do</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center">
              In Progress
              <span className="ml-2 inline-flex items-center justify-center bg-amber-100 text-amber-700 text-xs font-medium rounded-full h-5 w-5">
                {inProgressTasks.length}
              </span>
            </h2>
            
            {inProgressTasks.length > 0 ? (
              <div className="space-y-4">
                {inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-center">
                <p className="text-sm text-slate-600">No tasks in progress</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center">
              Completed
              <span className="ml-2 inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-medium rounded-full h-5 w-5">
                {completedTasks.length}
              </span>
            </h2>
            
            {completedTasks.length > 0 ? (
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-center">
                <p className="text-sm text-slate-600">No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        projectId={id}
      />
    </div>
  );
};

export default ProjectDetailPage;