export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would never be stored in the frontend
  name: string;
  country: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: string;
  completedAt: string | null;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => User | null;
  signup: (email: string, password: string, name: string, country: string) => User;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ProjectContextType {
  projects: Project[];
  addProject: (name: string, description: string) => Project | null;
  getProject: (id: string) => Project | null;
  getUserProjects: () => Project[];
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (projectId: string, title: string, description: string) => Task;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'projectId' | 'createdAt'>>) => Task | null;
  deleteTask: (id: string) => void;
  getProjectTasks: (projectId: string) => Task[];
  getTask: (id: string) => Task | null;
}