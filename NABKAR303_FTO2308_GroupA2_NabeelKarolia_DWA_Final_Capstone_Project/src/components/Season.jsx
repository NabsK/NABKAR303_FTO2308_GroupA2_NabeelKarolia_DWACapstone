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
    };

    fetchData();
  }, [id]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(seasons.find((season) => season.season === Number(event.target.value)));
  };

  if (seasons.length === 0) {
    return <div>Loading...</div>; // Or some other loading state
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
      {selectedSeason && <Episode episodes={selectedSeason.episodes} />}
    </div>
  );
};

export default Season;

Season.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
};
