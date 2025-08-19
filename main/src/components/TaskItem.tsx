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
  // Implementation coming soon
  return null;
}
