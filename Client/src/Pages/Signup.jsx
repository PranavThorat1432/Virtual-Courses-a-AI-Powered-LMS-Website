import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../App';
import { toast } from 'react-toastify';
import { MoonLoader } from "react-spinners";
import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [loading, setLoading] = useState(false); 

    const handleSignup = async () => {
        setLoading(true);

        try {
            const result = await axios.post(`${serverURL}/api/auth/signup`, {name, email, password, role}, {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
            setLoading(false);
            navigate('/');
            toast.success('Signup Successful'); 

        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const [googleLoading, setGoogleLoading] = useState(false);

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            let user = response.user;
            let gName = user.displayName;
            let gEmail = user.email;

            const result = await axios.post(`${serverURL}/api/auth/google-auth`, {name: gName, email: gEmail, role}, {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
            navigate('/');
            toast.success('Signup Successful');
            setGoogleLoading(false);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setGoogleLoading(false);
        }
    };


  return (
    <div className='bg-[#dddbdb] w-screen h-screen flex items-center justify-center gap-3'>
        <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex' onSubmit={(e) => e.preventDefault()}>
            {/* Left Side */}
            <div className='md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-semibold text-black text-2xl '>Let's Get Started</h1>
                    <h2 className='text-[#999797] text-[18px] '>Create Your Account!</h2>
                </div>

                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <input id='name' type="text" placeholder='Enter Your Name' className='border w-full h-8.75 border-[#e7e6e6] text-[15px] px-5 outline-0' onChange={(e) => setName(e.target.value)} value={name}/>

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

                <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                    <span className={`px-2.5 py-1.25 border border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role == 'Student' ? 'border-black' : 'border-[#646464]'}`} onClick={() => setRole('Student')}>Student</span>
                    <span className={`px-2.5 py-1.25 border border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role == 'Educator' ? 'border-black' : 'border-[#646464]'}`} onClick={() => setRole('Educator')}>Educator</span>
                </div>

                <button className='w-[80%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] gap-3' disabled={loading}  onClick={handleSignup}>
                    {loading ? (
                        <>
                            <MoonLoader size={20} color="#ffffff" />
                            <span>Signing up...</span>
                        </>
                    ) : 'SignUp'}
                </button>

                <div className='w-[80%] flex items-center gap-2 justify-center'>
                    <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    <div className='text-[#6f6f6f] w-[50%] text-[15px] flex items-center justify-center'>or continue with</div>
                    <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                </div>

                <button className='w-[80%] h-10 border border-black rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleSignup} disabled={googleLoading}>
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

                <p>Already have an account? <span className='cursor-pointer text-blue-500 hover:text-blue-600' onClick={() => navigate('/signin')}>SignIn</span></p>
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

export default Signup;
