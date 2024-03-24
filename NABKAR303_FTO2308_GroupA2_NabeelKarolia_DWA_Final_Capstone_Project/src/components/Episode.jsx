import PropTypes from "prop-types";

const Episode = ({ episodes }) => (
  <div className="episode-container">
    {episodes.map((episode, index) => (
      <div key={index} className="episode-card">
        <h2 className="episode-title">{episode.title}</h2>
        <p className="episode-description">Description: {episode.description}</p>
        <p className="episode-number">Episode: {episode.episode}</p>
        <p className="episode-file">File: {episode.file}</p>
      </div>
    ))}
  </div>
);

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
