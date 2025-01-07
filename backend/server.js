const express = require('express');
const bodyParser = require('body-parser');
const donorRoutes = require('./routes/donor.route.js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/donors', donorRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
