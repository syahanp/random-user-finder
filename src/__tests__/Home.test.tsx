import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { rest } from "msw"
import { setupServer } from "msw/node"
import Home from "pages"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { act } from "react-dom/test-utils"

/**
 * Setup mock server to test API call
 */
const server = setupServer(
  rest.get("https://randomuser.me/api/", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("keyword")
    const gender = req.url.searchParams.get("gender")
    const page = Number(req.url.searchParams.get("page"))

    if (keyword) {
      return res(
        ctx.json({
          results: [
            {
              gender: "female",
              name: {
                first: "Bob",
                last: "Sadino",
              },
              email: "bob@example.com",
              login: {
                username: "bigmeercat845",
              },
              registered: {
                date: "2004-06-01T15:59:01.453Z",
              },
            },
          ],
        })
      )
    }

    if (gender === "male") {
      return res(
        ctx.json({
          results: [
            {
              gender: "male",
              name: {
                first: "John",
                last: "Doe",
              },
              email: "john@example.com",
              login: {
                username: "bigmeercat845",
              },
              registered: {
                date: "2004-06-01T15:59:01.453Z",
              },
            },
          ],
        })
      )
    }

    if (page === 2) {
      return res(
        ctx.json({
          results: [
            {
              gender: "male",
              name: {
                first: "Becker",
                last: "Hill",
              },
              email: "john@example.com",
              login: {
                username: "bigmeercat845",
              },
              registered: {
                date: "2004-06-01T15:59:01.453Z",
              },
            },
          ],
        })
      )
    }

    return res(
      ctx.json({
        results: [
          {
            gender: "female",
            name: {
              first: "Jane",
              last: "Peterson",
            },
            email: "jane@example.com",
            login: {
              username: "bigmeercat845",
            },
            registered: {
              date: "invalid",
            },
          },
        ],
      })
    )
  })
)

beforeAll(() => server.listen())
beforeEach(() => jest.useFakeTimers())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const HomeRenderer = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000 * 60, // 5 minutes
        refetchOnWindowFocus: false, // dont auto refetch when window focus
        retry: false, // dont auto refresh when fetching failed
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

describe("testing Home Page", () => {
  it("should render properly", async () => {
    render(<HomeRenderer />)

    await waitFor(() => screen.getByText("Jane Peterson"))

    expect(screen.getByText("Jane Peterson")).toBeInTheDocument()
  })

  it("should response user 'Bob Sadino' when user search with 'bob'", async () => {
    const { getByLabelText } = render(<HomeRenderer />)

    const searchbar = getByLabelText("searchbar")

    act(() => {
      fireEvent.change(searchbar, { target: { value: "bob" } })
      jest.runAllTimers()
    })

    await waitFor(() => screen.getByText("Bob Sadino"))
    expect(screen.getByText("Bob Sadino")).toBeInTheDocument()
  })

  it("should response user with male gender filter", async () => {
    const { getByLabelText } = render(<HomeRenderer />)

    const genderSelect = getByLabelText("select-gender")

    act(() => {
      fireEvent.change(genderSelect, { target: { value: "male" } })
      jest.runAllTimers()
    })

    await waitFor(() => screen.getByText("John Doe"))
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("should reset the filter", async () => {
    const { getByLabelText } = render(<HomeRenderer />)

    const searchbar = getByLabelText("searchbar")
    const genderSelect = getByLabelText("select-gender")
    const resetFilter = getByLabelText("reset-filter")

    // search for bob, filter gender to male, then reset the filter
    act(() => {
      fireEvent.change(searchbar, { target: { value: "bob" } })
      fireEvent.change(genderSelect, { target: { value: "male" } })
      fireEvent.click(resetFilter)

      jest.runAllTimers()
    })

    // see if we can get back a users data with no filter at all
    await waitFor(() => screen.getByText("Jane Peterson"))
    expect(screen.getByText("Jane Peterson")).toBeInTheDocument()
  })

  it("should go to page 2", async () => {
    const { getByText } = render(<HomeRenderer />)

    const page2 = getByText("2")

    act(() => {
      fireEvent.click(page2)
      jest.runAllTimers()
    })

    await waitFor(() => screen.getByText("Becker Hill"))
    expect(screen.getByText("Becker Hill")).toBeInTheDocument()
  })
})
