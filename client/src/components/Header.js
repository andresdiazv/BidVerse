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
import logo from "../assets/bidverse.png";

const Header = ({ value, handleTabChange, searchTerm, handleSearch }) => {
  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  const logoStyle = {
    height: "150px",
    marginBottom: "-4rem",
    marginTop: "-2rem",
    width: "auto",
  };

  const accountLogoStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    width: "40px",
    height: "40px",
    backgroundColor: "#4b371c",
    cursor: "pointer",
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "white", color: "black", padding: "3rem 3" }}
    >
      <div style={logoContainerStyle}>
        <Link component={RouterLink} to="/home" underline="none">
          <img src={logo} alt="logo" style={logoStyle} />
        </Link>
      </div>
      <Link component={RouterLink} to="/home" underline="none"></Link>
      <Box display="flex" justifyContent="center">
        <TextField
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: '80%' }}
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
      <Tabs
        value={value}
        onChange={handleTabChange}
        orientation="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "1rem",
        }}
      >
        <Tab
          label="Electronics"
          component={RouterLink}
          to="/category/electronics"
          sx={{ fontSize: "1.5rem" }}
        />
        <Tab
          label="Sports"
          component={RouterLink}
          to="/category/sports"
          sx={{ fontSize: "1.5rem" }}
        />
        <Tab
          label="Cars"
          component={RouterLink}
          to="/category/cars"
          sx={{ fontSize: "1.5rem" }}
        />
        <Tab
          label="Food"
          component={RouterLink}
          to="/category/food"
          sx={{ fontSize: "1.5rem" }}
        />
        <Tab
          label="Toys"
          component={RouterLink}
          to="/category/toys"
          sx={{ fontSize: "1.5rem" }}
        />
        <Tab
          label="Furniture"
          component={RouterLink}
          to="/category/furniture"
          sx={{ fontSize: "1.5rem" }}
        />
        <Tab
          label="Post an Item"
          component={RouterLink}
          to="/addItem"
          sx={{ fontSize: "1.5rem" }}
        />
      </Tabs>
      <Link component={RouterLink} to="/account" underline="none">
        <Avatar sx={accountLogoStyle} />
      </Link>
    </Container>
  );
};

export default Header;
