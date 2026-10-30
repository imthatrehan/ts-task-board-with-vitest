import type { User } from '../../../hooks/useFetch'

interface UserRowProps {
  user: User
}

function UserRow({ user }: UserRowProps) {
  const fullName = `${user.name.firstname} ${user.name.lastname}`
  const initial = user.name.firstname.charAt(0).toUpperCase()

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#9DB89A] text-sm font-semibold text-white">
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-medium capitalize text-gray-800">
          {fullName}
        </p>
        <p className="line-clamp-1 text-xs text-gray-400">
          @{user.username} · {user.email}
        </p>
      </div>
      <p className="hidden text-xs capitalize text-gray-500 sm:block">
        {user.address.city}
      </p>
    </div>
  )
}

export default UserRow