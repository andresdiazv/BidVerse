import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Tab, Tabs, Paper } from '@mui/material';
import { collection , getDocs} from 'firebase/firestore';
import { db,auth } from '../Config/firebase'; 


const UserInformation = ({ uid }) => {
  const [userInfo, setUserInfo] = useState(null);
 

  useEffect(() => {
    const fetchUserInfo = async () => {
    
      try {
        const currentUser = auth.currentUser;
        const userUid = currentUser.uid;

        const querySnapshot = await getDocs(collection(db, 'Users'));
        querySnapshot.forEach((doc) => {
            if (doc.id === userUid){
                setUserInfo(doc.data());
            }
        })

      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [uid]);

  if (userInfo) {
    const { password, firstName, email, address, lastName } = userInfo;
    
    return (
        <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px', borderRadius: '4px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
            User Information
          </Typography>
          <Box sx={{ marginBottom: '8px' }}>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>Password:</span> {password}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>First Name:</span> {firstName}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>Email:</span> {email}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>Address:</span> {address}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>Last Name:</span> {lastName}
            </Typography>
          </Box>
        </Paper>
      </Container>
      );
  }

  return null; // Render nothing if user information is not available yet
};

export default UserInformation;
