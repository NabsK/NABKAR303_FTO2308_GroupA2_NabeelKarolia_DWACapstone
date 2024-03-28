import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseInit.js";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null);
  const [sortField, setSortField] = useState("show_title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedFavorites, setSortedFavorites] = useState([]);

  const sortFavorites = useCallback(() => {
    const sorted = [...favorites].sort((a, b) => {
      const aValue = sortField === "updated" ? new Date(a[sortField]) : a[sortField].toUpperCase();
      const bValue = sortField === "updated" ? new Date(b[sortField]) : b[sortField].toUpperCase();
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    setSortedFavorites(sorted);
  }, [favorites, sortField, sortOrder]);

  useEffect(() => {
    sortFavorites();
  }, [sortFavorites]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let { data, error } = await supabase.from("favorites").select("*").eq("user_id", user.id);
      if (error) console.error("Error loading favorites:", error);
      else setFavorites(data);
    }
  }

  async function removeFromFavorites(favoriteId) {
    const { error } = await supabase.from("favorites").delete().eq("id", favoriteId);
    if (error) {
      console.error("Error removing favorite:", error);
    } else {
      setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== favoriteId));
    }
  }

  const handlePlay = (fileUrl) => {
    setAudioSrc(fileUrl);
  };

  const handlePause = () => {
    setAudioSrc(null);
  };

  return (
    <div className="Favorites-page">
      <button className="favHomeButton" onClick={() => navigate("/")}>
        Back to Home
      </button>
      <div className="sort-container">
        <button
          className="sort-button"
          onClick={() => {
            setSortField("show_title");
            setSortOrder("asc");
          }}
        >
          Sort by Show Titles A-Z
        </button>
        <button
          className="sort-button"
          onClick={() => {
            setSortField("show_title");
            setSortOrder("desc");
          }}
        >
          Sort by Show Titles Z-A
        </button>
        <button
          className="sort-button"
          onClick={() => {
            setSortField("updated");
            setSortOrder("asc");
          }}
        >
          Sort by Date Updated (Oldest First)
        </button>
        <button
          className="sort-button"
          onClick={() => {
            setSortField("updated");
            setSortOrder("desc");
          }}
        >
          Sort by Date Updated (Newest First)
        </button>
      </div>
      <div className="episode-container">
        {sortedFavorites.map((favorite, index) => (
          <div key={index} className="episode-card">
            <p>{favorite.show_title}</p>
            <h2 className="episode-title">{favorite.episode_title}</h2>
            <p>{favorite.season_title}</p>
            <button onClick={() => removeFromFavorites(favorite.id)} className="removeFav-button">
              💔 Remove from Favorites
            </button>

            <p>{favorite.episode_description}</p>
            <p>Added to favs: {new Date(favorite.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(favorite.updated).toLocaleDateString()}</p>
            <button onClick={() => handlePlay(favorite.mp3_file)} className="play-button">
              ▷ Play
            </button>
          </div>
        ))}
        {audioSrc && (
          <div className="audio-player-container">
            <audio controls autoPlay onEnded={handlePause} className="audio-player">
              <source src={audioSrc} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
