import { CalendarDays, Check, GripVertical, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  deleteTask,
  moveTask,
  selectTasks,
  toggleComplete,
  updateTask,
  type Task,
} from '../tasksSlice'
import formatDate from '../../../utils/formatDate'
import EmptyState from '../../../components/ui/EmptyState'
import { useDispatch, useSelector } from 'react-redux'

export interface ColumnItem {
  key: 'todo' | 'in-progress' | 'done'
  title: 'To Do' | 'In Progress' | 'Done' | string
  dot: string
  cards: Task[]
}

interface ColumnsProps {
  columns: ColumnItem[]
}

function Column({ columns }: ColumnsProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [draggedColumn, setDraggedColumn] = useState<Task['status'] | null>(
    null,
  )
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)

  const handleSaveEdit = (cardId: string) => {
    const trimmed = editText.trim()
    if (!trimmed) return
    const isDuplicate = tasks.some(
      (f) =>
        String(f.title).toLowerCase() === trimmed.toLowerCase() &&
        f.id !== cardId,
    )
    if (isDuplicate) return
    dispatch(updateTask({ id: cardId, title: trimmed }))
    setEditingId(null)
    setEditText('')
  }

  return (
    <>
      {columns.map((col) => {
        const headingId = `column-heading-${col.key}`

        return (
          <section
            key={col.key}
            onDragOver={(e) => {
              e.preventDefault()
              setDraggedColumn(col.key)
            }}
            onDragLeave={(e) => {
              if (e.currentTarget.contains(e.relatedTarget as Node)) return
              setDraggedColumn(null)
            }}
            onDrop={(e) => {
              e.preventDefault()
              const taskId = e.dataTransfer.getData('text/plain')
              if (taskId) {
                dispatch(moveTask({ id: taskId, status: col.key }))
              }
              setDraggedColumn(null)
              setDraggingId(null)
            }}
            role="region"
            aria-labelledby={headingId}
            className={`flex min-h-72 flex-col rounded-2xl border-2 p-3 transition-colors ${
              draggedColumn === col.key
                ? 'border-dashed border-[#9DB89A] bg-[#F1F6EF]'
                : 'border-transparent bg-gray-100/80'
            }`}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <h2
                id={headingId}
                className="flex items-center gap-2 text-sm font-medium text-gray-800"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                {col.title}
              </h2>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs text-gray-500">
                {col.cards.length}
              </span>
            </div>

            <ul className="flex flex-1 flex-col gap-2.5">
              {col.cards.length === 0 && draggedColumn !== col.key ? (
                <EmptyState />
              ) : (
                col.cards.map((card) =>
                  editingId === card.id ? (
                    <li
                      key={card.id}
                      className="flex items-center gap-3 rounded-xl border border-[#C9D9C6] bg-[#F1F6EF] p-3.5"
                    >
                      <input
                        autoFocus
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setEditingId(null)
                            setEditText('')
                          }
                          if (e.key === 'Enter') {
                            handleSaveEdit(card.id)
                          }
                        }}
                        className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(card.id)}
                        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-500 text-white hover:bg-[#8AA787]"
                      >
                        <Check size={14} />
                      </button>
                    </li>
                  ) : (
                    <li
                      key={card.id}
                      onDoubleClick={() => {
                        if (editingId !== null) return
                        if (card.status === 'todo') {
                          setEditingId(card.id)
                          setEditText(String(card.title))
                        }
                      }}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', card.id)
                        setDraggingId(card.id)
                      }}
                      onDragEnd={() => {
                        setDraggingId(null)
                        setDraggedColumn(null)
                      }}
                      draggable
                      title={String(card.title)}
                      className={`group flex w-full items-start gap-2.5 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition ${
                        draggingId === card.id
                          ? 'scale-95 opacity-40'
                          : 'hover:border-[#9DB89A] hover:shadow-md'
                      }`}
                    >
                      <GripVertical
                        size={16}
                        className="my-auto shrink-0 text-gray-300 transition-colors group-hover:text-gray-500 cursor-grab"
                      />
                      <button
                        type="button"
                        aria-label={`Toggle ${card.title}`}
                        aria-pressed={card.status === 'done'}
                        onClick={() => dispatch(toggleComplete(card.id))}
                        className={`my-auto flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
                          card.status === 'done'
                            ? 'bg-[#8AA787] text-white'
                            : 'border-2 border-gray-300 hover:border-[#9DB89A]'
                        }`}
                      >
                        {card.status === 'done' && <Check size={12} />}
                      </button>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <p
                          className={`text-sm leading-snug truncate ${
                            card.status === 'done'
                              ? 'text-gray-400 line-through'
                              : 'text-gray-800'
                          }`}
                        >
                          {card.title}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                          <CalendarDays size={12} />
                          {formatDate(card.createdAt)}
                        </p>

                        <select
                          value={card.status}
                          aria-label={`Move ${card.title} status`}
                          onChange={(e) =>
                            dispatch(
                              moveTask({
                                id: card.id,
                                status: e.target.value as Task['status'],
                              }),
                            )
                          }
                          className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 md:hidden"
                        >
                          <option value="todo">To Do</option>
                          <option value="in-progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        aria-label={`Delete ${card.title}`}
                        onClick={() => dispatch(deleteTask(card.id))}
                        className="cursor-pointer text-gray-400 transition-colors hover:text-red-500 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ),
                )
              )}
              {draggedColumn === col.key && (
                <li className="h-14 rounded-xl border-2 border-dashed border-[#9DB89A]/60 bg-white/60" />
              )}
            </ul>
          </section>
        )
      })}
    </>
  )
}

export default Column
