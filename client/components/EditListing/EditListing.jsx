import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../../frontend-ctrl/api-listing.js";
import { list as listCategories } from "../../frontend-ctrl/api-category.js";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { useAuth } from "../../helpers/auth-context.jsx";

const EditListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: [],
    imageFile: null,
    location: { address: "", city: "", province: "", postalCode: "" },
    condition: "",
    status: "Active",
    postedBy: isAuthenticated?.user?._id,
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

 
  useEffect(() => {
    if (!listingId) return;
    const ac = new AbortController();
    read({ listingId }, {}, ac.signal)
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
          setErrorOpen(true);
        } else {
          setListing({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            category:
              typeof data.category === "string"
                ? data.category
                : data.category?._id || "",
            image: data.image || [],
            imageFile: null,
            location: {
              address: data.location?.address || "",
              city: data.location?.city || "",
              province: data.location?.province || "",
              postalCode: data.location?.postalCode || "",
            },
            condition: data.condition || "",
            status: data.status || "Active",
            postedBy: data.postedBy || isAuthenticated?.user?._id,
          });
        }
      })
      .catch((err) => {
        console.error("Error reading listing:", err);
        setErrorMessage("Error reading listing data.");
        setErrorOpen(true);
      });
    return () => ac.abort();
  }, [listingId, isAuthenticated]);


  useEffect(() => {
    listCategories()
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
          setErrorOpen(true);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setErrorMessage("Error fetching categories.");
        setErrorOpen(true);
      });
  }, []);

  const handleChange = (name) => (event) => {
    if (name === "imageFile") {
      setListing({ ...listing, imageFile: event.target.files[0] });
    } else if (["address", "city", "province", "postalCode"].includes(name)) {
      setListing({
        ...listing,
        location: { ...listing.location, [name]: event.target.value },
      });
    } else {
      setListing({ ...listing, [name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!isAuthenticated) {
      setErrorMessage("User not authenticated.");
      setErrorOpen(true);
      return;
    }

    
    if (
      !listing.title ||
      !listing.description ||
      !listing.price ||
      !listing.category ||
      !listing.condition ||
      !listing.location.address ||
      !listing.location.city ||
      !listing.location.province ||
      !listing.location.postalCode
    ) {
      setErrorMessage("Please fill in all required fields before submitting the listing.");
      setErrorOpen(true);
      return;
    }

    const { user, token } = isAuthenticated;
    let listingToSend;

    if (listing.imageFile) {
      const formData = new FormData();
      formData.append("image", listing.imageFile);
      formData.append("title", listing.title);
      formData.append("description", listing.description);
      formData.append("price", listing.price);
      formData.append("category", listing.category);
      formData.append("condition", listing.condition);
      formData.append("status", listing.status);
      formData.append("postedBy", user._id);
      formData.append("location[address]", listing.location.address);
      formData.append("location[city]", listing.location.city);
      formData.append("location[province]", listing.location.province);
      formData.append("location[postalCode]", listing.location.postalCode);
      listingToSend = formData;
    } else {
      listingToSend = {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        category: listing.category,
        condition: listing.condition,
        status: listing.status,
        postedBy: user._id,
        location: {
          address: listing.location.address,
          city: listing.location.city,
          province: listing.location.province,
          postalCode: listing.location.postalCode,
        },
      };
    }

    try {
      const data = await update({ listingId }, { t: token }, listingToSend);
      if (data.error) {
        setErrorMessage(data.error);
        setErrorOpen(true);
      } else {
        setSuccessOpen(true);
        setTimeout(() => {
          navigate("/myListings");
        }, 1000);
      }
    } catch (err) {
      console.error("UPDATE error:", err);
      setErrorMessage("An error occurred while updating the listing.");
      setErrorOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Listing
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {listing.image && listing.image.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1">Current Image:</Typography>
            <img
              src={`/${listing.image[0].replace("public/", "")}`}
              alt="Current image"
              style={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>
        )}

        <TextField
          type="file"
          fullWidth
          margin="normal"
          onChange={handleChange("imageFile")}
        />

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.title}
          onChange={handleChange("title")}
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={listing.description}
          onChange={handleChange("description")}
          required
        />

        <TextField
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.price}
          onChange={handleChange("price")}
          required
        />

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

        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.location.address}
          onChange={handleChange("address")}
          required
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.location.city}
          onChange={handleChange("city")}
          required
        />
        <TextField
          label="Province"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.location.province}
          onChange={handleChange("province")}
          required
        />
        <TextField
          label="Postal Code"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.location.postalCode}
          onChange={handleChange("postalCode")}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="condition-label">Condition</InputLabel>
          <Select
            labelId="condition-label"
            value={listing.condition}
            onChange={handleChange("condition")}
            required
          >
            <MenuItem value="">
              <em>Select a condition</em>
            </MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Update Listing
        </Button>
      </Box>

      {/* Snackbar para exibir mensagens de erro */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar para mensagem de sucesso */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully updated!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditListing;
