import { useFavourites } from "../../helpers/FavouritesContext";
import ListingCard from "../ListingCard/ListingCard";
import { Typography, Grid, Box, Button } from "@mui/material";
import "./Favourites.css"; 

export default function Favourites() {
  const { favourites, removeFromFavourites } = useFavourites();

  return (
    <div className="favourites-container">
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Your Favourites
      </Typography>
      {favourites.length === 0 ? (
        <Typography variant="body1" textAlign="center">
          You have no items in your favourites.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          {favourites.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <Box
                sx={{
                  position: "relative",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  padding: "16px",
                  backgroundColor: "#fff",
                }}
              >
                <ListingCard listing={listing} />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2, width: "100%" }}
                  onClick={() => removeFromFavourites(listing._id)}
                >
                  Remove from Favourites
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
