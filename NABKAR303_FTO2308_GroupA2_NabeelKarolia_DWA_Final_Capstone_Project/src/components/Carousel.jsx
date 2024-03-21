import { useEffect, useState } from "react";
import { fetchShows } from "../data/podcastData.js";

const Carousel = () => {
  const [shows, setShows] = useState([]);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);

  useEffect(() => {
    const fetchingShows = async () => {
      const data = await fetchShows();
      setShows(data);
    };

    fetchingShows();
  }, []);

  const nextShow = () => {
    setCurrentShowIndex((prevIndex) => (prevIndex + 1) % shows.length);
  };

  const prevShow = () => {
    setCurrentShowIndex((prevIndex) => (prevIndex - 1 + shows.length) % shows.length);
  };

  if (shows.length === 0) {
    return <div>Loading...</div>; // Or some other loading state
  }

  return (
    <div className="carousel-container">
      <div className="flex-item item-01">
        <img src={shows[currentShowIndex].image} alt={shows[currentShowIndex].title} className="carousel-img" />
      </div>
      <div className="flex-item item-02">
        <h1>Recommended Shows</h1>
        <br></br>
        <h2>{shows[currentShowIndex].title}</h2>
        <br></br>
        <button onClick={nextShow} className="carousel-button">
          Next
        </button>
        <button className="carousel-button">View Show</button>

        <button onClick={prevShow} className="carousel-button">
          Previous
        </button>
      </div>
    </div>
  );
};

export default Carousel;
