import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useState } from "react"
import Pagination from "./Pagination"

const PaginationRenderer = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div>now we are in page : {currentPage}</div>
      <Pagination page={currentPage} onChangePage={handleChangePage} />
    </>
  )
}

describe("testing Pagination", () => {
  it("should render <Pagination /> properly", () => {
    render(<PaginationRenderer />)

    expect(screen.getByText(/now we are in page : 1/i)).toBeTruthy()
  })

  it("should go to page 2 if clicked", () => {
    const { getByText } = render(<PaginationRenderer />)

    const page2 = getByText("2")
    fireEvent.click(page2)
    expect(screen.getByText(/now we are in page : 2/i)).toBeTruthy()
  })

  it("should go to next and prev page if chevron clicked", () => {
    const { getByLabelText } = render(<PaginationRenderer />)

    const rightChevron = getByLabelText("next-page")
    fireEvent.click(rightChevron)

    expect(screen.getByText(/now we are in page : 2/i)).toBeTruthy()

    const leftChevron = getByLabelText("prev-page")
    fireEvent.click(leftChevron)

    expect(screen.getByText(/now we are in page : 1/i)).toBeTruthy()
  })

  it("should disable chevron if current page is at first or last page", () => {
    const { getByLabelText, getByText } = render(<PaginationRenderer />)

    const leftChevron = getByLabelText("prev-page")
    fireEvent.click(leftChevron)

    expect(leftChevron).toBeDisabled()

    const page2 = getByText("2")
    fireEvent.click(page2)

    const rightChevron = getByLabelText("next-page")
    expect(rightChevron).toBeDisabled()
  })
})
