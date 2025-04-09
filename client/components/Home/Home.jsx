import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import ListingCard from "../ListingCard/ListingCard";
import { list } from "../../frontend-ctrl/api-listing";
import logo from "../../assets/logo.png";
import "./Home.css";
import hero from "../../assets/Hero.png";


const Home = () => {
  const [listings, setListings] = useState([]); // State to hold listings
  const [loading, setLoading] = useState(true); // State to indicate loading

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchListings = async () => {
      try {
        const data = await list(signal);
        if (data.error) {
          console.error("Error fetching listings:", data.error);
        } else {
          setListings(data); // Set listings including `images` property
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch listings:", err);
        }
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchListings();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {/* Hero Banner: 100% */}
      <Box
  sx={{
    width: "100vw",
    height: "300px", 
    overflow: "hidden",
    margin: 0,
    padding: 0,
  }}
>
  <img
    src={hero}
    alt="Hero Banner"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />
</Box>

  
      {/*  */}
      <div className="listing-list-container">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <CircularProgress />
          </div>
        ) : listings.length > 0 ? (
          <Grid container justifyContent="center" alignItems="center">
            {listings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }} key={listing._id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            No listings available at the moment.
          </Typography>
        )}
      </div>
    </>
  );
  
};

export default Home;
