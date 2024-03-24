import { useEffect, useState } from "react";
import Season from "./Season";
import { useParams, useNavigate } from "react-router-dom";

const Show = () => {
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the id from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const data = await response.json();
        setShow(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="show-container">
      <button onClick={() => navigate(-1)} className="showButton">
        Go Back
      </button>
      <br></br>
      <h2 className="show-title">{show.title}</h2>
      <p className="show-description">{show.description}</p>
      <div className="season-container">
        <Season id={Number(id)} />
      </div>
    </div>
  );
};

export default Show;
