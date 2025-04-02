const create = async (formData) => {
    try {
        const response = await fetch(`/api/listings/`, {
            method: 'POST',
            body: formData,
        });
        return await response.json();
    } catch (err) {
        console.error("Error in create function:", err);
    }
};

const list = async (signal) => {
    try {
        const response = await fetch(`/api/listings/`, {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.error("Error in list function:", err);
    }
};

const read = async (params, credentials, signal) => {
    try {
        console.log("Fetching listing with ID:", params.listingId); // Debugging log
        const response = await fetch(`/api/listings/` + params.listingId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (credentials?.t || ''), // Optional chaining for safety
            },
        });
        return await response.json();
    } catch (err) {
        console.error("Error in read function:", err);
    }
};

const update = async (params, listingData) => {
    try {
        console.log("Updating listing with ID:", params.listingId, "Data:", listingData); // Debugging log
        const response = await fetch(`/api/listings/` + params.listingId, {
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

const remove = async (params) => {
    try {
        console.log("Deleting listing with ID:", params.listingId); // Debugging log
        const response = await fetch(`/api/listings/` + params.listingId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log("Response status for delete:", response.status); // Debugging log
        const data = await response.json();
        console.log("Response data for delete:", data); // Debugging log
        return data;
    } catch (err) {
        console.error("Error in remove function:", err);
    }
};

export { create, list, read, update, remove };
