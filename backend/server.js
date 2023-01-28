const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// routes
const authRoutes = require('./src/route/auth.js');

// mongodb connection
mongoose.connect(`mongodb+srv://uro:uro123@cluster0.oxbb81l.mongodb.net/?retryWrites=true&w=majority`).then(() => {
  console.log('Database connected');
});

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(2000, () => {
  console.log(`Server is running on port 2000`);
});