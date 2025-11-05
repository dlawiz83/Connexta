const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors'); 

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

// Security middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window per IP
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());

// Routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use('/api/contacts', require('./routes/contactsRoutes'));
app.use('/api/interactions', require('./routes/interactionsRoute'));
app.use('/api/next-actions', require('./routes/nextActionRoutes'));

// Error handler
app.use(errorHandler);

// Server listener
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
