import React, { useState, useEffect, useCallback } from "react";
import { CircularProgress, Grid, Typography, Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

import ListingCard from "../ListingCard/ListingCard";
import { list } from "../../frontend-ctrl/api-listing";
import hero from "../../assets/Hero.png";

import "./Home.css";

const HeroBanner = () => (
  <Box sx={{ width: "100%", height: 300, overflow: "hidden" }}>
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
);

const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" mt={6}>
    <CircularProgress />
  </Box>
);

const EmptyState = () => (
  <Typography variant="h6" color="textSecondary" align="center" mt={4}>
    No listings match your search criteria.
  </Typography>
);

const ListingsGrid = ({ listings }) => (
  <Grid container spacing={3} justifyContent="center">
    {listings.map((listing) => (
      <Grid item xs={12} sm={6} md={4} key={listing._id}>
        <ListingCard listing={listing} />
      </Grid>
    ))}
  </Grid>
);

const Home = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const location = useLocation();

  // Extract query string from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query") || "";
    setQuery(searchQuery);
  }, [location.search]);

  // Fetch listings from API
  const fetchListings = useCallback(async (signal) => {
    try {
      const data = await list(signal);
      if (data?.error) {
        console.error("Error fetching listings:", data.error);
      } else {
        setListings(data);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch listings:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchListings(controller.signal);
    return () => controller.abort();
  }, [fetchListings]);

  // Apply filter
  useEffect(() => {
    const filtered = listings.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [query, listings]);

  return (
    <>
      <HeroBanner />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {loading ? (
          <LoadingSpinner />
        ) : filteredListings.length > 0 ? (
          <ListingsGrid listings={filteredListings} />
        ) : (
          <EmptyState />
        )}
      </Container>
    </>
  );
};

export default Home;
