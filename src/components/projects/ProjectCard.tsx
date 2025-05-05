import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FolderOpen } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  taskCount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  createdAt,
  taskCount
}) => {
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Link to={`/projects/${id}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg border border-slate-200 hover:border-blue-200">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FolderOpen className="h-5 w-5 text-blue-600" />
            </div>
            <Badge variant="primary">{taskCount} tasks</Badge>
          </div>
          
          <h3 className="text-lg font-semibold mt-3 text-slate-900">{name}</h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{description}</p>
          
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Created {formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;