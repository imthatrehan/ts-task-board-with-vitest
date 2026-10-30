import { describe, it, expect } from 'vitest'
import { screen, within, createEvent, fireEvent } from '@testing-library/react'
import Board from './Board'
import { renderWithProviders } from '../../../test/utils'

const createFakeDataTransfer = () => {
  const data = new Map<string, string>()

  return {
    setData: (format: string, value: string) => {
      data.set(format, value)
    },
    getData: (format: string) => {
      return data.get(format) || ''
    },
    clearData: () => {
      data.clear()
    },
    dropEffect: 'move',
    effectAllowed: 'all',
    types: ['text/plain'],
    files: [],
    items: [],
  }
}

const triggerDragAndDrop = (
  sourceCard: HTMLElement,
  targetColumn: HTMLElement,
) => {
  const dataTransfer = createFakeDataTransfer()
  const dragStartEvent = createEvent.dragStart(sourceCard)
  Object.defineProperty(dragStartEvent, 'dataTransfer', { value: dataTransfer })
  fireEvent(sourceCard, dragStartEvent)
  const dragOverEvent = createEvent.dragOver(targetColumn)
  Object.defineProperty(dragOverEvent, 'dataTransfer', { value: dataTransfer })
  const isDefaultPrevented = !fireEvent(targetColumn, dragOverEvent)
  const dropEvent = createEvent.drop(targetColumn)
  Object.defineProperty(dropEvent, 'dataTransfer', { value: dataTransfer })
  fireEvent(targetColumn, dropEvent)

  return { isDefaultPrevented }
}

describe('Board HTML5 Drag & Drop Flow', () => {
  const mockInitialState = {
    tasks: {
      items: [
        {
          id: 'card-101',
          title: 'Drag & Drop Feature',
          status: 'todo' as const,
          createdAt: Date.now(),
        },
      ],
    },
  }
  it('moves task card from To Do to Done column on drag and drop', () => {
    const { store } = renderWithProviders(<Board searchInput="" />, {
      preloadedState: mockInitialState,
    })
    const todoRegion = screen.getByRole('region', { name: /to do/i })
    const doneRegion = screen.getByRole('region', { name: /done/i })
    const card = within(todoRegion)
      .getByText('Drag & Drop Feature')
      .closest('li')!
    triggerDragAndDrop(card, doneRegion)
    expect(
      within(doneRegion).getByText('Drag & Drop Feature'),
    ).toBeInTheDocument()
    expect(
      within(todoRegion).queryByText('Drag & Drop Feature'),
    ).not.toBeInTheDocument()
    const currentTasks = store.getState().tasks.items
    expect(currentTasks[0].status).toBe('done')
  })
  it('calls preventDefault on dragOver to permit the drop operation', () => {
    renderWithProviders(<Board searchInput="" />, {
      preloadedState: mockInitialState,
    })

    const todoRegion = screen.getByRole('region', { name: /to do/i })
    const inProgressRegion = screen.getByRole('region', {
      name: /in progress/i,
    })
    const card = within(todoRegion)
      .getByText('Drag & Drop Feature')
      .closest('li')!
    const { isDefaultPrevented } = triggerDragAndDrop(card, inProgressRegion)
    expect(isDefaultPrevented).toBe(true)
  })

  it('handles dropping into the same column as a no-op without mutating status', () => {
    const { store } = renderWithProviders(<Board searchInput="" />, {
      preloadedState: mockInitialState,
    })

    const todoRegion = screen.getByRole('region', { name: /to do/i })
    const card = within(todoRegion)
      .getByText('Drag & Drop Feature')
      .closest('li')!

    triggerDragAndDrop(card, todoRegion)

    expect(
      within(todoRegion).getByText('Drag & Drop Feature'),
    ).toBeInTheDocument()
    expect(store.getState().tasks.items[0].status).toBe('todo')
  })
})
