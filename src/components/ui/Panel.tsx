import type { ReactNode } from 'react'

type PanelProps = {
  title: string
  source: string
  count?: number
  children: ReactNode
  role: string
  ariaLabel: string
}

function Panel({
  title,
  source,
  count,
  children,
  role,
  ariaLabel,
}: PanelProps) {
  return (
    <section
      role={role}
      aria-label={ariaLabel}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
    >
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="font-libre text-2xl text-gray-900">{title}</h2>
          <p className="mt-0.5 text-xs text-gray-400">{source}</p>
        </div>
        {count !== undefined && (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
            {count}
          </span>
        )}
      </div>
      <div className="max-h-112 overflow-y-auto">{children}</div>
    </section>
  )
}

export default Panel
