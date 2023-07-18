import React, { useState } from "react";
import axios from "axios";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Container, Typography, TextField, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bidverse.png";

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      navigate("/home");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleResetPassword = async (email) => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent to:", email);
    } catch (error) {
      console.error("Error sendint password reset email:", error);
    }
  };

  const handleResetClick = () => {
    handleResetPassword(email);
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  const logoStyle = {
    height: "100px",
    marginBottom: "0rem",
    marginTop: "1rem",
    width: "auto",
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <div style={logoContainerStyle}>
        <Link component={RouterLink} to="/" underline="none">
          <img src={logo} alt="logo" style={logoStyle} />
        </Link>
      </div>
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
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Typography>
        )}
      </form>
      <Button
        variant="contained"
        onClick={handleGoogleLogin}
        fullWidth
        style={{ marginTop: "2rem" }}
      >
        Login with Google
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link component={RouterLink} to="/register" underline="hover">
          Register
        </Link>
      </Typography>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Forgot password?{" "}
        <Link component={RouterLink} to="/resetPassword" underline="hover">
          Reset Password
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
