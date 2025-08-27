const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db');



connectDB();
const app = express();
app.use(errorHandler)
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});