import { Link, useNavigate } from "react-router";
import Button from "../Button";
import "./Header.css";
import routes from "../../features/routes/Routes.consts";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <p>Time Log</p>
      <nav>
        <Link to={routes.myTimeLog}>My Time Log</Link>
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
