import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../Config/firebase';
import { Typography, TextField, Button, Container, Grid, Box, Select, MenuItem, FormControl, InputLabel, MobileDatePicker } from '@mui/material'; import Header from './Header';

const AddItems = () => {
    const [title, setTitle] = useState('');
    const [item, setItem] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [buyoutPrice, setBuyoutPrice] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
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

        const response = await axios.post('http://localhost:5000/api/items', newItem);
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

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  const logoStyle = {
    width: '80px',
    height: '80px',
    marginRight: '1rem',
    borderRadius: '50%',
    backgroundColor: '#3f51b5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '40px',
    fontWeight: 600,
  };


  return (
    <>
     <Header/>
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
  Create Item
</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Item"
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Cars">Cars</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Toys">Toys</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Buyout Price"
              variant="outlined"
              fullWidth
              value={buyoutPrice}
              onChange={(e) => setBuyoutPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Time"
              variant="outlined"
              fullWidth
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Time"
              variant="outlined"
              fullWidth
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
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


