const API_URL = import.meta.env.VITE_API_URL;
const createListing = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/listings/`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (err) {
      console.error("Error in create function:", err);
    }
  };
  
  const listListings = async (signal) => {
    try {
      const response = await fetch(`${API_URL}/api/listings/`, {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.error("Error in list function:", err);
    }
  };
  
  const readListing = async (params, credentials, signal) => {
    try {
      console.log("Fetching listing with ID:", params.listingId);
      const response = await fetch(`${API_URL}/api/listings/${params.listingId}`, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (credentials?.t || ''),
        },
      });
      return await response.json();
    } catch (err) {
      console.error("Error in read function:", err);
    }
  };
  
  const updateListing = async (params, listingData) => {
    try {
      console.log("Updating listing with ID:", params.listingId, "Data:", listingData);
      const response = await fetch(`${API_URL}/api/listings/${params.listingId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
      return await response.json();
    } catch (err) {
      console.error("Error in update function:", err);
    }
  };
  
  const removeListing = async (params) => {
    try {
      console.log("Deleting listing with ID:", params.listingId);
      const response = await fetch(`${API_URL}/api/listings/${params.listingId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log("Response status for delete:", response.status);
      const data = await response.json();
      console.log("Response data for delete:", data);
      return data;
    } catch (err) {
      console.error("Error in remove function:", err);
    }
  };
  
 export { createListing as create, listListings as list, readListing as read, updateListing as update, removeListing as remove };
