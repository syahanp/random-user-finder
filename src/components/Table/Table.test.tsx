import { useCallback, useState } from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Table from "./Table"
import { SortColumn } from "./type"

const data = [
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Silke",
      last: "Poulsen",
    },
    location: {
      street: {
        number: 6677,
        name: "Møllebakken",
      },
      city: "Randers Nø",
      state: "Nordjylland",
      country: "Denmark",
      postcode: 44529,
      coordinates: {
        latitude: "-38.6436",
        longitude: "31.6108",
      },
      timezone: {
        offset: "+5:00",
        description: "Ekaterinburg, Islamabad, Karachi, Tashkent",
      },
    },
    email: "silke.poulsen@example.com",
    login: {
      uuid: "ed1aa8a8-676e-4348-89f1-9d51291cf6cf",
      username: "bigmeercat845",
      password: "wifes",
      salt: "Bz6nsItL",
      md5: "13be3246a04e630f00b209defb5917f8",
      sha1: "c6bc7ea8e85aa77ab0bf6916661ca43d835bb6b0",
      sha256:
        "9a566a1bf2f03e231e26c0cdc22c962fbfdb8c478399476e10fb892f908b9c71",
    },
    dob: {
      date: "1965-01-14T06:45:11.454Z",
      age: 57,
    },
    registered: {
      date: "2004-06-01T15:59:01.453Z",
      age: 18,
    },
    phone: "60793791",
    cell: "85655888",
    id: {
      name: "CPR",
      value: "140165-9829",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/16.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/16.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/16.jpg",
    },
    nat: "DK",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "کوروش",
      last: "احمدی",
    },
    location: {
      street: {
        number: 4077,
        name: "جمال الدین اسدآبادی",
      },
      city: "بروجرد",
      state: "گلستان",
      country: "Iran",
      postcode: 14529,
      coordinates: {
        latitude: "-66.9701",
        longitude: "124.2394",
      },
      timezone: {
        offset: "+3:00",
        description: "Baghdad, Riyadh, Moscow, St. Petersburg",
      },
    },
    email: "khwrwsh.hmdy@example.com",
    login: {
      uuid: "8999dedf-d4f9-43f0-8633-e04d7cfc7776",
      username: "happyduck800",
      password: "install",
      salt: "rZBX7VCE",
      md5: "2ab6e4ee546f85cad2bea5b32c44e37a",
      sha1: "7a29a598b5dfdd1b9733066f08b6f272892c086c",
      sha256:
        "6b3903a2373e65f586e2a82c91eb80f0f6a6046467eeeae396186484dda976c1",
    },
    dob: {
      date: "1981-12-17T07:45:08.260Z",
      age: 40,
    },
    registered: {
      date: "2015-09-08T18:51:52.805Z",
      age: 6,
    },
    phone: "083-94840196",
    cell: "0909-575-3573",
    id: {
      name: "",
      value: null,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/32.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/32.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
    },
    nat: "IR",
  },
]

const TableRenderer = () => {
  const [sort, setSort] = useState<SortColumn>({
    by: "",
    order: "",
  })

  const handleSort = useCallback((sortData: SortColumn) => {
    setSort({ by: sortData.by, order: sortData.order })
  }, [])

  const resetFilter = () => {
    setSort({ by: "", order: "" })
  }

  return (
    <>
      <button onClick={resetFilter}>reset</button>
      <Table
        data={data}
        sortBy={sort.by}
        sortOrder={sort.order}
        onSort={handleSort}
      />
    </>
  )
}

describe("testing Table", () => {
  it("should render table properly", () => {
    const { getByText } = render(<TableRenderer />)

    expect(getByText("Username")).toBeTruthy()
  })

  it("should sort ascend by clik the column header", () => {
    const { getByText, getByTestId } = render(<TableRenderer />)

    const emailColumn = getByText("Email")
    fireEvent.click(emailColumn)

    const emailSort = getByTestId("email-asc-sort")
    expect(emailSort).toHaveClass("text-blue-400")
  })

  it("should NOT render sort component in username column", () => {
    const { queryByTestId } = render(<TableRenderer />)

    const usernameSort = queryByTestId("username-asc-sort")
    expect(usernameSort).not.toBeInTheDocument()
  })

  it("should sort descend by clik the column header once", () => {
    const { getByText, getByTestId } = render(<TableRenderer />)

    const emailColumn = getByText("Email")
    fireEvent.click(emailColumn)

    const emailSort = getByTestId("email-asc-sort")
    expect(emailSort).toHaveClass("text-blue-400")
  })

  it("should sort descend by clik the column header twice", () => {
    const { getByText, getByTestId } = render(<TableRenderer />)

    const emailColumn = getByText("Email")
    fireEvent.click(emailColumn)
    fireEvent.click(emailColumn)

    const emailSort = getByTestId("email-desc-sort")
    expect(emailSort).toHaveClass("text-blue-400")
  })

  it("should back to normal sort by clik the column header 3x", () => {
    const { getByText, getByTestId } = render(<TableRenderer />)

    const emailColumn = getByText("Email")
    fireEvent.click(emailColumn)
    fireEvent.click(emailColumn)
    fireEvent.click(emailColumn)

    const emailSort = getByTestId("email-asc-sort")
    expect(emailSort).toHaveClass("text-gray-400")
  })

  it("should NOT fire sort event when column is not sortable", () => {
    const { getByText, queryByText } = render(<TableRenderer />)

    const emailColumn = getByText("Username")
    fireEvent.click(emailColumn)

    const usernameSort = queryByText("username-asc-sort")
    expect(usernameSort).not.toBeInTheDocument()
  })
})
