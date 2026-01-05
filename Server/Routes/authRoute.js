import express from 'express';
import { googleAuth, resetPassword, sendOTP, signIn, signOut, signUp, verifyOTP } from '../Controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/signout', signOut);
authRouter.post('/send-otp', sendOTP);
authRouter.post('/verify-otp', verifyOTP);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/google-auth', googleAuth);

export default authRouter;