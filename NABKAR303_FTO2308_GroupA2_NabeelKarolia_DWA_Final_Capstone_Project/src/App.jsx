import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <HomePage />
    </Router>
  );
}

export default App;
