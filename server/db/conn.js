require('dotenv').config(); // Load environment variables from .env

const mongoose = require("mongoose");

const DB = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.error(err);
});
