const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// grabs static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
