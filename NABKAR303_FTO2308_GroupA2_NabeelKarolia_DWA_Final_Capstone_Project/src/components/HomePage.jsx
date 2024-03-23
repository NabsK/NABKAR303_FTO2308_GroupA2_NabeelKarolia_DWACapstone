import { useState } from "react";
import Genres from "./Genres";
import Preview from "./Preview";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div>
      <Genres onSelectGenre={setSelectedGenre} />
      <Preview selectedGenre={selectedGenre} />
    </div>
  );
};

export default HomePage;
