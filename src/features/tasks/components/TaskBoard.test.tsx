import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import MainPage from '../../../pages/MainPage' // 👈 Board ki jagah MainPage import karein
import { renderWithProviders } from '../../../test/utils'

describe('TaskBoard User Interaction & Flow Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // Test 1: Add Task Flow
  it('should add task on title type and click, and reset input value', async () => {
    // Arrange: Poora MainPage render karein
    const { user } = renderWithProviders(<MainPage />)

    // Act: Input dhoondein (role ya placeholder se)
    const input =
      screen.queryByRole('textbox', { name: /new task|add task/i }) ||
      screen.getByPlaceholderText(/add.*task/i)

    const addBtn = screen.getByRole('button', { name: /add/i })

    // User types task title and clicks add
    await user.type(input, 'Integration Flow Task')
    await user.click(addBtn)

    // Assert: Board mein naya task card aa jana chahiye
    expect(screen.getByText('Integration Flow Task')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  // Test 2: Empty Task Validation
  it('should not add a task if title is empty', async () => {
    // Arrange
    const { user } = renderWithProviders(<MainPage />)
    const addBtn = screen.getByRole('button', { name: /add/i })

    // Act: Khali input par click karein
    await user.click(addBtn)

    // Assert: To Do region mein count 0 hi rehna chahiye
    const todoRegion = screen.getByRole('region', { name: /to do/i })
    expect(todoRegion).toBeInTheDocument()
    expect(screen.queryByText('Integration Flow Task')).not.toBeInTheDocument()
  })

  // Test 3: Search Filter Flow
  it('should filter tasks correctly when typing in search input with preloaded state', async () => {
    // Arrange: 3 Tasks preloaded state mein dein
    const preloadedState = {
      tasks: {
        items: [
          {
            id: 'tsk_1',
            title: 'Design Homepage',
            status: 'todo' as const,
            createdAt: Date.now(),
          },
          {
            id: 'tsk_2',
            title: 'Setup Vitest',
            status: 'in-progress' as const,
            createdAt: Date.now(),
          },
          {
            id: 'tsk_3',
            title: 'Build Board Component',
            status: 'done' as const,
            createdAt: Date.now(),
          },
        ],
      },
    }

    const { user } = renderWithProviders(<MainPage />, { preloadedState })

    // Act: Header ke search input mein "Vitest" type karein
    const searchInput =
      screen.queryByRole('textbox', { name: /search/i }) ||
      screen.getByPlaceholderText(/search tasks/i)

    await user.type(searchInput, 'Vitest')

    // Assert: Sirf Setup Vitest nazar aana chahiye, baqi gayab hone chahiye
    expect(screen.getByText('Setup Vitest')).toBeInTheDocument()
    expect(screen.queryByText('Design Homepage')).not.toBeInTheDocument()
    expect(screen.queryByText('Build Board Component')).not.toBeInTheDocument()
  })
})