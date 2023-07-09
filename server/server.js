const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const path = require('path');
const { db, auth, admin } = require('./config/firebase')

app.use(cors());

app.use(express.json())


// Register API
app.post('/api/auth/register', async (req, res) => {
  try{
    const newItem= req.body 

    //This create a unique user document in Users collection 
    await admin.firestore().collection('Users').doc(userRecord.uid).set({
      firstName,
      lastName,
      address,
      email,
      password,
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
    const refernceUsers = db.collection('Users') // get users from database
    const snapShot = await refernceUsers.get();

      const users = [];
      snapShot.forEach((doc) => {
      const data = doc.data();
      const email = data.email;
      const firstName = data.firstName;

      users.push({email, firstName});
    })
    

    res.json(users)
  } catch (error) {
    console.error('There has been an erroe getting the users:', error);
    res.status(500).json({ error: 'Failure to get users'});
  }
})

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

// Posting bids API
app.post('/api/bids', async (req, res) => {
  try{
    const { bidAmount } = req.body;
    const acquireUserID = req.user.uid;
    const newBid = {
      bidAmount: bidAmount,
      bidTime: new Date(),
      userID: acquireUserID,
    }

    // For Bid ID
    const bidRef = db.collection('bids');
    const bidDocRef = await bidRef.add(newBid);
    // For item ID
    const itemRef = db.collection('items');
    const itemDocRef = await itemRef.doc().set(newBid);

    // Make the document ID the bid id so that we can reference it later 
    const bidID = bidDocRef.id;
    const itemID = itemDocRef.id;

    await bidDocRef.update({ bidID: bidID}); 

    res.json({ id: bidDocRef.id, data: newBid});
  }catch (error) {
    console.error('Error creating bid:', error);
    res.status(500).json({ error: 'Failed to create bid'})
  }
})
// post the items
app.post('/api/items', async (req, res) => {
  try{
    const newItem = {
      ...req.body,
      
    }
    
    const itemRef = db.collection('items');
    const itemDocRef = await itemRef.add(newItem);
    
    console.log("Item added successfully");
    res.json({ id: itemDocRef.id, data: newItem})
  }catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item'})
  }
})
//get the items 
app.get('/api/items', async (req, res) => {
  try {
    const itemsSnapshot = await db.collection('items').get();
    const items = itemsSnapshot.docs.map((doc) => doc.data());
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});




  app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});