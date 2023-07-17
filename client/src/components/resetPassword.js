import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Config/firebase';
import logo from "../assets/bidverse.png";
import { Link as RouterLink } from "react-router-dom";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
      // Display a success message to the user or redirect to a success page
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Display an error message to the user
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ width: '300px', mb: 4 }}>
      <div style={logoContainerStyle}>
        <Link component={RouterLink} to="/" underline="none">
          <img src={logo} alt="logo" style={logoStyle} />
        </Link>
      </div>
        {isEmailSent ? (
          <Typography variant="body1" align="center" mb={2}>
            Password reset email sent. Please check your inbox.
          </Typography>
        ) : null}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          size="small"
        />
        <Button variant="contained" onClick={handleResetPassword} fullWidth>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};


  export default ResetPasswordForm;