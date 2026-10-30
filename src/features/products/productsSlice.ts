import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getErrorMessage from '../../utils/getErrorMessage'

export interface Product {
  id: number
  title: string
  category: string
  image: string
  price: number
}

export const fetchProductsData = createAsyncThunk<
  Product[],
  void,
  { state: StateWithProducts }
>(
  'products/fetch',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return (await response.json()) as Product[]
  },
  {
    condition: (_, { getState }) => {
      const { products } = getState()
      if (products.items.length > 0 || products.loading) {
        return false
      }
    },
  },
)

export type StateWithProducts = { products: ProductState }

interface ProductState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
}

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false
        state.error = getErrorMessage(action.error)
      })
  },
})

export const getAllProducts = (state: StateWithProducts) => state.products.items
export const getProductLoadingState = (state: StateWithProducts) =>
  state.products.loading
export const getProductError = (state: StateWithProducts) =>
  state.products.error

export default slice.reducer
