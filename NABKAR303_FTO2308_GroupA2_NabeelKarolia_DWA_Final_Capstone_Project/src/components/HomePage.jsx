import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Genres from "./Genres";
import Preview from "./Preview";
import Carousel from "./Carousel";
import Show from "./Show";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/show/:id" element={<Show />} />
          <Route path="/" element={<Carousel />} />
        </Routes>
      </Router>
      <Genres onSelectGenre={setSelectedGenre} />
      <Preview selectedGenre={selectedGenre} />
    </div>
  );
};

export default HomePage;
