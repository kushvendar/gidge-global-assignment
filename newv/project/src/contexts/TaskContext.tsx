import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskContextType, Task } from '../types';
import { getTasks, saveTasks, getTasksByProjectId, updateTask as updateStorageTask, deleteTask as deleteStorageTask } from '../utils/storage';
import { useAuth } from './AuthContext';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { currentUser } = useAuth();

  // Load tasks when the component mounts or user changes
  useEffect(() => {
    if (currentUser) {
      const allTasks = getTasks();
      setTasks(allTasks);
    } else {
      setTasks([]);
    }
  }, [currentUser]);

  const getProjectTasks = (projectId: string): Task[] => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const addTask = (projectId: string, title: string, description: string): Task => {
    const newTask: Task = {
      id: uuidv4(),
      projectId,
      title,
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    const allTasks = getTasks();
    allTasks.push(newTask);
    saveTasks(allTasks);
    
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'projectId' | 'createdAt'>>): Task | null => {
    // Handle completion date if status is being changed to completed
    if (updates.status === 'completed') {
      updates.completedAt = new Date().toISOString();
    }
    
    const updatedTask = updateStorageTask(id, updates);
    
    if (updatedTask) {
      setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
      return updatedTask;
    }
    
    return null;
  };

  const deleteTask = (id: string): void => {
    deleteStorageTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTask = (id: string): Task | null => {
    return tasks.find(task => task.id === id) || null;
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getProjectTasks,
    getTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};