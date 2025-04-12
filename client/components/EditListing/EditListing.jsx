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
} from "@mui/material";
import { useAuth } from "../../helpers/auth-context.jsx";

const EditListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Estado da listagem, similar ao NewListing, mas com campo "images" para armazenar a URL atual.
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Busca os dados existentes da listagem
  useEffect(() => {
    if (!listingId) return;
    const ac = new AbortController();
    read({ listingId }, {}, ac.signal)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Certifique-se de que o backend esteja retornando o campo "images"
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
      .catch((err) => console.error("Error reading listing:", err));
    return () => ac.abort();
  }, [listingId, isAuthenticated]);

  // Busca as categorias para popular o select
  useEffect(() => {
    listCategories()
      .then((data) => {
        if (data.error) setError(data.error);
        else setCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Atualiza o estado de acordo com os inputs
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
    setError("");

    if (!isAuthenticated) {
      setError("Unauthenticated user.");
      return;
    }
    const { user, token } = isAuthenticated;
    let listingToSend;

    // Se foi selecionada uma nova imagem, monta o FormData conforme no NewListing
    if (listing.imageFile) {
      const formData = new FormData();
      formData.append("image", listing.imageFile); // Campo esperado pelo multer
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
      // Caso não haja nova imagem, envia os dados em JSON e o backend deverá manter a imagem atual
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
        setError(data.error);
      } else {
        setSuccess(true);
        setTimeout(() => navigate("/myListings"), 1000);
      }
    } catch (err) {
      console.error("UPDATE error:", err);
      setError("Ocorreu um erro ao atualizar a listagem.");
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
      Edit Listing
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && (
        <Typography color="primary">Updated successfully!</Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Exibe a imagem atual se houver */}
        {listing.image && listing.image.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1">Imagem atual:</Typography>
            <img
              src={`/${listing.image[0].replace("public/", "")}`}
              alt="Imagem atual"
              style={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>
        )}
        {/* Campo para upload de nova imagem */}
        <TextField
          type="file"
          fullWidth
          margin="normal"
          onChange={handleChange("imageFile")}
        />

        {/* Título */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listing.title}
          onChange={handleChange("title")}
          required
        />

        {/* Description */}
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

        {/* price */}
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

        {/* Categoria */}
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

        {/* Localização */}
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
              <em>Select a condition</em>
            </MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </Select>
        </FormControl>

        {/* Botão de submit */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Update Listing
        </Button>
      </Box>
    </Box>
  );
};

export default EditListing;
