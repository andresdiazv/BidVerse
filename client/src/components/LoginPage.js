import React, { useState } from 'react';
import axios from 'axios';
import { auth, signInWithEmailAndPassword } from '../Config/firebase';
import { getAuth } from 'firebase/auth';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
    
        await signInWithEmailAndPassword(auth, email,password);
    
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
        navigate('/home');
        console.log(response.data); // Handle the response as needed (e.g., store token, navigate to another page)
      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid email or password');
      }
    };
    const logoContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
    };
      const logoStyle = {
    width: '80px',
    height: '80px',
    marginRight: '1rem',
    borderRadius: '50%',
    backgroundColor: '#3f51b5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '40px',
    fontWeight: 600,
  };
  
   
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <div style={logoContainerStyle}>
        <div style={logoStyle}>B</div>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
         
        </Typography>
        </div>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Login Page
        </Typography>
        <form onSubmit={handleLogin}>
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
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to='/register' underline="hover">
          Register
        </Link>
      </Typography>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Forgot password?{' '}
        <Link href="/Reset Password" underline="hover">
          Reset Password
        </Link>
      </Typography>
      </Container>
    );
  };
  
  export default LoginPage;
  