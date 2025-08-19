# Task CRUD Operations PRD

## Overview
Implementation of core task management functionality including adding, viewing, updating, and deleting tasks.

## Requirements

### R-CRUD-1: Task Management Interface
Status: Not Started

#### Components
1. TaskInput Component
   - Text input field for new tasks
   - Add button
   - Enter key submission support
   Files: /main/src/components/TaskInput.tsx

2. TaskList Component
   - Renders list of tasks
   - Handles sorting (active first, then completed)
   - Empty state handling
   Files: /main/src/components/TaskList.tsx

3. TaskItem Component
   - Checkbox for completion toggle
   - Task text display
   - Delete button
   - Hover states
   Files: /main/src/components/TaskItem.tsx

### Acceptance Criteria

#### Add Task
- Input field accepts text up to 256 characters
- Empty tasks cannot be added
- New tasks are added to top of active tasks
- Input field clears after task addition

#### View Tasks
- Tasks display in order: active first, then completed
- Each task shows completion status and text
- Completed tasks have visual distinction (strikethrough)
- List updates immediately on any change

#### Complete/Incomplete Toggle
- Checkbox toggles task state
- Visual feedback on state change
- Task reorders based on new state
- State persists after app restart

#### Delete Task
- Delete button visible on task hover
- Confirmation before delete
- Immediate removal from list
- No way to recover deleted tasks

## Technical Implementation

### Component Structure
```typescript
// TaskInput.tsx
interface TaskInputProps {
  onAddTask: (title: string) => void;
}

// TaskList.tsx
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

// TaskItem.tsx
interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}
```

### Data Model
```typescript
interface Task {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
}
```

## ASCII Wireframes

### Task Input
```
+----------------------------------+
| [ Add new task            ] [+] |
+----------------------------------+
```

### Task List
```
+----------------------------------+
| [ ] Active task 1            [x]|
| [ ] Active task 2            [x]|
|----------------------------------|
| [x] Completed task 1          [x]|
| [x] Completed task 2          [x]|
+----------------------------------+
```

### Task Item States
```
// Normal state
| [ ] Task text                 [x]|

// Hover state
| [ ] Task text             [DEL] |

// Completed state
| [x] Task text                 [x]|
```

## Dependencies
- R-UI-1: UI Components (shadcn/ui)
- R-PERSIST-1: Data Persistence

## Testing Requirements
- Unit tests for all components
- Integration tests for task operations
- E2E tests for critical flows
