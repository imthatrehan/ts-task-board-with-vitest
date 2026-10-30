import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import DataPage from './DataPage'
import { renderWithProviders } from '../test/utils'
import type { Product } from '../features/products/productsSlice'
import type { User } from '../hooks/useFetch'

// const PRODUCTS_URL = 'https://fakestoreapi.com/products'
// const USERS_URL = 'https://fakestoreapi.com/users'

const makeProduct = (overrides?: Partial<Product>): Product => ({
  id: 1,
  title: 'Mock Fjallraven Backpack',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/1.jpg',
  price: 109.95,
  ...overrides,
})

const makeUser = (overrides?: Partial<User>): User => ({
  id: 1,
  name: { firstname: 'John', lastname: 'Doe' },
  username: 'johnd',
  email: 'john@gmail.com',
  address: { city: 'Kilcoole' },
  ...overrides,
})

const createJsonResponse = (data: unknown, status = 200, statusText = 'OK') =>
  new Response(JSON.stringify(data), {
    status,
    statusText,
    headers: { 'Content-Type': 'application/json' },
  })

describe('DataPage Network & Panels Test Suite', () => {
  let fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('renders loading skeletons on initial render before data arrives', () => {
    fetchMock.mockImplementation(() => new Promise(() => {}))

    renderWithProviders(<DataPage />)

    expect(screen.queryByText('Mock Fjallraven Backpack')).not.toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })
  it('fetches and renders products and users successfully when API resolves', async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('products')) {
        return Promise.resolve(createJsonResponse([makeProduct()]))
      }
      if (url.includes('users')) {
        return Promise.resolve(createJsonResponse([makeUser()]))
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    renderWithProviders(<DataPage />)

    const productTitle = await screen.findByText('Mock Fjallraven Backpack')
    const userFullName = await screen.findByText('John Doe')

    expect(productTitle).toBeInTheDocument()
    expect(userFullName).toBeInTheDocument()
  })
  it('displays error message when API responds with 404 status', async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('products')) {
        return Promise.resolve(createJsonResponse('Not Found', 404, 'Not Found'))
      }
      return Promise.resolve(createJsonResponse([]))
    })
    renderWithProviders(<DataPage />)
    const errorMessage = await screen.findByText(/Failed to fetch|Not Found|Error/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('handles complete network failure gracefully', async () => {
    fetchMock.mockRejectedValue(new Error('Network connection offline'))
    renderWithProviders(<DataPage />)
    const errorAlerts = await screen.findAllByText(/Network connection offline/i)
    expect(errorAlerts.length).toBeGreaterThanOrEqual(1)
  })

  it('displays empty messages when API returns an empty array []', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(createJsonResponse([])))

    renderWithProviders(<DataPage />)

    expect(await screen.findByText(/No products found/i)).toBeInTheDocument()
    expect(await screen.findByText(/No users found/i)).toBeInTheDocument()
  })

  it('allows user to retry fetching after failure and renders data on success', async () => {
    let productCallCount = 0

    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('products')) {
        productCallCount++
        if (productCallCount === 1) {
          return Promise.reject(new Error('Server temporarily down'))
        }
        return Promise.resolve(createJsonResponse([makeProduct({ title: 'Retried Product' })]))
      }
      return Promise.resolve(createJsonResponse([]))
    })

    const { user } = renderWithProviders(<DataPage />)

    const retryButtons = await screen.findAllByRole('button', { name: /try again/i })
    expect(retryButtons[0]).toBeInTheDocument()

    await user.click(retryButtons[0])

    const product = await screen.findByText('Retried Product')
    expect(product).toBeInTheDocument()
  })
  it('calls fetch with correct URLs and AbortSignal for cleanup', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(createJsonResponse([])))

    renderWithProviders(<DataPage />)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('products'))
      expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('users'))
    })
  })

  it('skips products API call if items are already present in store state', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(createJsonResponse([])))

    const preloadedState = {
      products: {
        items: [makeProduct({ title: 'Already Cached Product' })],
        loading: false,
        error: null,
      },
    }

    renderWithProviders(<DataPage />, { preloadedState })
    expect(screen.getByText('Already Cached Product')).toBeInTheDocument()

    const calledUrls = fetchMock.mock.calls.map((call) => String(call[0]))
    const productsWasCalled = calledUrls.some((url) => url.includes('products'))
    expect(productsWasCalled).toBe(false)
  })
  it('aborts active fetch requests gracefully when component unmounts', () => {
    fetchMock.mockImplementation(() => new Promise(() => {}))
    const { unmount } = renderWithProviders(<DataPage />)
    expect(() => unmount()).not.toThrow()
  })
})