import { describe, expect, it } from 'vitest'
import tasksReducer, {
  addTask,
  clearCompleted,
  deleteTask,
  moveTask,
  toggleComplete,
  updateTask,
} from './tasksSlice'

describe('tasksSlice Reducers', () => {
  const initialTestState = {
    items: [
      {
        id: '1',
        title: 'Learn Vitest',
        status: 'todo' as const,
        createdAt: 1000,
      },
      {
        id: '2',
        title: 'Build UI',
        status: 'in-progress' as const,
        createdAt: 2000,
      },
      {
        id: '3',
        title: 'Review Code',
        status: 'done' as const,
        createdAt: 3000,
      },
    ],
  }
  it('should add a new task to the beginning of the list using unshift', () => {
    const action = addTask('New Redux Task')
    const state = tasksReducer(initialTestState, action)
    expect(state.items).toHaveLength(4)
    expect(state.items[0].title).toBe('New Redux Task')
    expect(state.items[0].status).toBe('todo')
    expect(state.items[0].id).toBeDefined()
  })
  it('should delete a task by id', () => {
    const action = deleteTask('2')
    const state = tasksReducer(initialTestState, action)
    expect(state.items).toHaveLength(2)
    expect(state.items.find((f) => f.id === '2')).toBeUndefined()
  })
  it('should toggle task status between done and todo', () => {
    const action1 = toggleComplete('1')
    const state1 = tasksReducer(initialTestState, action1)
    expect(state1.items.find((f) => f.id === '1')?.status).toBe('done')
    const action2 = toggleComplete('3')
    const state2 = tasksReducer(initialTestState, action2)
    expect(state2.items.find((i) => i.id === '3')?.status).toBe('todo')
  })
  it('should update task title by id', () => {
    const action = updateTask({ id: '1', title: 'Master Vitest Testing' })
    const state = tasksReducer(initialTestState, action)
    const updated = state.items.find((i) => i.id === '1')
    expect(updated?.title).toBe('Master Vitest Testing')
  })
  it('should move task to another column status', () => {
    const action = moveTask({ id: '1', status: 'done' })
    const state = tasksReducer(initialTestState, action)
    const moved = state.items.find((i) => i.id === '1')
    expect(moved?.status).toBe('done')
  })
  it('should clear all completed tasks', () => {
    const action = clearCompleted()
    const state = tasksReducer(initialTestState, action)

    expect(state.items).toHaveLength(2)
    expect(state.items.some((i) => i.status === 'done')).toBe(false)
  })
  it('should handle missing id edge cases safely without crashing', () => {
    const action = deleteTask('non_existent_id')
    const state = tasksReducer(initialTestState, action)
    expect(state.items).toEqual(initialTestState.items)
    expect(() =>
      tasksReducer(initialTestState, toggleComplete('non_existent_id')),
    ).not.toThrow()
    expect(() =>
      tasksReducer(
        initialTestState,
        updateTask({ id: 'non_existent_id', title: 'Ghost' }),
      ),
    ).not.toThrow()
  })
  it('should guarantee immutability and not mutate original state', () => {
    const stateBefore = {
      items: [
        {
          id: '1',
          title: 'Original Task',
          status: 'todo' as const,
          createdAt: 1000,
        },
      ],
    }
    const snapshotBefore = JSON.parse(JSON.stringify(stateBefore))
    const nextState = tasksReducer(stateBefore, addTask('New Task'))
    expect(stateBefore).toEqual(snapshotBefore)
    expect(nextState).not.toBe(stateBefore)
    expect(nextState.items).not.toBe(stateBefore.items)
  })
})
