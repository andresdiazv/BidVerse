import React, { useState } from 'react';
import { Typography, Container, TextField, FormControl, Button } from '@mui/material';
import { auth } from '../Config/firebase';
import axios from 'axios';

const PaymentOptions = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [aptNumber, setAptNumber] = useState('');

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleAptNumberChange = (event) => {
    setAptNumber(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if(currentUser) {
        try{
            const newPayment = {
                cardNumber,
                expirationDate,
                cvv,
                address,
                zipCode,
                city,
                state,
                aptNumber,
                uid: currentUser.uid,
            }
            const respone = await axios.post('http://localhost:5000/api/newPayment', newPayment)
            console.log(respone.data);

    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setAddress('');
    setZipCode('');
    setCity('');
    setState('');
    setAptNumber('');
        console.log('Card created successfully');
        } catch (error) {
            console.error('Error adding payment method', error);
        }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
        Add A New Payment Option
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          value={cardNumber}
          onChange={handleCardNumberChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          value={expirationDate}
          onChange={handleExpirationDateChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          value={cvv}
          onChange={handleCvvChange}
          sx={{ marginBottom: '1rem' }}
        />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
        Billing information 
      </Typography>
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={handleAddressChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Zip Code"
          variant="outlined"
          fullWidth
          value={zipCode}
          onChange={handleZipCodeChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={handleCityChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          value={state}
          onChange={handleStateChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Apt Number"
          variant="outlined"
          fullWidth
          value={aptNumber}
          onChange={handleAptNumberChange}
          sx={{ marginBottom: '1rem' }}
        />
        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          {/* Add any additional form fields or components as needed */}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Card
        </Button>
      </form>
    </Container>
  );
};

export default PaymentOptions;
