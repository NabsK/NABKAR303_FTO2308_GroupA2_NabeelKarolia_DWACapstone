import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="navbar">
      <button className="home-button">Home</button>
      <SearchBar />
      <button className="login-button">Login</button>
    </div>
  );
}
