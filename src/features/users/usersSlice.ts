import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getErrorMessage from '../../utils/getErrorMessage'

export interface User {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
  }
}

export type StateWithUsers = { users: UserState }
export const fetchUsersData = createAsyncThunk<
  User[],
  void,
  { state: StateWithUsers }
>(
  'users/fetch',
  async () => {
    const response = await fetch('https://fakestoreapi.com/users')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return (await response.json()) as User[]
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState()
      if (users.items.length > 0 || users.loading) {
        return false
      }
    },
  },
)

interface UserState {
  items: User[]
  loading: boolean
  error: string | null
}
const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
}
const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.loading = false
        state.error = getErrorMessage(action.error)
      })
  },
})

export const getAllUsers = (state: StateWithUsers) => state.users.items
export const getUserLoadingState = (state: StateWithUsers) =>
  state.users.loading
export const getUserError = (state: StateWithUsers) => state.users.error

export default slice.reducer
