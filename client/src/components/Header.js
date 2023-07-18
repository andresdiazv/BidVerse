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
import background from "../assets/background.png";
import ItemList from "./searchBarFunc";

const Header = ({ value, handleTabChange, searchTerm, handleSearch }) => {
  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  const logoStyle = {
    height: "100px",
    marginBottom: "0rem",
    marginTop: "1rem",
    width: "auto",
  };

  const headerStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <Container sx={{ color: "black", padding: "3rem 3" }}>
      <Tabs
        value={0}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="inherit"
      >
        <Tab
          label="Orders"
          component={RouterLink}
          to="/orders"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Help"
          component={RouterLink}
          to="/help"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Privacy"
          component={RouterLink}
          to="/privacy"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Settings"
          component={RouterLink}
          to="/account"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Notifications"
          component={RouterLink}
          to="/notifications"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Logout"
          component={RouterLink}
          to="/logout"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
      </Tabs>
      <div style={logoContainerStyle}>
        <Link component={RouterLink} to="/home" underline="none">
          <img src={logo} alt="logo" style={logoStyle} />
        </Link>
      </div>
      <Link component={RouterLink} to="/home" underline="none"></Link>
      <Box sx={{ mt: 3, mb: 3 }}></Box>
      <ItemList />
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
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
        <Tab
          label="Sports"
          component={RouterLink}
          to="/category/sports"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
        <Tab
          label="Cars"
          component={RouterLink}
          to="/category/cars"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
        <Tab
          label="Food"
          component={RouterLink}
          to="/category/food"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
        <Tab
          label="Toys"
          component={RouterLink}
          to="/category/toys"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
        <Tab
          label="Furniture"
          component={RouterLink}
          to="/category/furniture"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
        <Tab
          label="Post an Item"
          component={RouterLink}
          to="/addItem"
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        />
      </Tabs>
    </Container>
  );
};

export default Header;
