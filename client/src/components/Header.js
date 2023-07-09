import React from 'react';
import { Typography, Container, Tabs, Tab, TextField, Link, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ value, handleTabChange, searchTerm, handleSearch }) => {
  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  const logoStyle = {
    width: '80px',
    height: '80px',
    marginRight: '0rem',
    borderRadius: '50%',
    backgroundColor: '#3f51b5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '40px',
    fontWeight: 600,
    textDecoration: 'none', // Add this line to remove the underline
  };

  const accountLogoStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '40px',
    height: '40px',
    backgroundColor: '#3f51b5',
    cursror: 'pointer',
  }


  return (
    <Container maxWidth="lg" sx={{ backgroundColor: 'white', color: 'black', padding: '3rem 3' }}>
      <Link component={RouterLink} to="/home" underline="none"> {/* Use the Link component and set underline="none" */}
        <div style={logoContainerStyle}>
          <div style={logoStyle}>B</div>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: '-1rem', color: '#3f51b5' }}>
           idverse
          </Typography>
        </div>
      </Link>
      <Tabs value={value} onChange={handleTabChange} centered>
        <Tab label="Electronics" component={RouterLink} to="/electronics" />
        <Tab label="Sports" component={RouterLink} to="/sports" />
        <Tab label="Cars" component={RouterLink} to="/cars" />
        <Tab label="Food" component={RouterLink} to="/food" />
        <Tab label="Toys" component={RouterLink} to="/toys" />
        <Tab label="Furniture" component={RouterLink} to="/furniture" />
        <Tab label="Post an Item" component={RouterLink} to="/addItem" />
      </Tabs>
      <Link component={RouterLink} to="/account" underline='none'>
      <Avatar sx={accountLogoStyle} />
    </Link>
  </Container>
  );
};

export default Header;
