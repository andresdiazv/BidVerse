const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const path = require('path');
const { db, auth, admin } = require('./config/firebase');
const { firestore } = require("firebase-admin");

app.use(cors());

app.use(express.json())


// Register API
app.post('/api/auth/register', async (req, res) => {
  try{
    const { email, password, firstName, lastName, address } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    })
    //This create a unique user document in Users collection 
    await admin.firestore().collection('Users').doc(userRecord.uid).set({
      email,
      password,
      firstName,
      lastName,
      address
    })
    

    res.status(200).send(userRecord);
  }catch (error) {
    res.status(400).send(error.message);
  }

})

// Login API
app.post('/api/auth/login' , async (req, res ) => {
  try{
    const { email, password } = req.body;
    
    //Get the user info from firestore collection to see if login exists
    const userRef = db.collection('Users');
    const querySnapshot = await userRef.where('email', '==', email).get();

    if(querySnapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = querySnapshot.docs[0];

    if (userDoc.data().password !== password){
      throw new Error('Invalid password')
    }

    res.status(200).send('Sucessful login')
  }catch (error) {
    res.status(400).send(error.message);
  }
})

// Logout API / STILL NEEDS WORK
app.post('/api/auth/logout', async (req, res) => {
  try {
    const { idToken } = req.body
    //Verify the id token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    //Revoking the token id logs user out
    await admin.auth().revokeRefreshTokens(decodedToken.uid);

    res.status(200).send('Logged out successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get users API
app.get('/api/users', async (req, res) => {
  try {
    const usersRef = db.collection('Users');
    const snapshot = await usersRef.get();

    const users = [];
    snapshot.forEach((doc) => {
      const user = {
        id: doc.id,
        ...doc.data()
      };
      users.push(user);
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
// Posting user info API // this is another way to do it
app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, address, username } = req.body; 

    // check to see if that user already exists
    const users1Ref = db.collection('Users');
    const querySnapshot = await users1Ref.where('email', '==', email).get();
    const usernameSnapshot = await users1Ref.where('username', '==', username).get();
    if (!querySnapshot.empty) {
      return res.status(400).json({ error: 'User with the same email already exists' });
    }
    if (!usernameSnapshot.empty) {
      return res.status(400).json({ error: 'User with the same username already exists' });
    }
    
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      username: username
    };

    // Add the new user to the Firestore collection
    const usersRef = db.collection('Users');
    await usersRef.doc(username).set(newUser);

    res.json({ id: username, data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// get a specific item details
app.get('/api/items/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemRef = admin.firestore().collection('items').doc(itemId);
    const itemDoc = await itemRef.get();
    
    if (!itemDoc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const item = itemDoc.data();
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// posting a bid to the database
app.post('/api/bids', async (req, res) => {
  try{
    const newBid = req.body;

    const bidRef = db.collection('bids');
    const docRef = await bidRef.add(newBid);
    const newBidWithId = { ...newBid, id: docRef.id};

    res.json(newBidWithId);
  } catch (error){
    console.error('Error creating item: ', error);
    res.status(500).json({ error: 'Failed to create the bid'})
  }
})

// Post the items into the database
app.post('/api/items', async (req, res) => {
  try {
    const newItem = req.body;

    const itemsRef = db.collection('items');
    const docRef = await itemsRef.add(newItem);
    const newItemWithId = { ...newItem, id: docRef.id };

    res.json(newItemWithId);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});
// Get the Items
app.get('/api/items', async (req, res) => {
  try {
    const itemsRef = db.collection('items');
    const snapshot = await itemsRef.get();

    const items = [];
    snapshot.forEach((doc) => {
      const item = {
        id: doc.id,
        ...doc.data()
      };
      items.push(item);
    });

    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

//Sending Messages
app.post('/api/sendMessage', async (req, res) => {
    try {
      const newMessage = req.body;

      const messageRef = db.collection('messages');
      const docRef = await messageRef.add(newMessage);
      const newMessageWithId = { ...newMessage, id:docRef.id};
  
      res.json(newMessageWithId);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});