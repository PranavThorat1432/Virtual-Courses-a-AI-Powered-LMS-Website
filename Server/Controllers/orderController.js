import dotenv from 'dotenv';
dotenv.config();
import Razorpay from 'razorpay';
import Course from '../Models/CourseModel.js';
import User from '../Models/UserModel.js';


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const razorpayOrder = async (req, res) => {
    try {
        const {courseId} = req.body;
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        const options = {
            amount: course?.price * 100,
            currency: 'INR',
            receipt: course._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(201).json(order);

    } catch (error) {
        return res.status(500).json({
            message: `Razorpay Order Error: ${error}`
        });
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const {courseId, userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid') {
            const user = await User.findById(userId);
            if(!user?.enrolledCourses?.includes(courseId)) {
                await user?.enrolledCourses?.push(courseId);
                await user?.save();
            }

            const course = await Course.findById(courseId).populate('lectures');
            if(!course?.enrolledStudents?.includes(userId)) {
                await course?.enrolledStudents?.push(userId);
                await course?.save();
            }
            return res.status(200).json({
                message: 'Payment Verified, and Enrolled Successfully!'
            });

        } else {
            return res.status(400).json({
                message: 'Payment Failed!'
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: `Verify Payment Error: ${error}`
        });
    }
};