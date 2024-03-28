import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Genres from "./Genres";
import Preview from "./Preview";
import Carousel from "./Carousel";
import Show from "./Show";
import SearchResults from "./SearchResults";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [shows, setShows] = useState([]); // rename sortedShows to shows

  return (
    <div>
      <Routes>
        <Route path="/show/:id" element={<Show />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Genres onSelectGenre={setSelectedGenre} setShows={setShows} />
              <Preview selectedGenre={selectedGenre} shows={shows} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default HomePage;
