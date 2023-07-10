import React from "react";
import { auth } from "../Config/firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
