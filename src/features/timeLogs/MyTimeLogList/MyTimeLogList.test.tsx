import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect } from "vitest";
import { Staff, TimeLog } from "../TimeLogs.types";
import MyTimeLogList from "./MyTimeLogList";
import { GET_STAFF, GET_TIMELOGS } from "../api";

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
  it("renders time logs with staff names", async () => {
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
        <MyTimeLogList timelogs={mockTimeLogs} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Project Alpha/i)).toBeInTheDocument();
      expect(screen.getByText(/Project Beta/i)).toBeInTheDocument();
    });
  });
});
