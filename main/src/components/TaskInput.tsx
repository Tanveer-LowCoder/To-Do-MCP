import React, { useState } from 'react';
import { Input, Button } from './ui';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    // Trim whitespace and check if not empty (as per acceptance criteria)
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAddTask(trimmedTitle);
      setTitle(''); // Clear input field after task addition
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter key submission support (as per acceptance criteria)
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-component-gap">
      <Input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        maxLength={256} // Input field accepts text up to 256 characters
        className="flex-1"
      />
      <Button 
        onClick={handleSubmit}
        variant="primary"
        disabled={!title.trim()} // Disabled when empty to prevent empty tasks
      >
        +
      </Button>
    </div>
  );
}
