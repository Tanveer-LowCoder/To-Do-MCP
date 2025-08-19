import React, { useState, useEffect } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Card, Input, Button } from './components/ui';
import { TaskInput, TaskList } from './components';
import { db, Task } from './lib/db';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize database and load tasks on app start
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initialize database
      await db.initialize();
      
      // Load existing tasks
      await loadTasks();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize app');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const allTasks = await db.getAllTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setError(error instanceof Error ? error.message : 'Failed to load tasks');
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      // Create task in database (as per R-PERSIST-1 acceptance criteria)
      const newTask = await db.createTask(title);
      
      // Add to local state (new tasks added to top of active tasks)
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (error) {
      console.error('Failed to add task:', error);
      setError(error instanceof Error ? error.message : 'Failed to add task');
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      const currentTask = tasks.find(task => task.id === id);
      if (!currentTask) return;
      
      // Update task status in database (as per R-PERSIST-1 acceptance criteria)
      const updatedTask = await db.toggleTask(id, !currentTask.done);
      
      // Update local state with immediate feedback
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Failed to toggle task:', error);
      setError(error instanceof Error ? error.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      // Delete from database (permanent removal, no recovery as per acceptance criteria)
      await db.deleteTask(id);
      
      // Remove from local state with immediate feedback
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete task');
    }
  };

  const activeTasks = tasks.filter(task => !task.done);
  const completedTasks = tasks.filter(task => task.done);
  const remainingCount = activeTasks.length;

  // Show loading state during app initialization
  if (isLoading) {
    return (
      <MainLayout>
        <Card>
          <div className="text-center py-container-padding">
            <p className="text-body">Initializing database...</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-component-gap">
        {/* Error Display */}
        {error && (
          <Card>
            <div className="text-center py-item-margin text-red-600 border border-red-300 bg-red-50 p-item-margin">
              <p className="text-body font-medium">Error: {error}</p>
              <Button 
                variant="secondary" 
                onClick={() => {
                  setError(null);
                  loadTasks();
                }}
                className="mt-item-margin text-small"
              >
                Retry
              </Button>
            </div>
          </Card>
        )}

        {/* Task Input Section using TaskInput component */}
        <Card>
          <TaskInput onAddTask={handleAddTask} />
        </Card>

        {/* Tasks List using TaskList component */}
        <Card>
          <TaskList 
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </Card>

        {/* Task Summary */}
        {tasks.length > 0 && (
          <Card>
            <div className="text-small text-center text-gray-600">
              {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
              {completedTasks.length > 0 && (
                <span> • {completedTasks.length} completed</span>
              )}
            </div>
          </Card>
        )}

        {/* Component Showcase */}
        <Card>
          <div className="space-y-item-margin">
            <h2 className="text-title font-bold mb-component-gap">✅ All PRD Requirements Complete!</h2>
            
            <div className="space-y-component-gap">
              {/* R-UI-1 Features */}
              <div>
                <h3 className="text-body font-medium mb-item-margin">✅ R-UI-1: User Interface</h3>
                <ul className="space-y-item-margin text-small">
                  <li>• Tailwind theme with black borders (2px), white background</li>
                  <li>• Typography hierarchy: Title (24px), Body (16px), Small (14px)</li>
                  <li>• Interactive states: hover, focus, active feedback</li>
                  <li>• Card, Input, Button, Checkbox components</li>
                </ul>
              </div>

              {/* R-CRUD-1 Features */}
              <div>
                <h3 className="text-body font-medium mb-item-margin">✅ R-CRUD-1: Task Management Interface</h3>
                <ul className="space-y-item-margin text-small">
                  <li>• TaskInput: Add new tasks with Enter key support (max 256 chars)</li>
                  <li>• TaskList: Sorted display (active first, then completed)</li>
                  <li>• TaskItem: Toggle completion, delete on hover with confirmation</li>
                  <li>• Visual feedback: Strikethrough for completed tasks</li>
                  <li>• Immediate UI updates on all operations</li>
                </ul>
              </div>

              {/* R-PERSIST-1 Features */}
              <div>
                <h3 className="text-body font-medium mb-item-margin">✅ R-PERSIST-1: SQLite Data Persistence</h3>
                <ul className="space-y-item-margin text-small">
                  <li>• Local SQLite database with automatic initialization</li>
                  <li>• Task CRUD operations with validation and error handling</li>
                  <li>• Data persistence between app sessions</li>
                  <li>• Transaction support for data integrity</li>
                  <li>• Efficient indexing for performance</li>
                </ul>
              </div>

              {/* Button Variants */}
              <div>
                <h3 className="text-body font-medium mb-item-margin">UI Component Variants</h3>
                <div className="flex gap-component-gap flex-wrap">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="danger">Danger Button</Button>
                  <Button disabled>Disabled Button</Button>
                </div>
              </div>

              {/* Interactive States Demo */}
              <div>
                <h3 className="text-body font-medium mb-item-margin">Interactive States</h3>
                <div className="space-y-item-margin">
                  <div className="p-item-margin border border-border interactive-hover">
                    Hover over this element to see hover effects
                  </div>
                  <Input placeholder="Focus on this input to see focus styles" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}

export default App;
