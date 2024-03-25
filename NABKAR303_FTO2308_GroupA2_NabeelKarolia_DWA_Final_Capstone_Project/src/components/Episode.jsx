import { useState } from "react";
import PropTypes from "prop-types";

const Episode = ({ episodes }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  const handlePlay = (fileUrl) => {
    setAudioSrc(fileUrl);
  };

  const handlePause = () => {
    setAudioSrc(null);
  };

  return (
    <div className="episode-container">
      {episodes.map((episode, index) => (
        <div key={index} className="episode-card">
          <h2 className="episode-title">{episode.title}</h2>
          <p className="episode-description">Description: {episode.description}</p>
          <p className="episode-number">Episode: {episode.episode}</p>
          <button onClick={() => handlePlay(episode.file)}>
            <img src="./images/play.png" id="play-button"></img>
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
