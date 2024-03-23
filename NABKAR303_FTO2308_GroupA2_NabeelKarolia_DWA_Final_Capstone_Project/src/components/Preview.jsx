import { useEffect, useState } from "react";
import { fetchPreviewData } from "../data/podcastData.js";

const Preview = () => {
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

  // Function to convert ISO date string to human-readable date
  const formatUpdatedDate = (dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleString("default", { month: "short" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="preview-container">
      {shows.map((show, index) => (
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

export default Preview;
