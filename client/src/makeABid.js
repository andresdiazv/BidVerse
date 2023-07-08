import React, { useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { auth } from './Config/firebase';
import { FormControl, InputLabel, Select, MenuItem, Button, Container, TextField, Box, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';


const MakeABid = () => {
    const [bidAmount, setBidAmount] = useState('');


const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if(currentUser){
        try{
            const newBid = {
                bidAmount,
                uid:currentUser.uid
            }
            const respone = await axios.post('http://localhost:5000/api/bids/', newBid);
            console.log(respone.data);

            setBidAmount('');
            console.log('Item created successfully')
        }catch (error) {
            console.error('Error creating item', error);
        }
    }
}
    return (
        <Container maxWidth="sm">
          <Box mt={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
              Bid Amount 
            </Typography>
          </Box>
          <Box mt={4}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Bid Amount"
                variant="outlined"
                fullWidth
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              /> 
              <Box mt={4} textAlign="center">
            <Button variant="contained" type="submit">
                Post Bid
            </Button>
          </Box>
            </form>
          </Box>
        </Container>
      );
    
}

export default MakeABid;
// i need to create it so that when the bid posts it post to the specific item