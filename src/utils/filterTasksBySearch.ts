import type { Task } from '../features/tasks/tasksSlice'

export default function filterTasksBySearch(
  input: string = '',
  tasks: Task[] = [],
): Task[] {
  const query = input.toLowerCase().trim()
  if (!query) return tasks
  return tasks.filter((f) => String(f.title).toLowerCase().includes(query))
}
