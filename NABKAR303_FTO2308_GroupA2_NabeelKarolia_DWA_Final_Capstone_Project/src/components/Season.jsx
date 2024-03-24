import { useEffect, useState } from "react";
import Episode from "./Episode";
import PropTypes from "prop-types";

const Season = ({ id }) => {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const data = await response.json();
        setSeasons(data.seasons);
        setSelectedSeason(data.seasons.find((season) => season.season === 1)); // Set season 1 as the default season
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(seasons.find((season) => season.season === Number(event.target.value)));
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="season-container">
      {selectedSeason && <img src={selectedSeason.image} alt={`Season ${selectedSeason.season}`} className="season-image" />}
      <select onChange={handleSeasonChange}>
        <option value="" className="season-dropdown">
          Select a season
        </option>
        {seasons.map((season, index) => (
          <option key={index} value={season.season}>
            Season {season.season}
          </option>
        ))}
      </select>
      <p className="season-description">{selectedSeason.description}</p>
      <Episode episodes={selectedSeason.episodes} />
    </div>
  );
};

export default Season;

Season.propTypes = {
  id: PropTypes.number.isRequired,
};
