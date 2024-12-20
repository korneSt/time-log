import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import { Staff, TimeLog } from "../TimeLogs.types";
import { GET_STAFF, GET_TIMELOGS } from "../../../pages/MyTimeLog/MyTimeLog";
import NewTimeLogForm from "./NewTimeLogForm";

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

describe("NewTimeLogForm Component", () => {
  it("renders form", async () => {
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
        <NewTimeLogForm staff={mockStaff} />
      </MockedProvider>
    );

    // Ensure the "Add new entry" button is present

    const form = await screen.findByTestId("new-entry-form");
    expect(form).toBeInTheDocument();

    // expect(screen.getByText(/new entry/i)).toBeInTheDocument(); // Adjust based on the actual form text
  });
});
