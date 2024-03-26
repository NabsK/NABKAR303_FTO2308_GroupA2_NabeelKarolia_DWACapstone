import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchPreviewData } from "../data/podcastData.js";

const Genres = ({ onSelectGenre, setShows }) => {
  const [localShows, setLocalShows] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreviewData();
      setLocalShows(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setShows(localShows); // update the shows in the HomePage component whenever localShows changes
  }, [localShows, setShows]);

  const sortShows = (order, field = "title") => {
    const sortedShows = [...localShows].sort((a, b) => {
      const aValue = field === "updated" ? new Date(a[field]) : a[field].toUpperCase();
      const bValue = field === "updated" ? new Date(b[field]) : b[field].toUpperCase();
      if (order === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    setLocalShows(sortedShows);
  };

  return (
    <div className="Home-container">
      {Object.entries(genreMapping).map(([genre, title]) => (
        <button className="button" key={genre} onClick={() => onSelectGenre(Number(genre))}>
          {title}
        </button>
      ))}
      <br></br>
      <div className="sort-container">
        <button className="sort-button" onClick={() => onSelectGenre(null)}>
          View All Shows
        </button>
        <button className="sort-button" onClick={() => sortShows("asc")}>
          Sort A-Z
        </button>
        <button className="sort-button" onClick={() => sortShows("desc")}>
          Sort Z-A
        </button>
        <button className="sort-button" onClick={() => sortShows("asc", "updated")}>
          Sort by Date Updated (Oldest First)
        </button>
        <button className="sort-button" onClick={() => sortShows("desc", "updated")}>
          Sort by Date Updated (Newest First)
        </button>
      </div>
    </div>
  );
};

Genres.propTypes = {
  onSelectGenre: PropTypes.func.isRequired,
  setShows: PropTypes.func.isRequired,
};

export default Genres;
