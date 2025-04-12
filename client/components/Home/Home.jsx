import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import ListingCard from "../ListingCard/ListingCard";
import { list } from "../../frontend-ctrl/api-listing";
import logo from "../../assets/logo.png";
import hero from "../../assets/Hero.png";
import { useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [listings, setListings] = useState([]); // Todos os dados
  const [filteredListings, setFilteredListings] = useState([]); // Dados filtrados
  const [filter, setFilter] = useState(""); // Filtro da URL
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const location = useLocation();

  // Escuta mudanças na URL e aplica o filtro da query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setFilter(query);
  }, [location.search]);

  // Busca os dados
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchListings = async () => {
      try {
        const data = await list(signal);
        if (data.error) {
          console.error("Error fetching listings:", data.error);
        } else {
          setListings(data); // Todos os dados
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch listings:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.abort();
    };
  }, []);

  // Aplica filtro localmente
  useEffect(() => {
    const filtered = listings.filter((listing) =>
      listing.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [filter, listings]);

  return (
    <>
      {/* Hero Banner */}
      <Box
        sx={{
          width: "100%",
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

      {/* Lista de itens */}
      <div className="listing-list-container">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <CircularProgress />
          </div>
        ) : filteredListings.length > 0 ? (
          <Grid container justifyContent="center" alignItems="center">
            {filteredListings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }} key={listing._id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            No listings match your search criteria.
          </Typography>
        )}
      </div>
    </>
  );
};

export default Home;
