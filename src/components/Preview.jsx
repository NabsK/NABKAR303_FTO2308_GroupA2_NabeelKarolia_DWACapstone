import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchPreviewData } from "../data/podcastData.js";
import { useNavigate } from "react-router-dom";

const Preview = ({ selectedGenre, shows, ignoreGenreFilter }) => {
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
  const [localShows, setLocalShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreviewData();
      setLocalShows(data);
    };

    if (!shows || shows.length === 0) {
      fetchData();
    } else {
      setLocalShows(shows);
    }
  }, [shows, selectedGenre]); // add selectedGenre as a dependency

  if (localShows.length === 0) {
    return <div>Loading...</div>;
  }

  const formatUpdatedDate = (dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleString("default", { month: "short" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // If ignoreGenreFilter prop is true, display all shows. Otherwise, filter by genre.
  const filteredShows = ignoreGenreFilter ? localShows : selectedGenre === null ? localShows : localShows.filter((show) => show.genres.includes(selectedGenre));

  return (
    <div className="preview-container">
      {filteredShows.map((show, index) => (
        <div className="preview-card" key={index}>
          <img className="preview-image" src={show.image} alt={show.title} />
          <div className="preview-content">
            <h2>{show.title}</h2>
            <p>Seasons: {show.seasons}</p>
            <p>Genres: {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}</p>
            <p>Last Updated: {formatUpdatedDate(show.updated)}</p>
            <button className="preview-button" onClick={() => navigate(`/show/${show.id}`)}>
              Visit Show
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

Preview.propTypes = {
  selectedGenre: PropTypes.number,
  shows: PropTypes.array,
  ignoreGenreFilter: PropTypes.bool,
};

export default Preview;
