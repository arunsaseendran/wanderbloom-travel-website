import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import wishlistRoute from "./routes/wishlist.js";
import filterRoute from './routes/filter.js';
import paymentRoute from './routes/payment.js';
import bookingRequestsRoute from './routes/bookingRequests.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS setup
const corsOptions = {
    origin: process.env.CORS_ORIGIN || true,
    credentials: true
};

// Database connection
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected ');
    } catch (err) {
        console.error('MongoDB connection failed ', err);
        process.exit(1);
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/filter', filterRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/booking-requests', bookingRequestsRoute);

// Health check route (useful for Render)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Start server
app.listen(port, "0.0.0.0", () => {
    connect();
    console.log(` Server running on port ${port}`);
});
