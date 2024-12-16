import Button from "../Button";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <p>Time Log</p>
      <nav>
        <p>My Time Log</p>
        <p>Employees</p>
        <p>Projects</p>
        <Button label="Home Page" variant="primary" />
      </nav>
    </div>
  );
};

export default Header;
