import { FC } from "react";
import Header from "../Header";
import { Outlet, useLocation } from "react-router";

const Layout: FC = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
