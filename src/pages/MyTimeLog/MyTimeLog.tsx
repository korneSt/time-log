import { gql, useQuery } from "@apollo/client";
import { FC } from "react";

const GET_STAFF = gql`
  query GetStaff {
    staff {
      id
      name
    }
  }
`;

const MyTimeLog: FC = () => {
  const { loading, error, data } = useQuery(GET_STAFF);

  return <>a {JSON.stringify(data, null, 2)}</>;
};

export default MyTimeLog;
