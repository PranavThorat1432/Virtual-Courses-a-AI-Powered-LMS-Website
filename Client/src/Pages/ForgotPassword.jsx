import axios from 'axios';
import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [step, setStep] = useState(1);
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    // For Step - 1
    const sendOTP = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverURL}/api/auth/send-otp`, {email}, {
                withCredentials: true
            });
            console.log(result.data);
            setLoading(false);
            setStep(2);
            toast.success('OTP Sent Successfully');

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    // For Step - 2
    const verifyOTP = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverURL}/api/auth/verify-otp`, {email, otp}, {
                withCredentials: true
            });
            console.log(result.data);
            setLoading(false);
            setStep(3);
            toast.success('OTP Verified Successfully');

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    // For Step - 3
    const resetPassword = async () => {
        setLoading(true);
        try {
            if(newPassword !== confirmPassword) {
                setLoading(false);
                return toast.error('Password does not match');
            }

            const result = await axios.post(`${serverURL}/api/auth/reset-password`, {email, password: newPassword}, {
                withCredentials: true
            });
            console.log(result.data);
            setLoading(false);
            navigate('/signin');
            toast.success('Password Reset Successfully');

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        {/* Step - 1 */}
        {step === 1 && 
            <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                    Forgot Your Password
                </h2>

                <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input id='email' type="email" placeholder='your@example.com' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black' required onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>

                    <button className='w-full bg-black text-white hover:bg-[#4b4b4b] py-2 px-4 rounded-md font-medium cursor-pointer gap-3 flex items-center justify-center ' disabled={loading} onClick={sendOTP}>
                    {loading ? (
                        <>
                            <MoonLoader size={20} color="#ffffff" />
                            <span>Sending OTP...</span>
                        </>
                        ) : 'Send OTP'}
                    </button>
                </form>

                <div className='text-sm text-center mt-4 cursor-pointer hover:text-[#4b4b4b]' onClick={() => navigate('/signin')}>
                    Back to SignIn
                </div>
            </div>
        }
        
        {/* Step - 2 */}
        {step === 2 && 
            <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                    Enter OTP
                </h2>

                <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>Please enter the 4-digit OTP send to your email</label>
                        <input id='otp' type="text" placeholder='* * * *' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black' required onChange={(e) => setOTP(e.target.value)} value={otp}/>
                    </div>

                    <button className='w-full bg-black text-white hover:bg-[#4b4b4b] py-2 px-4 rounded-md font-medium cursor-pointer gap-3 flex items-center justify-center' disabled={loading}  onClick={verifyOTP}>
                    {loading ? (
                        <>
                            <MoonLoader size={20} color="#ffffff" />
                            <span>Verifying OTP...</span>
                        </>
                        ) : 'Verify OTP'}
                    </button>
                </form>

                <div className='text-sm text-center mt-4 cursor-pointer hover:text-[#4b4b4b]' onClick={() => navigate('/signin')}>
                    Back to SignIn
                </div>
            </div>
        }
        {/* Step - 3 */}
        {step === 3 && 
            <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                    Reset Password
                </h2>

                <p className='text-sm text-gray-500 text-center mb-6'>
                    Enter a new password below to regain access to your account
                </p>

                <form className='space-y-4'>
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>New Password</label>
                        <div className='relative w-full'>
                            <input 
                                id='password' 
                                type={showPass ? 'text' : 'password'} 
                                placeholder='* * * * * * * * *' 
                                className='border w-full h-8.75 border-[#e7e6e6] text-[15px] px-5 pr-10 outline-0' 
                                required
                                onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
                            />
                            <div 
                                onClick={() => setShowPass(!showPass)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            >
                                {showPass ? <IoMdEyeOff className='w-5 h-5 text-gray-500' /> : <IoMdEye className='w-5 h-5 text-gray-500' />}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password1" className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <div className='relative w-full'>
                            <input 
                                id='password' 
                                type={showPass ? 'text' : 'password'} 
                                placeholder='* * * * * * * * *' 
                                className='border w-full h-8.75 border-[#e7e6e6] text-[15px] px-5 pr-10 outline-0' 
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                            />
                            <div 
                                onClick={() => setShowPass(!showPass)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            >
                                {showPass ? <IoMdEyeOff className='w-5 h-5 text-gray-500' /> : <IoMdEye className='w-5 h-5 text-gray-500' />}
                            </div>
                        </div>
                    </div>

                    <button className='w-full bg-black text-white hover:bg-[#4b4b4b] py-2 px-4 rounded-md font-medium cursor-pointer gap-3 flex items-center justify-center' disabled={loading}  onClick={resetPassword}>
                    {loading ? (
                        <>
                            <MoonLoader size={20} color="#ffffff" />
                            <span>Reseting Password...</span>
                        </>
                        ) : 'Reset Password'}
                    </button>
                </form>

                <div className='text-sm text-center mt-4 cursor-pointer hover:text-[#4b4b4b]' onClick={() => navigate('/signin')}>
                    Back to SignIn
                </div>
            </div>
        }

    </div>
  )
}

export default ForgotPassword
