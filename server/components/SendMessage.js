import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

function SendMessage({ selectedUser }) {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') {
      return; // Don't send empty messages
    }

    const { uid, displayName } = auth.currentUser;
    const messageRef = collection(db, 'messages');

    try {
      await addDoc(messageRef, {
        text: message,
        createdAt: serverTimestamp(),
        senderId: uid,
        senderDisplayName: displayName,
        recipientId: selectedUser.id,
      });

      setMessage(''); // Clear the message input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input
        placeholder="Message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default SendMessage;
