import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

connectDB();

// CORS setup for both localhost and production
const allowedOrigins = ['http://localhost:5173', 'http://your-production-url.com','https://medvision-vxqw.onrender.com/login'];
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes setup
app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/payment', paymentRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
