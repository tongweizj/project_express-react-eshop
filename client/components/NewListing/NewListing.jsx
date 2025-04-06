import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/auth-context.jsx";
import { create } from "../../frontend-ctrl/api-listing.js";
import { list } from "../../frontend-ctrl/api-category.js";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";

export default function NewListing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    imageFile: null,
    location: {
      address: "",
      city: "",
      province: "",
      postalCode: "",
    },
    condition: "",
    status: "Active",
    postedBy: isAuthenticated?.user?._id,
  });

  // Fetch categories on mount
  useEffect(() => {
    (async () => {
      try {
        const cats = await list();
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    })();
  }, []);

  // Handle field changes
  const handleChange = (name) => (e) => {
    if (name === "imageFile") {
      setListing({ ...listing, imageFile: e.target.files[0] });
    } else if (name in listing.location) {
      setListing({
        ...listing,
        location: { ...listing.location, [name]: e.target.value },
      });
    } else {
      setListing({ ...listing, [name]: e.target.value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Basic validation
    const { title, description, price, category, condition } = listing;
    if (!title || !description || !price || !category || !condition) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(listing).forEach(([key, value]) => {
        if (key === "location") {
          Object.entries(value).forEach(([locKey, locVal]) =>
            formData.append(`location[${locKey}]`, locVal)
          );
        } else if (key === "imageFile") {
          formData.append("images", value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await create(formData);

      if (!response) {
        setMessage({ type: "error", text: "Unknown error. Please try again." });
      } else if (response.error) {
        setMessage({ type: "error", text: response.error });
      } else {
        setMessage({ type: "success", text: "Listing created successfully!" });
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.error("Error creating listing:", err);
      setMessage({ type: "error", text: "Failed to create listing." });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        New Listing
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      {isAuthenticated ? (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Image Upload */}
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="image-upload">Image</InputLabel>
            <TextField
              type="file"
              id="image-upload"
              onChange={handleChange("imageFile")}
              inputProps={{ accept: "image/*" }}
            />
          </FormControl>

          {/* Title */}
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={listing.title}
            onChange={handleChange("title")}
            required
          />

          {/* Description */}
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={listing.description}
            onChange={handleChange("description")}
            required
          />

          {/* Price */}
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={listing.price}
            onChange={handleChange("price")}
            required
          />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={listing.category}
              onChange={handleChange("category")}
              required
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Location Fields */}
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={listing.location.address}
            onChange={handleChange("address")}
            required
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={listing.location.city}
            onChange={handleChange("city")}
            required
          />
          <TextField
            label="Province"
            fullWidth
            margin="normal"
            value={listing.location.province}
            onChange={handleChange("province")}
            required
          />
          <TextField
            label="Postal Code"
            fullWidth
            margin="normal"
            value={listing.location.postalCode}
            onChange={handleChange("postalCode")}
            required
          />

          {/* Condition */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="condition-label">Condition</InputLabel>
            <Select
              labelId="condition-label"
              value={listing.condition}
              onChange={handleChange("condition")}
              required
            >
              <MenuItem value="">
                <em>Select condition</em>
              </MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
          </FormControl>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Listing
          </Button>
        </Box>
      ) : (
        <Typography color="error">
          You must be logged in to create a listing.
        </Typography>
      )}
    </Box>
  );
}
