import React from "react"

interface Props {
  num: number
  active: boolean
  onClick: () => void
}

const Page: React.FC<Props> = ({ num, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex justify-center items-center border ${
        active ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <div className={`${active && "text-blue-500"}`}>{num}</div>
    </button>
  )
}

export default Page
