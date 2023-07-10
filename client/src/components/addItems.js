import React, { useState } from "react";
import axios from "axios";
import { auth } from "../Config/firebase";
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "./Header";
import { useDropzone } from "react-dropzone";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Config/firebase";

 

const AddItems = () => {
  const [title, setTitle] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [buyoutPrice, setBuyoutPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);

        const imageUrl = await getDownloadURL(storageRef);

        const newItem = {
          title,
          item,
          category,
          description,
          buyoutPrice,
          startTime,
          endTime,
          uid: currentUser.uid,
          imageUrl,
        };

        const response = await axios.post(
          "http://localhost:5000/api/items",
          newItem
        );
        console.log(response.data);

        // Reset the form fields
        setTitle("");
        setItem("");
        setCategory("");
        setDescription("");
        setBuyoutPrice("");
        setStartTime("");
        setEndTime("");
        setImage(null);

        console.log("Item created successfully");
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, marginBottom: "1rem", color: "#3f51b5" }}
        >
          Create Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="item"
                label="Item Name"
                variant="outlined"
                fullWidth
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"electronics"}>Electronics</MenuItem>
                  <MenuItem value={"sports"}>Sports</MenuItem>
                  <MenuItem value={"cars"}>Cars</MenuItem>
                  <MenuItem value={"food"}>Food</MenuItem>
                  <MenuItem value={"toys"}>Toys</MenuItem>
                  <MenuItem value={"furniture"}>Furniture</MenuItem>
                  <MenuItem value={"Muisc"}>Music</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="start time"
                label="Start Time mm/dd/yyyy"
                variant="outlined"
                fullWidth
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="end time"
                label="End Time mm/dd/yyyy"
                variant="outlined"
                fullWidth
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="buyout price"
                label="Buyout Price $"
                variant="outlined"
                fullWidth
                value={buyoutPrice}
                onChange={(e) => setBuyoutPrice(e.target.value)}
              />
            </Grid>
           
            <Grid item xs={12}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {image ? (
                  <p>File selected: {image.path}</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddItems;