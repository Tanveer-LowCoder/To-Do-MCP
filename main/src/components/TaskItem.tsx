import React, { useState } from 'react';
import { Checkbox, Button } from './ui';

interface Task {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    // Confirmation before delete (as per acceptance criteria)
    if (showDeleteConfirm) {
      onDelete(); // Immediate removal from list
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleToggle = () => {
    onToggle(); // Visual feedback on state change, task reorders based on new state
  };

  return (
    <div 
      className={`
        flex items-center gap-component-gap p-item-margin 
        border border-border bg-background
        ${
          isHovered ? 'interactive-hover' : ''
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDeleteConfirm(false); // Cancel delete confirmation on mouse leave
      }}
    >
      {/* Checkbox for completion toggle */}
      <Checkbox
        checked={task.done}
        onChange={handleToggle}
        id={`task-${task.id}`}
      />
      
      {/* Task text display with visual distinction for completed tasks */}
      <span 
        className={`
          flex-1 text-body
          ${
            task.done 
              ? 'line-through text-gray-500' // Completed tasks have visual distinction (strikethrough)
              : 'text-foreground'
          }
        `}
      >
        {task.title}
      </span>
      
      {/* Delete button visible on task hover */}
      {isHovered && (
        <Button 
          variant={showDeleteConfirm ? "danger" : "secondary"}
          onClick={handleDeleteClick}
          className="text-small py-1 px-2"
        >
          {showDeleteConfirm ? 'Confirm?' : 'Delete'}
        </Button>
      )}
    </div>
  );
}
