import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { read, update } from '../../frontend-ctrl/api-listing.js';
import './EditListing.css';

const EditListing = () => {
    const { listingId } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState({
        title: '',
        description: '',
        price: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Fetch the current listing details
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ userId: listingId }, {}, signal)
            .then(data => {
                if (data && data.error) {
                    setError(data.error);
                } else {
                    setListing(data);
                }
            })
            .catch(err => console.error(err));

        return () => abortController.abort();
    }, [listingId]);

    // Handle form input changes
    const handleChange = (name) => (event) => {
        setListing({ ...listing, [name]: event.target.value });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        update({ listingId }, listing)
            .then(data => {
                if (data && data.error) {
                    setError(data.error);
                } else {
                    setSuccess(true);
                    navigate('/listings'); // Redirect to listings page on success
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Edit Listing</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Listing updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={listing.title}
                        onChange={handleChange('title')}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={listing.description}
                        onChange={handleChange('description')}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={listing.price}
                        onChange={handleChange('price')}
                        required
                    />
                </div>
                <button type="submit">Update Listing</button>
            </form>
        </div>
    );
};

export default EditListing;
