import React from 'react';
import { auth } from '../Config/firebase'; // Import the Firebase auth instance

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log('Logged out successfully'); // Log a success message
      // Perform any additional actions after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors that occur during logout
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
