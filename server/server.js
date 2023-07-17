const express = require("express");
const multer = require('multer');
const port = 5000;
const cors = require('cors');
const path = require('path');
const { db, auth, admin } = require('./config/firebase')

const upload = multer({ dest: 'uploads' });
 

const app = express();
app.use(cors());
app.use(express.json())


// Register API
app.post('/api/auth/register', async (req, res) => {
  try{
    const newUser = {
      ...req.body,
      
    }
    
    const userRef = db.collection('Users');
    const userDocRef = await userRef.add(newUser);
    
    console.log("Item added successfully");
    res.json({ id: userDocRef.id, data: newUser})
  }catch (error) {
    res.status(400).send(error.message);
  }

})

//payment API
app.post('/api/newPayment', async (req, res) => {
  try{
    const newPayment = {
      ...req.body,
      
    }
    
    const paymentRef = db.collection('payments');
    const paymentDocRef = await paymentRef.add(newPayment);
    
    console.log("Item added successfully");
    res.json({ id: paymentDocRef.id, data: newPayment})
  }catch (error) {
    res.status(400).send(error.message);
  }

})

// Login API
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Authenticate the user with the provided email and password
  // Perform the necessary checks and validations

  User = auth.User;

  // Example: Check if the user exists and the password matches
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.verifyPassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token or session for authentication and authorization
    // Return the token or session to the client for subsequent requests

    // Example: Generate and return a JWT token
    const token = generateToken(user);

    res.status(200).json({ token });
  });
});

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
app.get('/api/users/{uid}', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('Users').get();
    const user = usersSnapshot.docs.map((doc) => doc.data());
    res.json(user);
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

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Handle the uploaded image
    const imagePath = req.file.path;

    // Upload the image file to Firebase Storage
    const fileRef = ref(storage, `uploads/${req.file.filename}`);
    const fileSnapshot = await uploadBytes(fileRef, req.file.buffer);

    // Get the public download URL of the uploaded image
    const imageUrl = await fileSnapshot.ref.getDownloadURL();

    // Store the image URL in the Firebase Firestore collection
    const uploadData = {
      imageUrl,
      createdAt: new Date(),
    };

    const uploadDocRef = await addDoc(collection(db, 'uploads'), uploadData);

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

  app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});