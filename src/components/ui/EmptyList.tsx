import { Inbox } from 'lucide-react'

type EmptyListProps = {
  message: string
}

function EmptyList({ message }: EmptyListProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <Inbox size={28} strokeWidth={1.4} className="text-gray-400" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}

export default EmptyList
