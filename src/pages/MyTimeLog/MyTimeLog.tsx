import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import MyTimeLogList from "../../features/timeLogs/MyTimeLogList";
import {
  Staff,
  TimeLog,
  TimeLogWithStaff,
} from "../../features/timeLogs/TimeLogs.types";

const STAFF_FRAGMENT = gql`
  fragment StaffFragment on Staff1 {
    id
    name
  }
`;

const GET_STAFF = gql`
  query GetStaff {
    staff {
      ...StaffFragment
    }
  }
  ${STAFF_FRAGMENT}
`;

const GET_TIMELOGS = gql`
  query GetTimelogs {
    timeLogs {
      id
      day
      project_name
      staff_id
    }
  }
`;

const GET_STAFF_BY_IDS = gql`
  query GetStaffByIds($id: ID!) {
    staff(id: $id) {
      id
      name
    }
  }
`;

const MyTimeLog: FC = () => {
  const {
    loading,
    error,
    data: timeLogsData,
  } = useQuery<{ timeLogs: TimeLog[] }>(GET_TIMELOGS);
  const {
    loading: staffLoading,
    error: staffError,
    data: staffData,
  } = useQuery<{ staff: Staff[] }>(GET_STAFF);

  console.log(timeLogsData);
  const timeLogsWithStaff: TimeLogWithStaff[] = (
    timeLogsData?.timeLogs ?? []
  )?.map((timeLog) => ({
    ...timeLog,
    staffName: staffData?.staff?.find((el) => el.id === timeLog.staff_id)?.name,
  }));

  return (
    <>
      <MyTimeLogList timelogs={timeLogsWithStaff} />
    </>
  );

  // return <> {JSON.stringify(data)}</>;
};

export default MyTimeLog;
