import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams(); // Fetch the category from the URL params
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      // If category is undefined, return early
      if (!category) {
        return;
      }
      const itemsQuery = query(
        collection(db, "items"),
        where("category", "==", category)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, [category]);

  const handleItemClick = (item) => {
    navigate(`/item/${item.id}`);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleItemClick(item)}>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl || "http://path/to/your/default/image.jpg"}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
