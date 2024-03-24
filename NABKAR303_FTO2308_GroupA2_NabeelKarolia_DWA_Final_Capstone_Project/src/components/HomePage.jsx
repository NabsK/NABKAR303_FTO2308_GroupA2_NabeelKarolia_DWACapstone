import { useState } from "react";
import Genres from "./Genres";
import Preview from "./Preview";
import Carousel from "./Carousel";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div>
      <Carousel />
      <Genres onSelectGenre={setSelectedGenre} />
      <Preview selectedGenre={selectedGenre} />
    </div>
  );
};

export default HomePage;
