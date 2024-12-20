import { FC } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import { Staff } from "../TimeLogs.types";
import { gql, useMutation } from "@apollo/client";

import "./NewTimeLogForm.css";
import { GET_TIMELOGS } from "../api";

interface NewTimeLogForm {
  staff: Staff[];
}

const TIME_LOG_FIELDS_FRAGMENT = gql`
  fragment TimeLogFields on TimeLog2 {
    day
    hours
    project_name
    subject
    staff_id
  }
`;

const SAVE_ENTRY_MUTATION = gql`
  mutation SaveEntry(
    $day: String!
    $hours: Float!
    $project_name: String!
    $subject: String
    $staff_id: Int!
  ) {
    createTimeLog(
      day: $day
      hours: $hours
      project_name: $project_name
      subject: $subject
      staff_id: $staff_id
    ) {
      ...TimeLogFields
    }
  }
  ${TIME_LOG_FIELDS_FRAGMENT}
`;

const NewTimeLogForm: FC<NewTimeLogForm> = ({ staff = [] }) => {
  const [saveEntry, { loading, error }] = useMutation(SAVE_ENTRY_MUTATION, {
    onCompleted: (data) => {
      console.log("Entry saved:", data);
    },
    onError: (err) => {
      console.error("Error saving entry:", err);
    },
    refetchQueries: [{ query: GET_TIMELOGS }],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const selectedStaffId =
      staff.find((el) => el.name === data.person)?.id ?? "";

    const variables = {
      day: data.date,
      staff_id: selectedStaffId,
      hours: parseFloat(data.hours as string),
      project_name: data.project,
      subject: data.description,
    };

    saveEntry({ variables });
  };

  return (
    <div className="form-container">
      <h1>New Entry</h1>
      <form onSubmit={handleSubmit} data-testid="new-entry-form">
        <div className="form-row">
          <Input
            label="Date"
            type="date"
            name="date"
            placeholder="01.01.2024"
          />
          <Select
            label="Who"
            name="person"
            options={staff.map((el) => el.name)}
          />
        </div>
        <div className="form-row">
          <Input label="Hours" type="number" name="hours" placeholder="1" />
          <Input
            label="Project"
            type="text"
            name="project"
            placeholder="Project name"
          />
        </div>
        <div className="form-row full-width">
          <TextArea
            label="Description"
            name="description"
            placeholder="What's going on?"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default NewTimeLogForm;
