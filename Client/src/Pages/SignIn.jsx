import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { serverURL } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);

        try {
            const result = await axios.post(`${serverURL}/api/auth/signin`, {email, password}, {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
            setLoading(false);
            navigate('/');
            toast.success('SignIn Successful');

        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };


    const [googleLoading, setGoogleLoading] = useState(false);

    const googleSignin = async () => {
        try {
            setLoading(true);
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const email = user.email;
            const role = '';
        
            const result = await axios.post(
                `${serverURL}/api/auth/google-auth`, 
                { name, email, role }, 
                { withCredentials: true }
            );
            
            if (result.data.user) {
                dispatch(setUserData(result.data.user));
                navigate('/');
                setLoading(false);
                toast.success('Sign in successful!');

            } else {
                throw new Error('Invalid response from server');
                setLoading(false);
                toast.error('Failed to sign in with Google');
            }
        
        } catch (error) {
            console.error('Google sign-in error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                toast.error('Sign in was cancelled');
            } else {
                const errorMessage = error.response?.data?.message || 'Failed to sign in with Google';
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };


    
  return (
    <div className='bg-[#dddbdb] w-screen h-screen flex items-center justify-center gap-3'>
        <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'>
            {/* Left Side */}
            <div className='md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-col items-center justify-center mb-5'>
                    <h1 className='font-semibold text-black text-2xl '>Welcome Back!</h1>
                    <h2 className='text-[#999797] text-[18px] '>Login to Your Account!</h2>
                </div>
    
                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 mb-5'>
    
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input id='email' type="email" placeholder='Enter Your Email' className='border w-full h-8.75 border-[#e7e6e6] text-[15px] px-5 outline-0' onChange={(e) => setEmail(e.target.value)} value={email}/>
    
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <div className='relative w-full'>
                        <input 
                            id='password' 
                            type={showPass ? 'text' : 'password'} 
                            placeholder='Password' 
                            className='border w-full h-8.75 border-[#e7e6e6] text-[15px] px-5 pr-10 outline-0' 
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                        <div 
                            onClick={() => setShowPass(!showPass)}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                        >
                            {showPass ? <IoMdEyeOff className='w-5 h-5 text-gray-500' /> : <IoMdEye className='w-5 h-5 text-gray-500' />}
                        </div>
                    </div>
    
                </div>
    
    
                <div className='w-[80%]'>
                    <button className='w-full h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] gap-3' disabled={loading}  onClick={handleSignIn}>
                    {loading ? (
                        <>
                            <MoonLoader size={20} color="#ffffff" />
                            <span>Signing in...</span>
                        </>
                        ) : 'SignIn'}
                    </button>
                    <div className='w-full text-right pr-1' onClick={() => navigate('/forgot-password')}>
                        <span className='text-[13px] cursor-pointer text-[#585757] hover:underline' >Forgot Password?</span>
                    </div>
                </div> 
    
                <div className='w-[80%] flex items-center gap-2 justify-center'>
                    <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    <div className='text-[#6f6f6f] w-[50%] text-[15px] flex items-center justify-center'>or continue with</div>
                    <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                </div>
    
                <button 
                    className='w-[80%] h-10 border border-black rounded-[5px] flex items-center justify-center cursor-pointer'
                    onClick={googleSignin}
                    disabled={googleLoading}
                >
                    {googleLoading ? (
                        <MoonLoader size={20} color="#000000" />
                    ) : (
                        <>
                            <FcGoogle className='text-[30px]'/>

                            <span className='text-[18px] text-gray-500 flex items-center'>
                                <p className='text-red-500'>o</p>
                                <p className='text-yellow-500'>o</p>
                                <p className='text-blue-500'>g</p>
                                <p className='text-green-600'>l</p>
                                <p className='text-red-500'>e</p>
                            </span>
                        </>
                    )}
                </button>

                <p>Don't have an account? <span className='cursor-pointer text-blue-500 hover:text-blue-600' onClick={() => navigate('/signup')}>SignUp</span></p>
            </div>
    
            {/* Right Side */}
            <div className='w-[50%] h-full rounded-r-2xl md:flex flex-col hidden items-center justify-center bg-black'>
                <img src={logo} alt="logo" className='w-30 shadow-2xl'/>
                <span className='text-white text-2xl'>VIRTUAL COURSES</span>
            </div>
        </form>
    </div>
  )
}

export default SignIn
