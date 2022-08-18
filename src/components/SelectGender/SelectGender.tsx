import React, { useEffect, useState } from "react"
import { SearchIcon } from "@heroicons/react/outline"
import useDebounceValue from "hooks/useDebounceValue"

interface Props {
  value: string
  onChange: (val: string) => void
}

type Option = { value: string; label: string }

const options: Option[] = [
  { value: "", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

const SelectGender: React.FC<Props> = ({ onChange, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <div>
      <div className="mb-1">Gender</div>

      <select
        aria-label="select-gender"
        value={value}
        onChange={handleChange}
        className="h-full w-[150px] border border-gray-200 bg-white p-4"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectGender
