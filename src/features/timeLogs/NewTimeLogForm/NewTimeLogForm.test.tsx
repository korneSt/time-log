import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect } from "vitest";
import { Staff } from "../TimeLogs.types";
import NewTimeLogForm from "./NewTimeLogForm";

const mockStaff: Staff[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

describe("NewTimeLogForm Component", () => {
  it("renders form", async () => {
    render(
      <MockedProvider>
        <NewTimeLogForm staff={mockStaff} />
      </MockedProvider>
    );

    const form = await screen.findByTestId("new-entry-form");
    expect(form).toBeInTheDocument();
  });
});
