import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './Config/mongoDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/authRoute.js';
import cors from 'cors';
import userRoute from './Routes/userRoute.js';
import courseRouter from './Routes/courseRoute.js';
import paymentRouter from './Routes/paymentRoute.js';
import reviewRouter from './Routes/reviewRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));


app.get('/', (req, res) => {
    res.send('Server is running...')
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRoute);
app.use('/api/course', courseRouter);
app.use('/api/order', paymentRouter);
app.use('/api/review', reviewRouter);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT: http://localhost:${PORT}`);
});