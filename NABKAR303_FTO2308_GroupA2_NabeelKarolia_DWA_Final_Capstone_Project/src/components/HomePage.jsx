import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Genres from "./Genres";
import Preview from "./Preview";
import Carousel from "./Carousel";
import Show from "./Show";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/show/:id" element={<Show />} />
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Genres onSelectGenre={setSelectedGenre} />
              <Preview selectedGenre={selectedGenre} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default HomePage;
