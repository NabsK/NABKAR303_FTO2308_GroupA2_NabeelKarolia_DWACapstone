import { useEffect, useState } from "react";
import { fetchShows } from "../data/podcastData.js";

const Carousel = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchingShows = async () => {
      const data = await fetchShows();
      setShows(data);
    };

    fetchingShows();
  }, []);

  return (
    <div>
      {shows.map((show, index) => (
        <div key={index}>
          <img src={show.image} alt={show.title} id="para1" />
          <p>{show.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
