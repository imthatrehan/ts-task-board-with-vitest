import { Plus } from 'lucide-react'
import { useState } from 'react'
import Input from './Input'
import { addTask, selectTasks } from '../../features/tasks/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'

function AddTask() {
  const [inputValue, setInputValue] = useState('')
  const tasks = useSelector(selectTasks)
  const dispatch = useDispatch()
  return (
    <div className="flex gap-3 px-6 pb-6">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (inputValue.trim() === '') return
          const match = tasks.find((f) => f.title === inputValue)
          if (match) return
          if (e.key === 'Enter') {
            dispatch(addTask(inputValue.trim()))
            setInputValue('')
          }
        }}
        aria-label="New task title"
        placeholder="Add a new task..."
        className="h-12 min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 outline-none placeholder:text-gray-400 focus:border-[#9DB89A]"
      />
      <button
        onClick={() => {
          if (inputValue.trim() === '') return
          const match = tasks.find((f) => f.title === inputValue)
          if (match) return
          dispatch(addTask(inputValue.trim()))
          setInputValue('')
        }}
        aria-label="Add task"
        className="flex h-12 cursor-pointer items-center gap-2 rounded-xl bg-[#9DB89A] px-5 font-medium text-white transition-colors hover:bg-[#8AA787]"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Add Task</span>
      </button>
    </div>
  )
}

export default AddTask
