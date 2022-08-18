import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import React from "react"
import Page from "./Page"

interface Props {
  onChangePage: (page: number) => void
  page: number
}

const Pagination: React.FC<Props> = ({ onChangePage, page }) => {
  const handleClickChevron = (type: "next" | "prev") => {
    onChangePage(type === "next" ? page + 1 : page - 1)
  }

  const handleClickPage = (page: number) => {
    onChangePage(page)
  }

  return (
    <div className="flex gap-2 my-8 float-right">
      <button
        aria-label="prev-page"
        disabled={page === 1}
        onClick={() => handleClickChevron("prev")}
        className="w-10 h-10 flex justify-center items-center border border-gray-300"
      >
        <ChevronLeftIcon className={`w-5 h-5 ${page === 1 && 'text-gray-300'}`} />
      </button>

      {[...Array(2)].map((_, i) => {
        const pageNumber = i + 1

        return (
          <Page
            key={i}
            num={pageNumber}
            onClick={() => handleClickPage(pageNumber)}
            active={page === pageNumber}
          />
        )
      })}

      <button
        aria-label="next-page"
        disabled={page === 2}
        onClick={() => handleClickChevron("next")}
        className="w-10 h-10 flex justify-center items-center border border-gray-300"
      >
        <ChevronRightIcon className={`w-5 h-5 ${page === 2 && 'text-gray-300'}`} />
      </button>
    </div>
  )
}

export default Pagination
