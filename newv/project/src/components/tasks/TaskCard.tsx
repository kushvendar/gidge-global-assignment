import React, { useState } from 'react';
import { CalendarClock, CheckCircle, Clock, Edit, Trash } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import { Task } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import TaskEditModal from './TaskEditModal';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleStatusChange = (status: Task['status']) => {
    updateTask(task.id, { status });
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 300); // Animation time
  };
  
  // Format dates
  const formattedCreatedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const formattedCompletedDate = task.completedAt
    ? new Date(task.completedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null;
  
  // Determine badge variant based on status
  const getBadgeVariant = () => {
    switch (task.status) {
      case 'todo':
        return 'default';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };
  
  return (
    <>
      <Card 
        className={`transition-all duration-300 ${
          isDeleting 
            ? 'opacity-0 scale-95 transform' 
            : 'opacity-100 scale-100'
        } border border-slate-200 hover:border-blue-200`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <Badge variant={getBadgeVariant()}>
              {task.status === 'todo' && 'To Do'}
              {task.status === 'in-progress' && 'In Progress'}
              {task.status === 'completed' && 'Completed'}
            </Badge>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="Edit task"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                className="text-slate-400 hover:text-red-600 transition-colors"
                aria-label="Delete task"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-3 text-slate-900">{task.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{task.description}</p>
          
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <CalendarClock className="h-3 w-3 mr-1" />
            <span>Created: {formattedCreatedDate}</span>
            
            {task.status === 'completed' && task.completedAt && (
              <span className="ml-3 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                Completed: {formattedCompletedDate}
              </span>
            )}
          </div>
          
          {task.status !== 'completed' && (
            <div className="mt-4 flex space-x-2">
              {task.status === 'todo' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange('in-progress')}
                  leftIcon={<Clock className="h-3 w-3" />}
                >
                  Start
                </Button>
              )}
              
              {task.status === 'in-progress' && (
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleStatusChange('completed')}
                  leftIcon={<CheckCircle className="h-3 w-3" />}
                >
                  Complete
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;