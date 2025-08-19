import { invoke } from '@tauri-apps/api/tauri';

export interface Task {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
}

export interface NewTask {
  title: string;
}

/**
 * Database API client for Tauri backend
 * Implements all database operations as specified in R-PERSIST-1 PRD
 */
export class DatabaseAPI {
  
  /**
   * Initialize the database
   */
  static async initialize(): Promise<void> {
    try {
      await invoke('init_database');
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw new Error(`Database initialization failed: ${error}`);
    }
  }

  /**
   * Get all tasks sorted by creation date (active first, then completed)
   */
  static async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await invoke<Task[]>('get_tasks');
      return tasks;
    } catch (error) {
      console.error('Failed to get tasks:', error);
      throw new Error(`Failed to retrieve tasks: ${error}`);
    }
  }

  /**
   * Create a new task
   */
  static async createTask(title: string): Promise<Task> {
    if (!title.trim()) {
      throw new Error('Task title cannot be empty');
    }
    
    if (title.length > 256) {
      throw new Error('Task title cannot exceed 256 characters');
    }

    try {
      const task = await invoke<Task>('add_task', { title: title.trim() });
      return task;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw new Error(`Failed to create task: ${error}`);
    }
  }

  /**
   * Toggle task completion status
   */
  static async toggleTask(id: number, done: boolean): Promise<Task> {
    try {
      const task = await invoke<Task>('toggle_task', { id, done });
      return task;
    } catch (error) {
      console.error('Failed to toggle task:', error);
      throw new Error(`Failed to update task: ${error}`);
    }
  }

  /**
   * Delete a task permanently
   */
  static async deleteTask(id: number): Promise<void> {
    try {
      await invoke('remove_task', { id });
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error(`Failed to delete task: ${error}`);
    }
  }
}

// Export for convenience
export const db = DatabaseAPI;
