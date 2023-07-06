import axios from 'axios';
import React, { useState } from 'react';
import { auth } from './Config/firebase';

const handleSubmit = async (e) => {
  e.preventDefault();

  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      const newItem = {
        buyoutPrice,
        category,
        description,
        endTime,
        title,
        uid: currentUser.uid,
      };

      const response = await axios.post('http://localhost:5000/api/items', newItem);
      console.log(response.data);

      setBuyoutPrice('');
      setCategory('');
      setDescription('');
      setEndTime('');
      setTitle('');

      console.log('Item created successfully');
    
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }
};
