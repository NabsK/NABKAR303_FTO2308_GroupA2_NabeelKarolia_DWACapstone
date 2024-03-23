import PropTypes from "prop-types";

const Genres = ({ onSelectGenre }) => {
  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  return (
    <div className="container">
      {Object.entries(genreMapping).map(([genre, title]) => (
        <button className="button" key={genre} onClick={() => onSelectGenre(Number(genre))}>
          {title}
        </button>
      ))}
    </div>
  );
};

Genres.propTypes = {
  onSelectGenre: PropTypes.func.isRequired,
};

export default Genres;
