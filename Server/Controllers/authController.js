import User from "../Models/UserModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import genToken from "../Config/token.js";
import sendMail from "../Config/mail.js";
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists!'
            });
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Enter valid Email'
            });
        }

        if(password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        let token = await genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(201).json({
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: `SignUp Error: ${error}`
        });
    }
};


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: 'User not found!'
            });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: 'Incorrect Password!'
            });
        }

        let token = await genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: `SignIn Error: ${error}`
        });
    }
};


export const signOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({message: 'Signout successfully!'});

    } catch (error) {
        return res.status(500).json({
            message: `Signout Error: ${error}`
        });
    }
};


export const sendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString(); 

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        
        await user.save();
        await sendMail(email, otp);

        return res.status(200).json({
            message: 'OTP sent successfully!'
        });

    } catch (error) {
        return res.status(500).json({
            message: `Send-OTP Error: ${error}`
        });
    }
};


export const verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body;
        const user = await User.findOne({email});
        if(!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(404).json({
                message: 'Invalid OTP!'
            });
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        
        await user.save();

        return res.status(200).json({
            message: 'OTP Verified Successfully!'
        });

    } catch (error) {
        return res.status(500).json({
            message: `Verify-OTP Error: ${error}`
        });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !user.isOtpVerified) {
            return res.status(404).json({
                message: 'OTP Verification is required!'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        user.isOtpVerified = false;

        await user.save();

        return res.status(200).json({
            message: 'Reset Password Successfully!'
        });

    } catch (error) {
        return res.status(500).json({
            message: `Reset-Password Error: ${error}`
        });
    }
};


export const googleAuth = async (req, res) => {
    try {
        const { name, email, role = '' } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        let user = await User.findOne({ email });
        
        if (!user) {
            try {
                user = await User.create({
                    name,
                    email,
                    role,
                    isGoogleAuth: true
                });
            } catch (createError) {
                console.error('Error creating user:', createError);
                return res.status(500).json({
                    success: false,
                    message: 'Error creating user account',
                    error: createError.message
                });
            }
        }

        const token = await genToken(user._id);
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isGoogleAuth: true
            }
        });

    } catch (error) {
        console.error('Google Auth Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during Google authentication',
            error: error.message
        });
    }
};