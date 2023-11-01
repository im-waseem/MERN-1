const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Mongoose connected');
});

const express = require('express');
const app = express();
const router = require('./routes/router');
const cors = require('cors');
const port = process.env.PORT || 8008;
const cookieParser = require('cookie-parser');

app.get('/', (req, res) => {
  res.status(201).json('Server created');
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server started at port no: ${port}`);
});
