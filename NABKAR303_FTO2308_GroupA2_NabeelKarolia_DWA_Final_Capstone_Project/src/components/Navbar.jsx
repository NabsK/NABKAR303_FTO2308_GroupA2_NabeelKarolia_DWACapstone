import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar-container">
      <button className="homeButton" onClick={() => navigate("/")}>
        <img src="./images/logo1.jpeg" alt="Descriptive Text" id="logo" />
      </button>
      <SearchBar />
      <div className="AccountDropdown">
        <button className="dropButton">Account</button>
        <div className="dropdown-content">
          <button href="#">Sign In</button>
          <button href="#">Favorites</button>
        </div>
      </div>
    </nav>
  );
}
