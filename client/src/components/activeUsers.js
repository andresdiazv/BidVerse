import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../Config/firebase';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetchActiveUsers();
    fetchUsers();
  }, []);

  const fetchActiveUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setActiveUsers(response.data);
    } catch (error) {
      console.error('Error fetching active users:', error);
    }
  };

  const fetchUsers = async () => {
    try{
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.map((user) => user.id));
      console.log('Fetched users:', response.data);
    }catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  }

  const handleSendMessage = async () => {
    try {
      const currentUser = auth.currentUser;
      if(currentUser){
      const { uid } = currentUser;
      await axios.post('http://localhost:5000/api/sendMessage', { message, userId: uid, selectedUid: selectedUser });
      setMessage('');
      setSelectedUser('')
      alert('Message sent successfully!');
    }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Active Users</h2>
      {activeUsers.length > 0 ? (
        <ul>
          {activeUsers.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      ) : (
        <p>No active users</p>
      )}
 <div>
        <h3>Send Message</h3>
        <select value={selectedUser} onChange={handleUserSelect}>
          <option value="">Select a user</option>
          {users.map((uid) => (
            <option key={uid} value={uid}>
              {uid}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ActiveUsers;
