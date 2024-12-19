import { gql, useQuery } from "@apollo/client";
import { FC, useState } from "react";
import MyTimeLogList from "../../features/timeLogs/MyTimeLogList";
import {
  Staff,
  TimeLog,
  TimeLogWithStaff,
} from "../../features/timeLogs/TimeLogs.types";

import "./MyTimeLog.css";
import Button from "../../components/Button";
import NewTimeLogForm from "../../features/timeLogs/NewTimeLogForm/NewTimeLogForm";

const STAFF_FRAGMENT = gql`
  fragment StaffFragment on Staff1 {
    id
    name
  }
`;

const TIME_LOG_FIELDS_FRAGMENT = gql`
  fragment TimeLogFields on TimeLog1 {
    day
    hours
    project_name
    subject
    staff_id
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

export const GET_TIMELOGS = gql`
  query GetTimelogs {
    timeLogs {
      ...TimeLogFields
    }
  }
  ${TIME_LOG_FIELDS_FRAGMENT}
`;

const MyTimeLog: FC = () => {
  const [displayForm, setDisplayForm] = useState(false);

  const { data: timeLogsData, loading } = useQuery<{ timeLogs: TimeLog[] }>(
    GET_TIMELOGS
  );
  const { data: staffData } = useQuery<{ staff: Staff[] }>(GET_STAFF);

  const timeLogsWithStaff: TimeLogWithStaff[] = (
    timeLogsData?.timeLogs ?? []
  )?.map((timeLog) => ({
    ...timeLog,
    staffName: staffData?.staff?.find((el) => el.id === timeLog.staff_id)?.name,
  }));

  return (
    <div className="timelog-page">
      <div className="timelog-content">
        {loading && <p>loadsing</p>}
        <MyTimeLogList timelogs={timeLogsWithStaff} />
        <div className="timelog-img">
          <img alt="avatar" src="/image.png" />
          <Button label="Add new entry" onClick={() => setDisplayForm(true)} />
        </div>
      </div>
      {displayForm && <NewTimeLogForm staff={staffData?.staff ?? []} />}
    </div>
  );
};

export default MyTimeLog;
