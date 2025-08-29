const express = require('express');
const dotenv = require('dotenv').config();

const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');

const PORT = 5000;



connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window per IP
  message: "Too many requests from this IP, please try again later"
});

app.use(limiter);
app.use(mongoSanitize()); // removes $ and . from inputs
app.use(xss());           // prevents script injection in text fields
app.use(helmet());

//Routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use('/api/contacts' , require('./routes/contactsRoutes'));
app.use('/api/interactions', require('./routes/interactionsRoute'));
app.use('/api/next-actions', require('./routes/nextActionRoutes'));
app.use("/api/pipeline", require("./routes/pipelineRoutes"));
app.use(errorHandler)

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});