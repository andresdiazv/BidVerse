import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { db, auth, updateDoc, doc } from "../Config/firebase";
import { addDoc, collection, getDocs, writeBatch  } from "firebase/firestore";
import Header from "./Header";

const ItemDetail = () => {
  const [itemInfo, setItemInfo] = useState(null);
  const [newBid, setNewBid] = useState("");
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
          if (doc.id === itemId) {
            setItemInfo(doc.data());
          }
        });
      } catch (error) {
        console.error("Error fetching item information", error);
      }
    };
    fetchItemInfo();
  }, [itemId]);

  const user = auth.currentUser;

  const generateUniqueId = () => {
    // Generate a unique ID using your preferred method
    // Example: Using the current timestamp
    return Date.now().toString();
  };

  const placeBid = async () => {
    if (user && newBid > itemInfo.highestBid || !itemInfo.highestBid) {
      const itemRef = doc(db, "items", itemId);
      const bidCollectionRef = collection(db, "bids");
  
      const itemUpdate = {
        highestBid: newBid,
        highestBidder: user.email,
      };
  
      const bidUpdate = {
        userID: user.email,
        bidPrice: newBid,
        itemId,
        bidId: generateUniqueId(),
      };
  
      const batch = writeBatch(db);
      batch.update(itemRef, itemUpdate);
      batch.set(doc(bidCollectionRef, bidUpdate.bidId), bidUpdate);
      await batch.commit();
  
      setItemInfo({
        ...itemInfo,
        highestBid: newBid,
        highestBidder: user.email,
      });
    } else {
      alert("Your bid must be higher than the current highest bid");
    }
  };

  const currentUser = auth.currentUser;
  if (itemInfo && currentUser) {
    const name = currentUser.email;
    const {
      buyoutPrice,
      category,
      description,
      endTime,
      item,
      startTime,
      title,
      imageUrl,
    } = itemInfo;

    const styles = {
      container: {
        backgroundColor: "#6D72C3",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      header: {
        fontWeight: 700,
        marginBottom: "1rem",
        color: "white",
      },
      card: {
        marginBottom: "1rem",
        borderColor: "black",
      },
      boldText: {
        fontWeight: "bold",
        marginBottom: "0.5rem",
        color: "purple",
      },
      image: {
        maxWidth: "85%",
        height: "auto",
        marginTop: "1rem",
      },
      bidTextField: {
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "100%",
      },
      button: {
        backgroundColor: "#56118c",
        color: "white",
      },
    };

    return (
      <>
        <Header />
        <Container maxWidth="md" sx={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom sx={styles.header}>
                Item Details
              </Typography>
              <Card variant="outlined" sx={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Title:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Item:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {item}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Description:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {description}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Category:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {category}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    StartTime:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {startTime}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    EndTime:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {endTime}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Buyout Price:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {buyoutPrice}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Seller:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card variant="outlined" sx={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Highest bid:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    ${itemInfo.highestBid}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Highest bidder:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {itemInfo.highestBidder}
                  </Typography>
                  
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Your bid"
                    value={newBid}
                    onChange={(e) => setNewBid(e.target.value)}
                    sx={styles.bidTextField}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={placeBid}
                    sx={styles.button}
                  >
                    Place bid
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card variant="outlined" sx={styles.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Highest bid:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    ${itemInfo.highestBid}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.boldText}>
                    Highest bidder:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {itemInfo.highestBidder}
                  </Typography>
                  
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Your bid"
                    value={newBid}
                    onChange={(e) => setNewBid(e.target.value)}
                    sx={styles.bidTextField}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={placeBid}
                    sx={styles.button}
                  >
                    Place bid
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={imageUrl} alt="Item" style={styles.image} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  return null;
};

export default ItemDetail;
