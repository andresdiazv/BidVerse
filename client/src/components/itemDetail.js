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
} from "@mui/material";
import axios from "axios";
import { db, auth, updateDoc, doc } from "../Config/firebase";
import { collection, getDocs } from "firebase/firestore";
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

  const placeBid = async () => {
    if (newBid > itemInfo.highestBid) {
      const itemRef = doc(db, "items", itemId);
      await updateDoc(itemRef, {
        highestBid: newBid,
        highestBidder: auth.currentUser.email,
      });
      setItemInfo({
        ...itemInfo,
        highestBid: newBid,
        highestBidder: auth.currentUser.email,
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

    return (
      <>
        <Header />
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 700, marginBottom: "1rem", color: "#3f51b5" }}
          >
            Item Details
          </Typography>
          <Card variant="outlined" sx={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Title:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Item:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {item}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Description:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Category:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {category}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                StartTime:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {startTime}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                EndTime:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {endTime}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Buyout Price:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {buyoutPrice}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Seller:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {name}
              </Typography>
              <Box sx={{ marginTop: "1rem" }}>
                <img
                  src={imageUrl}
                  alt="Item"
                  style={{ maxWidth: "40%", height: "auto" }}
                />
              </Box>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Highest bid:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {itemInfo.highestBid}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#3f51b5",
                }}
              >
                Highest bidder:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {itemInfo.highestBidder}
              </Typography>

              <TextField
                variant="outlined"
                type="number"
                label="Your bid"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
                sx={{ marginTop: "1rem", marginBottom: "1rem", width: "100%" }}
              />
              <Button variant="contained" color="primary" onClick={placeBid}>
                Place bid
              </Button>
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }

  return null;
};

export default ItemDetail;
