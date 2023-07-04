const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const { db } = require('./config/firebase')


app.use(express.json())


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
app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, address } = req.body; 

    // check to see if that user already exists
    const users1Ref = db.collection('Users');
    const querySnapshot = await users1Ref.where('email', '==', email).get();
    if (!querySnapshot.empty) {
      return res.status(400).json({ error: 'User with the same email already exists' });
    }
    
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address
    };

    // Add the new user to the Firestore collection
    const usersRef = db.collection('Users');
    const docRef = await usersRef.add(newUser);

    res.json({ id: docRef.id, data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


  app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});