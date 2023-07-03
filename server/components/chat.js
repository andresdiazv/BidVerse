import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import SendMessage from './SendMessage';

function ChatComponent() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ 
        user_id: doc.data.user_id, 
        email: doc.data().email }));

        setUsers(usersData);
        console.log('Users:', usersData);
    });
  

    return () => unsubscribe();
  }, []);

  const sendMessage = async (messageText) => {
    if (selectedUser) {
      const { user_id, email } = auth.currentUser;
      const messageRef = collection(db, 'messages');
      try {
        await addDoc(messageRef, {
          text: messageText,
          createdAt: serverTimestamp(),
          senderId: user_id,
          senderDisplayName: email,
          recipientId: selectedUser.user_id,
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id} onClick={() => setSelectedUser(user)}>
            {user.email}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>Selected User: {selectedUser.email}</h2>
          <SendMessage selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
