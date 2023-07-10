import React from "react";
import {
  Typography,
  Container,
  Tabs,
  Tab,
  TextField,
  Link,
  Avatar,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Header = ({ value, handleTabChange, searchTerm, handleSearch }) => {
  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  const logoStyle = {
    width: "80px",
    height: "80px",
    marginRight: "0rem",
    borderRadius: "50%",
    backgroundColor: "#3f51b5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "40px",
    fontWeight: 600,
    textDecoration: "none", // Add this line to remove the underline
  };

  const accountLogoStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    width: "40px",
    height: "40px",
    backgroundColor: "#3f51b5",
    cursor: "pointer",
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "white", color: "black", padding: "3rem 3" }}
    >
      <Link component={RouterLink} to="/home" underline="none">
        {" "}
        {/* Use the Link component and set underline="none" */}
        <div style={logoContainerStyle}>
          <div style={logoStyle}>B</div>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 600, marginBottom: "-1rem", color: "#3f51b5" }}
          >
            idverse
          </Typography>
        </div>
      </Link>
      <Box display="flex" justifyContent="center">
        <TextField
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Tabs value={value} onChange={handleTabChange} orientation="center"  
       sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Tab
    label="Electronics"
    component={RouterLink}
    to="/category/electronics"
    sx={{ fontSize: '1.5rem' }}
  />
  <Tab
    label="Sports"
    component={RouterLink}
    to="/category/sports"
    sx={{ fontSize: '1.5rem' }}
  />
  <Tab
    label="Cars"
    component={RouterLink}
    to="/category/cars"
    sx={{ fontSize: '1.5rem' }}
  />
  <Tab
    label="Food"
    component={RouterLink}
    to="/category/food"
    sx={{ fontSize: '1.5rem' }}
  />
  <Tab
    label="Toys"
    component={RouterLink}
    to="/category/toys"
    sx={{ fontSize: '1.5rem' }}
  />
  <Tab
    label="Furniture"
    component={RouterLink}
    to="/category/furniture"
    sx={{ fontSize: '1.5rem' }}
  />
  <Tab
    label="Post an Item"
    component={RouterLink}
    to="/addItem"
    sx={{ fontSize: '1.5rem' }}
  />
</Tabs>
      <Link component={RouterLink} to="/account" underline="none">
        <Avatar sx={accountLogoStyle} />
      </Link>
    </Container>
  );
};

export default Header;
