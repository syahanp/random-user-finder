import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useState } from "react"
import SelectGender from "./SelectGender"

const SelectGenderRenderer = () => {
  const [value, setValue] = useState("")

  const handleChangeGender = (value: string) => {
    setValue(value)
  }

  return <SelectGender onChange={handleChangeGender} value={value} />
}

describe("testing SelectGender", () => {
  it("should render <SelectGender /> properly and default 'All' gender selected", () => {
    const { getByLabelText } = render(<SelectGenderRenderer />)

    const selectComponent = getByLabelText("select-gender")
    expect(selectComponent).toBeInTheDocument()

    expect(screen.getByText(/All/i)).toBeTruthy()
  })

  it("should select 'Male' and 'Female' gender", () => {
    const { getByLabelText } = render(<SelectGenderRenderer />)

    const selectComponent = getByLabelText("select-gender")

    fireEvent.change(selectComponent, { target: { value: "male" } })
    expect(screen.getByText("Male")).toBeTruthy()

    fireEvent.change(selectComponent, { target: { value: "female" } })
    expect(screen.getByText("Female")).toBeTruthy()
  })
})
