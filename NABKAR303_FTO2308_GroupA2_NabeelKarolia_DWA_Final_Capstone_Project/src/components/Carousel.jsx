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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShowIndex((prevIndex) => (prevIndex + 1) % shows.length);
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(timer); // Clean up on component unmount
  }, [shows]);

  if (shows.length === 0) {
    return <div>Loading...</div>; // Or some other loading state
  }

  return (
    <div>
      <img src={shows[currentShowIndex].image} alt={shows[currentShowIndex].title} id="para1" />
      <p>{shows[currentShowIndex].title}</p>
    </div>
  );
};

export default Carousel;
