import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Board from '../features/tasks/components/Board.tsx'
import { renderWithProviders } from '../test/utils.tsx'

describe('Board Component with renderWithProviders', () => {
  it('should render tasks from preloadedState correctly', () => {
    const preloadedState = {
      tasks: {
        items: [
          {
            id: 'tsk_1',
            title: 'Test Task Redux',
            status: 'todo' as const,
            createdAt: Date.now(),
          },
        ],
      },
    }

    renderWithProviders(<Board searchInput="" />, { preloadedState })

    const region = screen.getByRole('region', { name: /to do/i })
    expect(region).toBeInTheDocument()
    expect(screen.getByText('Test Task Redux')).toBeInTheDocument()
  })
})