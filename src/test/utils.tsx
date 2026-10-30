import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { makeStore, type AppStore, type RootState } from '../app/store'
import type { JSX, PropsWithChildren } from 'react'
import { render, type RenderOptions } from '@testing-library/react'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = makeStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
