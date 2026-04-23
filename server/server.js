const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
// app.options('/:path*', cors());

// Body parser
app.use(express.json());
app.use(cookieParser());

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// app.use(mongoSanitize());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Saira Ornaments API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
