import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EmptyState from './EmptyState'

describe('EmptyState Component', () => {
  it('displays empty state message to the user', () => {
    render(<EmptyState />)
    const message = screen.getByText(/drop tasks here/i)
    expect(message).toBeInTheDocument()
  })
})
