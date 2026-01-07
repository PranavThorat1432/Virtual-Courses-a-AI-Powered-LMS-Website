import express from 'express';
import { getCurrentUser, updateProfile } from '../Controllers/userController.js';
import isAuth from '../Middlewares/isAuth.js';
import upload from '../Middlewares/multer.js';


const userRoute = express.Router();

userRoute.get('/get-current', isAuth, getCurrentUser);
userRoute.post('/update-profile', isAuth, upload.single('photoUrl'), updateProfile);

export default userRoute;