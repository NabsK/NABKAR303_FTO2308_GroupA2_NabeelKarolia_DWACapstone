import { useEffect, useState } from "react";
import { fetchPreviewData } from "../data/podcastData.js";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [shows, setShows] = useState([]);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingShows = async () => {
      const data = await fetchPreviewData();
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

  const viewShow = () => {
    navigate(`/show/${shows[currentShowIndex].id}`);
  };

  if (shows.length === 0) {
    return <div>Loading...</div>;
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
        <button onClick={prevShow} className="carousel-button">
          Previous
        </button>

        <button onClick={viewShow} className="carousel-button">
          View Show
        </button>

        <button onClick={nextShow} className="carousel-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
