const API_URL = import.meta.env.VITE_API_URL;
const createCategory = async (category) => {
    try {
      let response = await fetch(`${API_URL}/api/categories/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listCategories = async (signal) => {
    try {
      let response = await fetch(`${API_URL}/api/categories/`, {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const readCategory = async (params, signal) => {
    try {
      let response = await fetch(`${API_URL}/api/categories/${params.categoryId}`, {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateCategory = async (params, category) => {
    try {
      let response = await fetch(`${API_URL}/api/categories/${params.categoryId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const removeCategory = async (params) => {
    try {
      let response = await fetch(`${API_URL}/api/categories/${params.categoryId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  export { createCategory as create, listCategories as list, readCategory as read, updateCategory as update, removeCategory as remove };
  