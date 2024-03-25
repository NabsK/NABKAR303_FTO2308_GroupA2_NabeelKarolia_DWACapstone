import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Preview from "./Preview";

const SearchResults = () => {
  const location = useLocation();
  const [shows, setShows] = useState(location.state.shows);
  const navigate = useNavigate();

  useEffect(() => {
    setShows(location.state.shows);
  }, [location]);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="SearchResultButton">
        Go Back
      </button>
      <Preview shows={shows} />
    </div>
  );
};

export default SearchResults;
