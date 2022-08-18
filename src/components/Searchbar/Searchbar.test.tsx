import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useState } from "react"
import Searchbar from "./Searchbar"

const SearchbarRenderer = () => {
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return <Searchbar value={value} onChange={handleChange} />
}

const renderHelper = () => {
  const utils = render(<SearchbarRenderer />)
  const input = utils.getByLabelText("searchbar")
  return { input, ...utils }
}

describe("testing Searchbar", () => {
  it("should render searchbar properly", () => {
    const { getByLabelText } = renderHelper()

    const inputLabel = getByLabelText("searchbar")
    expect(inputLabel).toBeInTheDocument()
  })

  it("should render value 'hello' if user do so", () => {
    const { input, getByDisplayValue } = renderHelper()

    fireEvent.change(input, { target: { value: "hello" } })
    const inputValue = getByDisplayValue("hello")
    expect(inputValue).toBeTruthy()
  })
})
