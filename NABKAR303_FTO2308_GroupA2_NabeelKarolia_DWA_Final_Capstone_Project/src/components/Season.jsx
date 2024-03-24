import { useEffect, useState } from "react";
import Episode from "./Episode";
import PropTypes from "prop-types";

const Season = ({ id }) => {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      setSeasons(data.seasons);
      setSelectedSeason(data.seasons.find((season) => season.season === 1)); // Set season 1 as the default season
    };

    fetchData();
  }, [id]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(seasons.find((season) => season.season === Number(event.target.value)));
  };

  if (!selectedSeason) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select onChange={handleSeasonChange}>
        <option value="">Select a season</option>
        {seasons.map((season, index) => (
          <option key={index} value={season.season}>
            Season {season.season}
          </option>
        ))}
      </select>
      <Episode episodes={selectedSeason.episodes} />
    </div>
  );
};

export default Season;

Season.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
};
