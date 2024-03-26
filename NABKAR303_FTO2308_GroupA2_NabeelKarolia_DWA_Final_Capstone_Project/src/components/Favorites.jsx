import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseInit.js";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null);

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
      <div className="episode-container">
        {favorites.map((favorite, index) => (
          <div key={index} className="episode-card">
            <h2 className="episode-title">{favorite.episode_title}</h2>
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
