import { Database, LayoutGrid } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { key: 'board', label: 'Board', icon: LayoutGrid, path: '/' },
  { key: 'data', label: 'Data', icon: Database, path: '/data-page' },
]

function ViewTabs() {
  return (
    <div className="flex w-fit items-center rounded-full bg-gray-100 p-1 shadow-inner">
      {tabs.map(({ key, label, icon: Icon, path }) => (
        <NavLink
          key={key}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `flex cursor-pointer items-center gap-2 rounded-full px-5 py-1.5 text-sm transition-all ${
              isActive
                ? 'bg-[#9DB89A] font-medium text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <Icon size={15} />
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export default ViewTabs