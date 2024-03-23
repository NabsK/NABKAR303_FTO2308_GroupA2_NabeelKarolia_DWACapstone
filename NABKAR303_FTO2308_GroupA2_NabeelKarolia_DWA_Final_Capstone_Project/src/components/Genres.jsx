import { useEffect, useState } from "react";
import { fetchPreviewData } from "../data/podcastData.js";

const Genres = () => {
  const [shows, setShows] = useState([]);

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
      setShows(data);
    };

    fetchData();
  }, []);

  if (shows.length === 0) {
    return <div>Loading...</div>;
  }

  // Get all unique genres from the shows
  const genres = [...new Set(shows.flatMap((show) => show.genres))];

  return (
    <div className="container">
      {genres.map((genre, index) => (
        <button className="button" key={index}>
          {genreMapping[genre]}
        </button>
      ))}
    </div>
  );
};

export default Genres;
