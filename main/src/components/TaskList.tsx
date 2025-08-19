import React from 'react';
import { TaskItem } from './TaskItem';

interface Task {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  // Handles sorting (active first, then completed) as per acceptance criteria
  const activeTasks = tasks.filter(task => !task.done).sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // New tasks at top
  );
  const completedTasks = tasks.filter(task => task.done).sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Empty state handling
  if (tasks.length === 0) {
    return (
      <div className="text-center py-container-padding text-gray-500">
        <p className="text-body">No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-item-margin">
      {/* Active Tasks Section */}
      {activeTasks.length > 0 && (
        <div>
          <h2 className="text-body font-medium mb-item-margin text-gray-700">
            Active Tasks ({activeTasks.length})
          </h2>
          <div className="space-y-item-margin">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Separator between active and completed tasks */}
      {activeTasks.length > 0 && completedTasks.length > 0 && (
        <hr className="border-border my-container-padding" />
      )}

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-body font-medium mb-item-margin text-gray-700">
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-item-margin">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
