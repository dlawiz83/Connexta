const express = require('express');
const dotenv = require('dotenv').config();

const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db');
const PORT = 5000;


connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use('/api/contacts' , require('./routes/contactsRoutes'));
app.use('/api/interactions', require('./routes/interactionsRoute'));
app.use('/api/next-actions', require('./routes/nextActionRoutes'));
app.use("/api/pipeline", require("./routes/pipelineRoutes"));
app.use(errorHandler)
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});