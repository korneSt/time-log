import { FC } from "react";
import { TimeLogWithStaff } from "../TimeLogs.types";

import "./MyTimeLogList.css";

interface MyTimeLogList {
  timelogs: TimeLogWithStaff[];
}

interface MyTimeLogListItem {
  timelogItem: TimeLogWithStaff;
}
const MyTimeLogList: FC<MyTimeLogList> = ({ timelogs }) => {
  return (
    <div>
      <p style={{ fontWeight: 700, fontSize: 64 }}>My Time Log</p>
      <ul className="timelog-list">
        {timelogs.map((el) => {
          return <MyTimeLogListItem timelogItem={el} />;
        })}
      </ul>
    </div>
  );
};

const MyTimeLogListItem: FC<MyTimeLogListItem> = ({ timelogItem }) => {
  return (
    <li key={timelogItem.id} className="timelog-list-item">
      <p>{timelogItem.day}</p>
      <p>{timelogItem.staff_id}</p>
      <p>{timelogItem.staffName ?? ""}</p>
      <p>{timelogItem.project_name}</p>
    </li>
  );
};

export default MyTimeLogList;
