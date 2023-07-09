import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Tab, Tabs } from '@mui/material';
import ItemList from './searchBarFunc';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 6) {
      navigate('/addItems');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle the search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
    <Header value={value} handleTabChange={handleTabChange} searchTerm={searchTerm} handleSearch={handleSearch} />
    <ItemList />
  </>
  );
};

export default HomePage;
