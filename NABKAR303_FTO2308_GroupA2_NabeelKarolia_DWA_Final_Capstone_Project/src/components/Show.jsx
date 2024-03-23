import { useEffect, useState } from "react";
import Season from "./Season";
import PropTypes from "prop-types";

const Show = ({ id }) => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      setShow(data);
    };

    fetchData();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={show.image} alt={show.title} />
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <Season id={id} />
    </div>
  );
};

export default Show;

Show.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
};
