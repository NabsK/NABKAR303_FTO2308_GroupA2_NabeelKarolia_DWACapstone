import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="grid-container" id="navBar">
      <a href="#homeButton" className="grid-item">
        <img src="./images/logo1.jpeg" alt="Descriptive Text" id="logo" />
      </a>
      <SearchBar />
      <div className="dropdown">
        <button className="dropButton">Account</button>
        <div className="dropdown-content">
          <a href="#">Sign In</a>
          <a href="#">Favorites</a>
        </div>
      </div>
    </nav>
  );
}
