import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import Board from './Board'
import { renderWithProviders } from '../../../test/utils'

describe('Board Component (User Perspective)', () => {
  const mockInitialState = {
    tasks: {
      items: [
        {
          id: 'task-1',
          title: 'Learn Vitest RTL',
          status: 'todo' as const,
          createdAt: Date.now(),
        },
        {
          id: 'task-2',
          title: 'Design Wireframe',
          status: 'done' as const,
          createdAt: Date.now(),
        },
      ],
    },
  }

  it('renders tasks inside their respective column regions with correct count badge', () => {
    renderWithProviders(<Board searchInput="" />, {
      preloadedState: mockInitialState,
    })
    const todoRegion = screen.getByRole('region', { name: /to do/i })
    expect(todoRegion).toBeInTheDocument()
    expect(within(todoRegion).getByText('1')).toBeInTheDocument()
    expect(within(todoRegion).getByText('Learn Vitest RTL')).toBeInTheDocument()
    const doneRegion = screen.getByRole('region', { name: /done/i })
    expect(doneRegion).toBeInTheDocument()
    expect(within(doneRegion).getByText('1')).toBeInTheDocument()
    expect(within(doneRegion).getByText('Design Wireframe')).toBeInTheDocument()
  })
  it('toggles task status and updates aria-pressed when user clicks toggle button', async () => {
    const { user } = renderWithProviders(<Board searchInput="" />, {
      preloadedState: mockInitialState,
    })
    const todoRegion = screen.getByRole('region', { name: /to do/i })
    const toggleBtn = within(todoRegion).getByRole('button', {
      name: /toggle learn vitest rtl/i,
    })
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggleBtn)
    const doneRegion = screen.getByRole('region', { name: /done/i })
    const doneToggleBtn = within(doneRegion).getByRole('button', {
      name: /toggle learn vitest rtl/i,
    })
    expect(doneToggleBtn).toHaveAttribute('aria-pressed', 'true')
  })
  it('removes task from the screen when user clicks delete button', async () => {
    const { user } = renderWithProviders(<Board searchInput="" />, {
      preloadedState: mockInitialState,
    })
    const todoRegion = screen.getByRole('region', { name: /to do/i })
    const deleteBtn = within(todoRegion).getByRole('button', {
      name: /delete learn vitest rtl/i,
    })
    await user.click(deleteBtn)
    expect(screen.queryByText('Learn Vitest RTL')).not.toBeInTheDocument()
  })
})
