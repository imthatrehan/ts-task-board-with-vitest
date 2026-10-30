import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Footer from './Footer'
import { renderWithProviders } from '../test/utils'

describe('Footer Component', () => {
  it('shows correct remaining tasks count and disables clear button when no completed tasks', () => {
    const stateWithoutCompleted = {
      tasks: {
        items: [
          {
            id: '1',
            title: 'Task 1',
            status: 'todo' as const,
            createdAt: 1000,
          },
        ],
      },
    }
    renderWithProviders(<Footer />, {
      preloadedState: stateWithoutCompleted,
    })
    expect(screen.getByText(/1 task left/i)).toBeInTheDocument()
    const clearBtn = screen.getByRole('button', { name: /clear/i })
    expect(clearBtn).toBeDisabled()
  })

  it('enables clear button when there are completed tasks and clears on click', async () => {
    const stateWithCompleted = {
      tasks: {
        items: [
          {
            id: '1',
            title: 'Done Task',
            status: 'done' as const,
            createdAt: 1000,
          },
        ],
      },
    }
    const { user } = renderWithProviders(<Footer />, {
      preloadedState: stateWithCompleted,
    })
    const clearBtn = screen.getByRole('button', { name: /clear/i })
    expect(clearBtn).toBeEnabled()
    await user.click(clearBtn)
    expect(clearBtn).toBeDisabled()
  })
})
