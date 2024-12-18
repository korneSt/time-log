import { FC } from "react";
import Header from "../Header";
import { Outlet } from "react-router";

import "./Layout.css";
import Footer from "../Footer";

const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
