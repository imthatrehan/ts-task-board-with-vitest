import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice.ts'
import productsReducer from '../features/products/productsSlice.ts'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  products: productsReducer,
})

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export const store = makeStore()

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('tasks', JSON.stringify(state.tasks.items))
})
