import { User, Project, Task } from '../types';

// User Storage Functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
};

export const getUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

// Project Storage Functions
export const getProjects = (): Project[] => {
  const projects = localStorage.getItem('projects');
  return projects ? JSON.parse(projects) : [];
};

export const saveProjects = (projects: Project[]): void => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const getProjectById = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(project => project.id === id) || null;
};

export const getProjectsByUserId = (userId: string): Project[] => {
  const projects = getProjects();
  return projects.filter(project => project.userId === userId);
};

export const addProject = (project: Project): void => {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
};

// Task Storage Functions
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getTaskById = (id: string): Task | null => {
  const tasks = getTasks();
  return tasks.find(task => task.id === id) || null;
};

export const getTasksByProjectId = (projectId: string): Task[] => {
  const tasks = getTasks();
  return tasks.filter(task => task.projectId === projectId);
};

export const addTask = (task: Task): void => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (id: string, updates: Partial<Task>): Task | null => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) return null;
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  saveTasks(tasks);
  
  return tasks[taskIndex];
};

export const deleteTask = (id: string): void => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  saveTasks(updatedTasks);
};