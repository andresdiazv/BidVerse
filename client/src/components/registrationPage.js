import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Link} from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/bidverse.png";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !address) {
      setErrorMessage('Please fill out all the fields');
      return;
    }

    const auth = getAuth();

    try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);

     console.log('User registered:', userCredential.user);
     const currentUser = auth.currentUser
     const userData = {
      email : currentUser.email,
      firstName,
      lastName,
      address
     }
     navigate('/')
     await setDoc(doc(db, 'Users', userCredential.user.uid), userData);
      } catch (error) {
      console.error('Error registering:', error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const { email, displayName } = user;
      const [firstName, lastName] = displayName.split(' ');
  
      try {
      
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          email,
          firstName,
          lastName,
        });
        navigate('/')
        console.log(response.data);
      } catch (error) {
        console.error('Error logging in with Google:', error);
        
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  
  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  const logoStyle = {
    height: "300px",
    marginBottom: "-4rem",
    marginTop: "-2rem",
    width: "auto",
  };

  return (
    <Container maxWidth="sm">
      <div style={logoContainerStyle}>
        <Link component={RouterLink} to="/home" underline="none">
          <img src={logo} alt="logo" style={logoStyle} />
        </Link>
      </div>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: '1rem', color: 'Dark-Brown' }}>
        Registration
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
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Typography>
        )}
        <Button variant="contained" onClick={handleRegister}  fullWidth style={{ marginTop: '2rem' }}>
          Register
        </Button>
        <Button variant="contained" onClick={handleGoogleLogin} fullWidth style={{ marginTop: '2rem' }}>
          Register with Google
        </Button>
        <Button variant="contained" onClick={() => navigate('/')} fullWidth style={{ marginTop: '2rem' }}>
          Return To Login Page 
        </Button>

      </form>
    </Container>
  );
};

export default RegisterPage;
