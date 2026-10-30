function ListSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          role="status"
          aria-live="polite"
          className="flex animate-pulse items-center gap-4 px-5 py-3.5"
        >
          <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-3/4 rounded bg-gray-100" />
            <div className="h-3 w-1/4 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListSkeleton
