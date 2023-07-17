import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsData = [];
        for (const doc of querySnapshot.docs) {
          const item = doc.data();
          itemsData.push({
            id: doc.id,
            ...item,
          })
        }
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== '') {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const handleItemClick = (item) => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        size="large"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredItems.length > 0 && (
        <List>
          {filteredItems.map((item) => (
            <ListItem
              key={item.id} onClick={() => handleItemClick(item)} button>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ItemList;
