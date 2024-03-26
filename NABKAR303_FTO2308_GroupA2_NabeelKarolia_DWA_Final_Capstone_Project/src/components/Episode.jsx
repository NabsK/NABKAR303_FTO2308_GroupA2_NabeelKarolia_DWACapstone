import { useState } from "react";
import PropTypes from "prop-types";
import { supabase } from "../supabaseInit.js";

const Episode = ({ episodes }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  const handlePlay = (fileUrl) => {
    setAudioSrc(fileUrl);
  };

  const handlePause = () => {
    setAudioSrc(null);
  };

  async function handleAddToFavorites(episode) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { data, error } = await supabase.from("favorites").insert([{ user_id: user.id, episode_title: episode.title, mp3_file: episode.file }]);
      // get show and season things
      if (error) console.error("Error adding favorite:", error);
      else console.log("Favorite added:", data);
    } else {
      console.log("User must be logged in to add favorites");
    }
  }

  return (
    <div className="episode-container">
      {episodes.map((episode, index) => (
        <div key={index} className="episode-card">
          <h2 className="episode-title">{episode.title}</h2>
          <p className="episode-description">Description: {episode.description}</p>
          <p className="episode-number">Episode: {episode.episode}</p>
          <button onClick={() => handlePlay(episode.file)} className="play-button">
            ▷ Play
          </button>
          <button onClick={() => handleAddToFavorites(episode)} className="add-to-favorites-button">
            Add to Favorites
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
  );
};

export default Episode;

Episode.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      episode: PropTypes.number,
      file: PropTypes.string,
    })
  ).isRequired,
};
