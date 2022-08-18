import React from "react"
import { SearchIcon } from "@heroicons/react/outline"

interface Props {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Searchbar: React.FC<Props> = ({ value = "", onChange }) => {
  return (
    <div>
      <div className="mb-1">Search</div>

      <div className="flex">
        <input
          value={value}
          onChange={onChange}
          aria-label="searchbar"
          className="border border-gray-100 py-2 px-4 focus:outline-none"
          placeholder="Search..."
        />
        <div className="h-full p-4 bg-blue-500">
          <SearchIcon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}

export default Searchbar
