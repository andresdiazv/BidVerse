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

const HomePage = () => {
  const navigate = useNavigate();
  const [newValue, setNewValue] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(""); // Added category state

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsList);
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
      navigate('');
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
            .map(
              (
                item // Filtering items based on category
              ) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card onClick={() => handleItemClick(item)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        item.imageUrl || "http://path/to/your/default/image.jpg"
                      }
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
