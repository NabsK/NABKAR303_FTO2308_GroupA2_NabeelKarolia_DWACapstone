import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { supabase } from "../supabaseInit.js";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    else navigate("/");
  }

  return (
    <nav className="navbar-container">
      <button className="homeButton" onClick={() => navigate("/")}>
        <img src="./images/logo1.jpeg" alt="Descriptive Text" id="logo" />
      </button>
      <SearchBar />
      <div className="AccountDropdown">
        <button className="dropButton">Account</button>
        <div className="dropdown-content">
          {user ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={() => navigate("/login")}>Sign In</button>}
          <button onClick={() => navigate("/favorites")}>Favorites</button>
        </div>
      </div>
    </nav>
  );
}
