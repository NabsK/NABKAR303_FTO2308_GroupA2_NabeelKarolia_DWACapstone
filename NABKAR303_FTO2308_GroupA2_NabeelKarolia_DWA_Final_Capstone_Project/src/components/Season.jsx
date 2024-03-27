import { useEffect, useState } from "react";
import Episode from "./Episode";
import PropTypes from "prop-types";

const Season = ({ id }) => {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTitle, setShowTitle] = useState(null);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const data = await response.json();
        setSeasons(data.seasons);
        setSelectedSeason(data.seasons.find((season) => season.season === 1)); // Set season 1 as the default season
        setIsLoading(false);
        setShowTitle(data.title);
        setUpdated(data.updated);
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
      <br></br>
      <select onChange={handleSeasonChange} className="season-select">
        <option value="" className="season-dropdown">
          Select a season
        </option>
        {seasons.map((season, index) => (
          <option key={index} value={season.season} className="season-dropdown">
            Season {season.season}
          </option>
        ))}
      </select>
      {selectedSeason && <p className="season-episodesAmount">Episodes: {selectedSeason.episodes.length}</p>}
      <Episode episodes={selectedSeason ? selectedSeason.episodes : []} id={Number(id)} selectedSeason={selectedSeason} showTitle={showTitle} updated={updated} />{" "}
    </div>
  );
};

export default Season;

Season.propTypes = {
  id: PropTypes.number.isRequired,
};
