import { useSelector } from 'react-redux'
import Column, { type ColumnItem } from './Column'
import {
  selectTasksCompleted,
  selectTasksInProgress,
  selectTasksTodo,
} from '../tasksSlice'
import filterTasksBySearch from '../../../utils/filterTasksBySearch'
import { useMemo } from 'react'

interface BoardProps {
  searchInput: string
}

function Board({ searchInput }: BoardProps) {
  const todoTasks = useSelector(selectTasksTodo)
  const inProgressTasks = useSelector(selectTasksInProgress)
  const completedTasks = useSelector(selectTasksCompleted)

  const columns: ColumnItem[] = useMemo(
    () => [
      {
        key: 'todo',
        title: 'To Do',
        dot: 'bg-stone-400',
        cards: filterTasksBySearch(searchInput, todoTasks),
      },
      {
        key: 'in-progress',
        title: 'In Progress',
        dot: 'bg-amber-400',
        cards: filterTasksBySearch(searchInput, inProgressTasks),
      },
      {
        key: 'done',
        title: 'Done',
        dot: 'bg-[#8AA787]',
        cards: filterTasksBySearch(searchInput, completedTasks),
      },
    ],
    [searchInput, todoTasks, inProgressTasks, completedTasks],
  )

  return (
    <div className="grid gap-4 border-t border-gray-200 bg-[#F7F6F2] p-4 sm:p-6 md:grid-cols-3">
      <Column columns={columns} />
    </div>
  )
}

export default Board
