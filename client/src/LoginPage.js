import React, { useState } from 'react';
import axios from 'axios';
import { auth, signInWithEmailAndPassword } from './Config/firebase';
import { getAuth } from 'firebase/auth';

const LoginPage = () => {
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
        console.log(response.data); // Handle the response as needed (e.g., store token, navigate to another page)
      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid email or password');
      }
    };
  
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default LoginPage;
  