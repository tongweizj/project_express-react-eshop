const API_URL = import.meta.env.VITE_API_URL;
const createRating = async (rating) => {
    try {
      let response = await fetch(`${API_URL}/api/ratings/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rating)
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listRatings = async (signal) => {
    try {
      let response = await fetch(`${API_URL}/api/ratings/`, {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const readRating = async (params, signal) => {
    try {
      let response = await fetch(`${API_URL}/api/ratings/${params.ratingId}`, {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateRating = async (params, rating) => {
    try {
      let response = await fetch(`${API_URL}/api/ratings/${params.ratingId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rating)
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const removeRating = async (params) => {
    try {
      let response = await fetch(`${API_URL}/api/ratings/${params.ratingId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  export { createRating as create, listRatings as list, readRating as read, updateRating as update, removeRating as remove };
  