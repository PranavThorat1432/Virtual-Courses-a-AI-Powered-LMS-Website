import express from 'express';
import { razorpayOrder, verifyPayment } from '../Controllers/orderController.js';

const paymentRouter = express.Router();

paymentRouter.post('/razorpay-order', razorpayOrder);
paymentRouter.post('/verify-payment', verifyPayment);

export default paymentRouter;