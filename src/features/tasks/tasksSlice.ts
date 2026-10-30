import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import loadState from '../../utils/storage.ts'
import generateId from '../../utils/generateId.ts'

export interface Task {
  id: string
  title: string | number
  createdAt: number
  status: 'todo' | 'in-progress' | 'done'
}

export interface TasksState {
  items: Task[]
}

const initialState: TasksState = {
  items: loadState<Task[]>('tasks', []),
}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      prepare(title: string) {
        return {
          payload: {
            id: generateId(),
            title,
            createdAt: Date.now(),
            status: 'todo',
          } as Task,
        }
      },
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload)
      },
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((f) => f.id !== action.payload)
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const match = state.items.find((f) => f.id === action.payload)
      if (match) {
        match.status = match.status === 'done' ? 'todo' : 'done'
      }
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; title: string | number }>,
    ) {
      const { id, title } = action.payload
      const match = state.items.find((f) => f.id === id)
      if (!match) return
      if (match.title === title) {
        return
      } else match.title = title
    },
    moveTask(
      state,
      action: PayloadAction<{ id: string; status: Task['status'] }>,
    ) {
      const { id, status } = action.payload
      const match = state.items.find((f) => f.id === id)
      if (!match) return
      if (match) {
        match.status = status
      }
    },
    clearCompleted(state) {
      state.items = state.items.filter((c) => c.status !== 'done')
    },
  },
})

type StateWithTasks = { tasks: TasksState }

export const selectTasks = (state: StateWithTasks) => state.tasks.items
export const selectTasksCount = (state: StateWithTasks) =>
  state.tasks.items.length
export const selectTasksTodo = createSelector([selectTasks], (items) =>
  items.filter((t) => t.status === 'todo'),
)
export const selectTasksInProgress = createSelector([selectTasks], (items) =>
  items.filter((t) => t.status === 'in-progress'),
)
export const selectTasksCompleted = createSelector([selectTasks], (items) =>
  items.filter((t) => t.status === 'done'),
)
export const selectTasksCompletedCount = (state: StateWithTasks) =>
  state.tasks.items.filter((c) => c.status === 'done').length
export const selectTasksRemainingCount = (state: StateWithTasks) =>
  state.tasks.items.filter((c) => c.status !== 'done').length

export const {
  addTask,
  deleteTask,
  toggleComplete,
  updateTask,
  moveTask,
  clearCompleted,
} = slice.actions

export default slice.reducer
