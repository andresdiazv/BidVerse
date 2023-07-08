import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/${itemId}`);
      setItem(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching item:', error);
      setLoading(false);
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit the bid to the backend API endpoint
      const response = await axios.post(`http://localhost:5000/api/items/${itemId}/bids`, {
        amount: bidAmount,
      });
      console.log(response.data);

      
      setItem((prevItem) => ({
        ...prevItem,
        bidAmount: response.data.bidAmount,
      }));

      
      setBidAmount('');
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {item ? (
        <div>
          <Typography variant="h4">{item.title}</Typography>
          <Typography variant="subtitle1">Description: {item.description}</Typography>
          <Typography variant="subtitle1">Current Bid: {item.bidAmount}</Typography>

          <form onSubmit={handleBidSubmit}>
            <TextField
              label="Bid Amount"
              variant="outlined"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">Place Bid</Button>
          </form>
        </div>
      ) : (
        <Typography variant="body1">Loading item...</Typography>
      )}
    </div>
  );
};

export default ItemDetail;

