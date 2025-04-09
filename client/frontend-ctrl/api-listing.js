// CREATE
export const create = async (formData) => {
    const res = await fetch('/api/listings/', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`CREATE failed: HTTP ${res.status} ${res.statusText} – ${text}`);
    }
    return res.json();
  };
  
  // LIST
  export const list = async (signal) => {
    const res = await fetch('/api/listings/', {
      method: 'GET',
      signal,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`LIST failed: HTTP ${res.status} ${res.statusText} – ${text}`);
    }
    return res.json();
  };
  
  // READ
  export const read = async (params, credentials, signal) => {
    const res = await fetch(`/api/listings/${params.listingId}`, {
      method: 'GET',
      signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (credentials?.t || ''),
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`READ failed: HTTP ${res.status} ${res.statusText} – ${text}`);
    }
    return res.json();
  };
  
  export const update = async (params, credentials, dataToSend) => {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${credentials.t}`
      }
    };
  
    if (dataToSend instanceof FormData) {
      options.body = dataToSend;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(dataToSend);
    }
  
    console.log("🧾 Dados enviados no PUT:", dataToSend);
  
    const res = await fetch(`/api/listings/${params.listingId}`, options);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`UPDATE failed: HTTP ${res.status} ${res.statusText} – ${text}`);
    }
    return res.json();
  };
  
  
  // REMOVE
  export const remove = async (params) => {
    const res = await fetch(`/api/listings/${params.listingId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`DELETE failed: HTTP ${res.status} ${res.statusText} – ${text}`);
    }
    return res.json();
  };