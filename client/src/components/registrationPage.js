import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, auth, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        firstName,
        lastName,
        address,
      });
    
      console.log(response.data); 
    } catch (error) {
      console.error('Error registering:', error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth, provider);
      const user = result.user;
      
      const { email, displayName } = user;
      const [firstName, lastName] = displayName.split(' ');
  
      try {
      
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          email,
          firstName,
          lastName,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error logging in with Google:', error);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Register 
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit" fullWidth>
          Register
        </Button>
        <Button variant="contained" onClick={handleGoogleLogin} fullWidth style={{ marginTop: '2rem' }}>
  Register with Google
</Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
