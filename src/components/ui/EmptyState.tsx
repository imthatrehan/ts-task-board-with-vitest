import { Inbox } from 'lucide-react'

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-10 text-center">
      <Inbox size={28} strokeWidth={1.4} className="text-gray-400" />
      <p className="text-sm text-gray-500">Drop tasks here</p>
    </div>
  )
}

export default EmptyState
