import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Tab, Tabs } from '@mui/material';
import ItemList from './searchBarFunc';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle the search functionality
    console.log('Searching for:', searchTerm);
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
    <Container maxWidth="lg" sx={{ backgroundColor: 'white', color: 'black', padding: '3rem 3' }}>
        <div style={logoContainerStyle}>
        <div style={logoStyle}>B</div>
        <Typography variant="h4" sx={{ ml: 1 }}>idverse</Typography>
      </div>
      <Tabs value={value} onChange={handleTabChange} centered>
        <Tab label="Electronics" />
        <Tab label="Sports" />
        <Tab label="Cars" />
        <Tab label="Food" />
        <Tab label="Toys" />
        <Tab label="Furniture" />
      </Tabs>
      <ItemList 
      />
    </Container>
  );
};


export default HomePage;
