export const fetchShowData = async (itemId) => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app/id/${itemId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchShows = async () => {
  try {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
