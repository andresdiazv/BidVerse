import React, { useState } from 'react';
import { Box, Typography, Container, Tab, Tabs, Paper } from '@mui/material';
import { auth } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';
import UserInformation from './userInformation';
import PaymentOptions from './paymentOptions';



const Account = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/userInformation');
    }
    if (newValue == 1) {
      navigate('/paymentOptions');
    }
    setValue(newValue);
    if (newValue === 2) {
      navigate('/orders');
    }
    if (newValue == 3) {
      navigate('/currentBids');
    }
    setValue(newValue);
    if (newValue === 4) {
      navigate('/help');
    }
    if (newValue == 5) {
      navigate('/privacy');
    }
  };
  const currentUser = auth.currentUser; 
  if(currentUser){ 
    const name = currentUser.email
  return (
    <Container maxWidth="md" sx={{ display: 'flex', padding: '3rem' }}>
      <Box sx={{ marginRight: '2rem' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
         {name}
      </Typography>
        <Paper elevation={3} sx={{ marginTop: '2rem' }}>
          <Tabs
            value={0}
            onChange={handleTabChange}
            orientation="vertical" // Set orientation to vertical
          >
            <Tab label="User Information" />
            <Tab label="Payment Options" />
            <Tab label="Orders" />
            <Tab label="Current Bids" />
            <Tab label="Help" />
            <Tab label="Notifications" />
            <Tab label="Subscriptions" />
            <Tab label="Favorites" />
            <Tab label="WishList" />
            <Tab label="Settings" />
            <Tab label="Help" />
            <Tab label="Privacy" />
            <Tab label="Security" />
            
          </Tabs>
        </Paper>
      </Box>
      <Box>
      {value === 0 && <UserInformation />}
      {value === 1 && <PaymentOptions />}
      </Box>
    </Container>
  );
};
}
export default Account;
