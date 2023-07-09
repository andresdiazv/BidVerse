import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { db } from '../Config/firebase';
import { collection , getDocs } from 'firebase/firestore';

const UserInformation = ({ uid }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        })

      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (userInfo) {
    const { firstName, lastName, email } = userInfo;

    return (
      <div>
        <Typography variant="h6" gutterBottom>
          User Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          First Name: {firstName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Name: {lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {email}
        </Typography>
      </div>
    );
  }

  return null; // Render nothing if user information is not available yet
};

export default UserInformation;
