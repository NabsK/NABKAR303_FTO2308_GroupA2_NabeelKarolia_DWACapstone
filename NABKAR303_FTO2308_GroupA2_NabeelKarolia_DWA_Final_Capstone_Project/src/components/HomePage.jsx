import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchPreviewData } from "../data/podcastData.js";

const Genres = ({ onSelectGenre }) => {
  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  return (
    <div className="container">
      {Object.entries(genreMapping).map(([genre, title]) => (
        <button className="button" key={genre} onClick={() => onSelectGenre(Number(genre))}>
          {title}
        </button>
      ))}
    </div>
  );
};

Genres.propTypes = {
  onSelectGenre: PropTypes.func.isRequired,
};

const Preview = ({ selectedGenre }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreviewData();
      setShows(data);
    };

    fetchData();
  }, []);

  if (shows.length === 0) {
    return <div>Loading...</div>;
  }

  const formatUpdatedDate = (dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleString("default", { month: "short" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const filteredShows = shows.filter((show) => show.genres.includes(selectedGenre));

  return (
    <div className="preview-container">
      {filteredShows.map((show, index) => (
        <div className="preview-card" key={index}>
          <img className="preview-image" src={show.image} alt={show.title} />
          <div className="preview-content">
            <h2>{show.title}</h2>
            <p>Seasons: {show.seasons}</p>
            <p>Genres: {show.genres.join(", ")}</p>
            <p>Last Updated: {formatUpdatedDate(show.updated)}</p>
            <button className="preview-button">Visit Show</button>
          </div>
        </div>
      ))}
    </div>
  );
};

Preview.propTypes = {
  selectedGenre: PropTypes.number,
};

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
