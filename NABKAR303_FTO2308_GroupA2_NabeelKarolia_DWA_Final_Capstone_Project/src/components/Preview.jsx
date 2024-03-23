import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchPreviewData } from "../data/podcastData.js";

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

  // If selectedGenre is null, display all shows. Otherwise, filter by genre.
  const filteredShows = selectedGenre === null ? shows : shows.filter((show) => show.genres.includes(selectedGenre));

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

export default Preview;
