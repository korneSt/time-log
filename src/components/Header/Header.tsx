import { Link, useLocation, useNavigate } from "react-router";
import Button from "../Button";
import "./Header.css";
import routes from "../../features/routes/Routes.consts";

const isActive = (pathname: string, url: string) => pathname.startsWith(url);

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="header">
      <p>Time Log</p>
      <nav>
        <Link
          to={routes.myTimeLog}
          style={
            isActive(pathname, routes.myTimeLog)
              ? { filter: "blur(1px)" }
              : undefined
          }
        >
          My Time Log
        </Link>
        <Link to="#">Employees</Link>
        <Link to="#">Projects</Link>
        <Button
          onClick={() => navigate(routes.homePage)}
          label="Home Page"
          variant="primary"
        />
      </nav>
    </div>
  );
};

export default Header;
