import PropTypes from "prop-types";

const Episode = ({ episodes }) => (
  <div>
    {episodes.map((episode, index) => (
      <div key={index}>
        <h2>{episode.title}</h2>
        <p>Description: {episode.description}</p>
        <p>Episode: {episode.episode}</p>
        <p>File: {episode.file}</p>
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
