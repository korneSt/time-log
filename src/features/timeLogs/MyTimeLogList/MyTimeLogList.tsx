import { FC } from "react";
import { TimeLogWithStaff } from "../TimeLogs.types";

interface MyTimeLogList {
  timelogs: TimeLogWithStaff[];
}

interface MyTimeLogListItem {
  timelogItem: TimeLogWithStaff;
}

const MyTimeLogListItem: FC<MyTimeLogListItem> = ({ timelogItem }) => {
  return (
    <li key={timelogItem.id}>
      {timelogItem.day} {timelogItem.staff_id} {timelogItem.staffName ?? ""}{" "}
      {timelogItem.project_name}
    </li>
  );
};

const MyTimeLogList: FC<MyTimeLogList> = ({ timelogs }) => {
  return (
    <div>
      <ul>
        {timelogs.map((el) => {
          return <MyTimeLogListItem timelogItem={el} />;
        })}
      </ul>
    </div>
  );
};

export default MyTimeLogList;
