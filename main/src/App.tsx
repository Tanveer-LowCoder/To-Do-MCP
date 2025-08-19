import React, { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Card, Input, Button } from './components/ui';
import { TaskInput, TaskList } from './components';

// Task interface as defined in PRD
interface Task {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
}

// Dummy task data for demonstration
const dummyTasks: Task[] = [
  { id: 1, title: "Set up Tauri development environment", done: true, created_at: "2025-01-19T08:00:00Z" },
  { id: 2, title: "Implement UI components as per PRD specifications", done: true, created_at: "2025-01-19T09:00:00Z" },
  { id: 3, title: "Create task management interface", done: false, created_at: "2025-01-19T10:00:00Z" },
  { id: 4, title: "Implement SQLite data persistence", done: false, created_at: "2025-01-19T11:00:00Z" },
  { id: 5, title: "Add task categories and filtering", done: false, created_at: "2025-01-19T12:00:00Z" },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      title: title,
      done: false,
      created_at: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]); // New tasks added to top of active tasks
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const activeTasks = tasks.filter(task => !task.done);
  const completedTasks = tasks.filter(task => task.done);
  const remainingCount = activeTasks.length;

  return (
    <MainLayout>
      <div className="space-y-component-gap">
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
            <h2 className="text-title font-bold mb-component-gap">R-CRUD-1: Task Management Interface - DEMO</h2>
            
            <div className="space-y-component-gap">
              {/* Task Management Features */}
              <div>
                <h3 className="text-body font-medium mb-item-margin">✅ Implemented Features</h3>
                <ul className="space-y-item-margin text-small">
                  <li>• TaskInput: Add new tasks with Enter key support (max 256 chars)</li>
                  <li>• TaskList: Sorted display (active first, then completed)</li>
                  <li>• TaskItem: Toggle completion, delete on hover with confirmation</li>
                  <li>• Visual feedback: Strikethrough for completed tasks</li>
                  <li>• Immediate UI updates on all operations</li>
                  <li>• Empty state handling</li>
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
