import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Tab,
  Tabs,
  Grid,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Config/firebase";

const HomePage = () => {
  const navigate = useNavigate();
  const [newValue, setNewValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(""); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsData = [];
        for (const doc of querySnapshot.docs) {
          const item = doc.data();
          if (item.imageUrl) {
            const storageRef = ref(storage, item.imageUrl);
            const downloadURL = await getDownloadURL(storageRef);
            item.imageUrl = downloadURL;
          }
          itemsData.push({
            id: doc.id,
            ...item,
          });
        }
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);

    const categories = [
      "electronics",
      "sports",
      "cars",
      "food",
      "toys",
      "furniture",
    ];
    setCategory(categories[newValue] || "");

    if (newValue === 6) {
      navigate("/addItem");
    } else {
      navigate(`/category/${categories[newValue]}`);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log("Searching for:", searchTerm);

    if (newValue == 5) {
      navigate("");
    }
  };

  const handleItemClick = (item) => {
    navigate(`/item/${item.id}`);
  };

  return (
    <>
      <Header
        value={value}
        handleTabChange={handleTabChange}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {items
            .filter((item) => !category || item.category === category)
            .map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handleItemClick(item)}>
                  {item.imageUrl ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={item.imageUrl}
                      alt={item.title}
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
