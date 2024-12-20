import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import { Staff, TimeLog } from "../../features/timeLogs/TimeLogs.types";
import MyTimeLog, { GET_STAFF, GET_TIMELOGS } from "./MyTimeLog";

const mockTimeLogs: TimeLog[] = [
  {
    id: 1,
    day: "2024-12-20",
    hours: 8,
    project_name: "Project Alpha",
    subject: "Development",
    staff_id: 1,
  },
  {
    id: 2,
    day: "2024-12-21",
    hours: 6,
    project_name: "Project Beta",
    subject: "Testing",
    staff_id: 2,
  },
];

const mockStaff: Staff[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

describe("MyTimeLog Component", () => {
  it("renders button to add a new entry", async () => {
    const mocks = [
      {
        request: { query: GET_TIMELOGS },
        result: { data: { timeLogs: mockTimeLogs } },
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

    // Ensure the "Add new entry" button is present
    const addButton = screen.getByRole("button", { name: /add new entry/i });
    expect(addButton).toBeInTheDocument();

    // expect(screen.getByText(/new entry/i)).toBeInTheDocument(); // Adjust based on the actual form text
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

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText(/Project Alpha/i)).not.toBeInTheDocument();
    });

    // Ensure the "Add new entry" button is present
    const addButton = screen.getByRole("button", { name: /add new entry/i });
    expect(addButton).toBeInTheDocument();
  });
});
