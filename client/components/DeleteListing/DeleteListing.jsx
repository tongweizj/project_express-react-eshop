import React, { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { remove } from "../../frontend-ctrl/api-listing";
import { useAuth } from '../../helpers/auth-context';

const DeleteListing = ({ params, onDelete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { isAuthenticated } = useAuth();

    const handleDelete = async () => {
        setLoading(true);
        try {
            const data = await remove({ listingId: params._id }, { t: isAuthenticated.token });
            setLoading(false);

            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(true);
                if (onDelete) onDelete();
            }
        } catch (err) {
            setLoading(false);
            setError('Failed to delete listing');
        }
    };

    return (
        <>
            <Button variant="outlined" color="error" onClick={handleDelete} disabled={loading}>
                Delete
            </Button>
            {loading && <CircularProgress />}
            {error && (
                <Snackbar open autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
                </Snackbar>
            )}
            {success && (
                <Snackbar open autoHideDuration={6000} onClose={() => setSuccess(false)}>
                    <Alert severity="success" onClose={() => setSuccess(false)}>Listing deleted successfully</Alert>
                </Snackbar>
            )}
        </>
    );
};

export default DeleteListing;
