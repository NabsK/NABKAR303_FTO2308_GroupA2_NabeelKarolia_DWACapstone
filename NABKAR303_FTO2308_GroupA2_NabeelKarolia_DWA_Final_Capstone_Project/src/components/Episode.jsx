import { useEffect, useState } from "react";

const Episode = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the shows
      const responseShows = await fetch(`https://podcast-api.netlify.app/shows`);
      const shows = await responseShows.json();

      // Fetch the episodes for each show
      const episodes = [];
      for (const show of shows) {
        const responseEpisodes = await fetch(`https://podcast-api.netlify.app/id/${show.id}`);
        const data = await responseEpisodes.json();
        episodes.push(...data.seasons.flatMap((season) => season.episodes));
      }

      setEpisodes(episodes);
    };

    fetchData();
  }, []);

  if (episodes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
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
};

export default Episode;
