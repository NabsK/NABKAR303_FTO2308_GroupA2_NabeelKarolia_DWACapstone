import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Genres from "./Genres";
import Preview from "./Preview";
import Carousel from "./Carousel";
import Show from "./Show";
import SearchResults from "./SearchResults";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortedShows, setSortedShows] = useState([]);

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
              <Genres onSelectGenre={setSelectedGenre} onSortShows={setSortedShows} />
              <Preview selectedGenre={selectedGenre} shows={sortedShows} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default HomePage;
