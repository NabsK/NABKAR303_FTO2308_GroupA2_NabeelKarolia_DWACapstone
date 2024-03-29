import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { supabase } from "../supabaseInit.js";

const Episode = ({ episodes, id, selectedSeason, showTitle, updated }) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = async (episode) => {
    setAudioSrc(episode.file); // Set the new audio source first
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play(); // Start playing the audio automatically
    }

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

  const handleTimestamp = async () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        // Update progress in the database with the current timestamp

        await supabase.from("Episode_Progress").update({ mp3_timestamp: currentTime }).eq("user_id", user.id); // Update progress for the currently playing audio file
      } else {
        console.log("User must be logged in to save episode progress.");
      }
    }
  };

  async function handleAddToFavorites(episode) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { data, error } = await supabase.from("favorites").insert([
        {
          user_id: user.id,
          episode_title: episode.title,
          episode_description: episode.description,
          mp3_file: episode.file,
          show_id: id,
          season_title: selectedSeason.title,
          season_image: selectedSeason.image,
          show_title: showTitle,
          updated: updated,
        },
      ]);

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
          <button onClick={() => handlePlay(episode)} className="play-button">
            ▷ Play
          </button>
          <button onClick={() => handleAddToFavorites(episode)} className="add-to-favorites-button">
            ♡ Add to Favorites
          </button>
        </div>
      ))}
      {audioSrc && (
        <div className="audio-player-container">
          <audio ref={audioRef} controls autoPlay onPause={handleTimestamp} className="audio-player">
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
  id: PropTypes.number.isRequired,
  selectedSeason: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  showTitle: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
};
