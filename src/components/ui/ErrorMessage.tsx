import { AlertTriangle } from 'lucide-react'

type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="m-4 flex flex-col items-start rounded-xl border border-red-200 bg-red-50 p-5">
      <AlertTriangle size={26} strokeWidth={1.4} className="text-red-500" />
      <h3 className="mt-3 text-base font-medium text-gray-900">
        Couldn't load data
      </h3>
      <p role="alert" className="mt-1 text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 cursor-pointer rounded-full border border-red-300 px-4 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 active:scale-95"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage