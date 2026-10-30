import { describe, expect, it } from 'vitest'
import type { Task } from '../features/tasks/tasksSlice'
import filterTasksBySearch from './filterTasksBySearch'

describe('filterTasksBySearch utility', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Design Homepage', status: 'todo', createdAt: 1000 },
    { id: '2', title: 'Setup Vitest', status: 'in-progress', createdAt: 2000 },
    { id: '3', title: 'Build Component', status: 'done', createdAt: 3000 },
  ]
  it('should return only matching tasks when query matches', () => {
    const result = filterTasksBySearch('Setup', mockTasks)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })
  it('should return empty array when no tasks match the query', () => {
    const result = filterTasksBySearch('NonExistentTask', mockTasks)
    expect(result).toEqual([])
  })
  it('should return all tasks when query is empty or contains only spaces', () => {
    const resultEmpty = filterTasksBySearch('', mockTasks)
    const resultSpaces = filterTasksBySearch('   ', mockTasks)
    expect(resultEmpty).toHaveLength(3)
    expect(resultSpaces).toHaveLength(3)
  })
  it('should perform case-insensitive and trimmed search', () => {
    const result = filterTasksBySearch('  DESIGN  ', mockTasks)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
  it('should not mutate the original input array', () => {
    const originalCopy = [...mockTasks]
    filterTasksBySearch('Setup', mockTasks)
    expect(mockTasks).toEqual(originalCopy)
  })
})
