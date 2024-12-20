import { gql } from "@apollo/client";

export const TIME_LOG_FIELDS_FRAGMENT = gql`
  fragment TimeLogFields on TimeLog1 {
    day
    hours
    project_name
    subject
    staff_id
  }
`;

export const GET_TIMELOGS = gql`
  query GetTimelogs {
    timeLogs {
      ...TimeLogFields
    }
  }
  ${TIME_LOG_FIELDS_FRAGMENT}
`;

export const STAFF_FRAGMENT = gql`
  fragment StaffFragment on Staff1 {
    id
    name
  }
`;

export const GET_STAFF = gql`
  query GetStaff {
    staff {
      ...StaffFragment
    }
  }
  ${STAFF_FRAGMENT}
`;
