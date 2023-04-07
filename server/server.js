const express = require('express');
const connectDB = require('./src/config/dbConnect')
const dotenv = require('dotenv');

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
