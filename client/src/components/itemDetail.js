import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Container, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Category: {item.category}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">{item.description}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2">
            <strong>Buyout Price:</strong> ${item.buyoutPrice}
          </Typography>
          <Typography variant="body2">
            <strong>Start Time:</strong> {item.startTime}
          </Typography>
          <Typography variant="body2">
            <strong>End Time:</strong> {item.endTime}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ItemDetail;
