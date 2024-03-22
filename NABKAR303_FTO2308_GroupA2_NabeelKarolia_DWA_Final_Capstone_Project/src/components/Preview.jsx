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

  return (
    <div>
      {shows.map((show, index) => (
        <div key={index}>
          <h2>{show.title}</h2>
          <img src={show.image} alt={show.title} />
          <p>ID: {show.id}</p>
          <p>Description: {show.description}</p>
          <p>Seasons: {show.seasons}</p>
          <p>Genres: {show.genres.join(", ")}</p>
          <p>Last Updated: {show.updated}</p>
        </div>
      ))}
    </div>
  );
};

export default Preview;
