import { Search } from 'lucide-react'
import Input from './ui/Input'
import type { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
}

function Header({ searchInput, setSearchInput }: HeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-4 p-6 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col">
          <h1 className="font-libre text-4xl text-gray-900">Team Task Board</h1>
          <p className="ml-1 font-quick text-gray-500">
            Drag cards between columns
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search tasks"
            placeholder="Search tasks"
            className="h-10 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-[#9DB89A]"
          />
        </div>
      </div>
    </>
  )
}

export default Header
