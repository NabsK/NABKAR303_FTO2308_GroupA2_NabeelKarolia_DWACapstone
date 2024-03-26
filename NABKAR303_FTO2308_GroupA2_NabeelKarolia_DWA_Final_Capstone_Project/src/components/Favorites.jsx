import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();

  return (
    <div className="Favorites-page">
      <button className="favHomeButton" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}
