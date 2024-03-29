import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseInit.js";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
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

  const handlePlay = async (episode) => {
    fetch(episode.file)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const audioData = reader.result;
          localStorage.setItem("audio", audioData);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => console.error("Error fetching audio file:", error));
    localStorage.setItem("Episode", JSON.stringify(episode));
    window.dispatchEvent(new Event("storage"));
    console.log("In handlePlay");

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // Fetch existing progress
      const { data: existingProgress, error } = await supabase.from("Episode_Progress").select("*").eq("user_id", user.id);
      if (error) {
        console.error("Error fetching episode progress:", error);
        return;
      }

      // Insert or update progress
      if (existingProgress && existingProgress.length > 0) {
        // Progress exists, update the timestamp to 0
        await supabase.from("Episode_Progress").update({ mp3_timestamp: 0, episode_description: episode.description }).eq("user_id", user.id).eq("mp3_file", episode.file);
      } else {
        // Progress doesn't exist, insert with timestamp as 0
        await supabase.from("Episode_Progress").insert([
          {
            user_id: user.id,
            episode_description: episode.description,
            mp3_file: episode.file,
            mp3_timestamp: 0,
          },
        ]);
      }
    } else {
      console.log("User must be logged in to save episode progress.");
    }
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
      <div className="favEpisode-container">
        {sortedFavorites.map((favorite, index) => (
          <div key={index} className="episode-card">
            <p>{favorite.show_title}</p>
            <h2 className="episode-title">{favorite.episode_title}</h2>
            <p>{favorite.season_title}</p>
            <button onClick={() => removeFromFavorites(favorite.id)} className="removeFav-button">
              💔 Remove from Favorites
            </button>

            <p className="episode-description">{favorite.episode_description}</p>
            <p>Added to favs: {new Date(favorite.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(favorite.updated).toLocaleDateString()}</p>
            <button onClick={() => handlePlay(favorite)} className="play-button">
              ▷ Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
