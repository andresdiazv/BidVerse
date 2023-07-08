import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../Config/firebase';
import { FormControl, InputLabel, Select, MenuItem, Button, Container, TextField, Box, Typography } from '@mui/material';

const AddItems = () => {
  const [title, setTitle] = useState('');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [buyoutPrice, setBuyoutPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const newItem = {
          title,
          item,
          category,
          description,
          buyoutPrice,
          startTime,
          endTime,
          uid: currentUser.uid,
        };

        const response = await axios.post('http://localhost:5000/api/items/', newItem);
        console.log(response.data);

        // Reset the form fields
        setTitle('');
        setItem('');
        setCategory('');
        setDescription('');
        setBuyoutPrice('');
        setStartTime('');
        setEndTime('');

        console.log('Item created successfully');
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
      <Typography variant="h4" component="h1" gutterBottom>
          Create Item
        </Typography>
      </Box>
      <Box mt={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box mt={2}>
            <TextField
              label="Item"
              variant="outlined"
              fullWidth
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                variant="outlined"
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="sports">Cars</MenuItem>
                <MenuItem value="sports">Food</MenuItem>
                <MenuItem value="sports">Toys</MenuItem>
                <MenuItem value="sports">Clothes</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Buyout Price"
              variant="outlined"
              fullWidth
              value={buyoutPrice}
              onChange={(e) => setBuyoutPrice(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Start Time"
              variant="outlined"
              fullWidth
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="End Time"
              variant="outlined"
              fullWidth
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box mt={4} textAlign="center">
            <Button variant="contained" type="submit">
              Create Item
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddItems;
