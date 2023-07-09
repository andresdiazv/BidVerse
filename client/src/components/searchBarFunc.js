import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

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

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredItems.length > 0 && (
        <List>
          {filteredItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={`/items/${item.id}`}
              key={item.id}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ItemList;
