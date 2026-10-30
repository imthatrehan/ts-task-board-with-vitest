import { useDispatch, useSelector } from 'react-redux'
import {
  clearCompleted,
  selectTasks,
  selectTasksCompletedCount,
  selectTasksRemainingCount,
} from '../features/tasks/tasksSlice'

function Footer() {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)
  const remaining = useSelector(selectTasksRemainingCount)
  const completed = useSelector(selectTasksCompletedCount)
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 text-sm text-gray-500">
      <span>
        {tasks.length === 0
          ? 'No tasks added'
          : remaining === 1
            ? '1 task left'
            : `${remaining} tasks left`}
      </span>
      <button
        onClick={() => dispatch(clearCompleted())}
        disabled={completed === 0}
        className={`
        transition-colors
        ${
          completed === 0
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-500 hover:text-red-400 hover:underline cursor-pointer'
        }
      `}
      >
        Clear completed
      </button>
    </div>
  )
}

export default Footer
