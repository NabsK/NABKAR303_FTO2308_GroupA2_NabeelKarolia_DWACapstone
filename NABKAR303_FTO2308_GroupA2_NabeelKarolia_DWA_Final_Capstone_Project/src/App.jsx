import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Favorites from "./components/Favorites";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.stringify(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {user && <Route path="/favorites" element={<Favorites />} />}
      </Routes>
    </Router>
  );
}

export default App;
