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
  // Implementation coming soon
  return null;
}
