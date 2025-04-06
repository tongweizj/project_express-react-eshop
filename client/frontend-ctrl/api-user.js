const API_URL = import.meta.env.VITE_API_URL;
const createUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/api/users/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.error('createUser error:', err);
    // Agora retornamos um objeto com `error` para o frontend lidar
    return { error: err.message || 'Network error' };
  }
};

  
  const listUsers = async (signal) => {
    try {
      let response = await fetch(`${API_URL}/api/users/`, {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const readUser = async (params, credentials, signal) => {
    try {
      let response = await fetch(`${API_URL}/api/users/${params.userId}`, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateUser = async (params, credentials, user) => {
    try {
      let response = await fetch(`${API_URL}/api/users/${params.userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(user)
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const removeUser = async (params, credentials) => {
    try {
      let response = await fetch(`${API_URL}/api/users/${params.userId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  export { createUser as create, listUsers as list, readUser as read, updateUser as update, removeUser as remove };
  