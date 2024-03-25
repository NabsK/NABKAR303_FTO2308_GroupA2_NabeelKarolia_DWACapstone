import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPreviewData } from "../data/podcastData.js";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreviewData();
      setShows(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const matchingShows = shows.filter((show) => show.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (matchingShows.length === 0) {
      alert("Show not found");
    } else {
      navigate("/search-results", { state: { shows: matchingShows } });
    }
  };

  return (
    <div id="search">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search.." name="search" className="form" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type="submit" className="SButton">
          <img src="./images/search.png" alt="Descriptive Text" className="searchButton" />
        </button>
      </form>
    </div>
  );
}
