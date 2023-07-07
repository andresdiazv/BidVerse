import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../Config/firebase'; 

const AddItems = () => {
    const [title, setTitle] = useState('');
    const [item, setItem] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [buyoutPrice, setBuyoutPrice] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser; 

    if (currentUser) {
      try {
        const newItem = {
      title,
      item,
      category,
      description,
      buyoutPrice,
      startTime,
      endTime,
      uid: currentUser.uid, 
        };

        const response = await axios.post('http://localhost:5000/api/items', newItem);
        console.log(response.data);

        // Reset the form fields
    setTitle('');
    setItem('');
    setCategory('');
    setDescription('');
    setBuyoutPrice('');
    setStartTime('');
    setEndTime('');

        console.log('Item created successfully');
       
      } catch (error) {
        console.error('Error creating item:', error);
      
      }
    }
  };
  return (
    <div className="item-container">
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="item">Item</label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="buyoutPrice">Buyout Price</label>
          <input
            type="text"
            id="buyoutPrice"
            value={buyoutPrice}
            onChange={(e) => setBuyoutPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="text"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input
            type="text"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};


export default AddItems;


