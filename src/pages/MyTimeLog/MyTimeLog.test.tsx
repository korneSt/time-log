import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect } from "vitest";
import { Staff } from "../../features/timeLogs/TimeLogs.types";
import { GET_STAFF, GET_TIMELOGS } from "../../features/timeLogs/api";
import MyTimeLog from "./MyTimeLog";

const mockStaff: Staff[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

describe("MyTimeLog Component", () => {
  it("renders button to add a new entry", async () => {
    render(
      <MockedProvider>
        <MyTimeLog />
      </MockedProvider>
    );

    const addButton = screen.getByRole("button", { name: /add new entry/i });
    expect(addButton).toBeInTheDocument();
  });

  it("handles empty time logs gracefully", async () => {
    const mocks = [
      {
        request: { query: GET_TIMELOGS },
        result: { data: { timeLogs: [] } },
      },
      {
        request: { query: GET_STAFF },
        result: { data: { staff: mockStaff } },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyTimeLog />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Project Alpha/i)).not.toBeInTheDocument();
    });

    const addButton = screen.getByRole("button", { name: /add new entry/i });
    expect(addButton).toBeInTheDocument();
  });
});
