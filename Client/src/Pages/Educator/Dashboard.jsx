import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';


const Dashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const { creatorCourseData } = useSelector((state) => state.course);
    const firstLetter = userData?.user?.name?.charAt(0)?.toUpperCase() || '';

    const navigate = useNavigate();

    const courseProgressData = creatorCourseData?.map((course) => ({
        name: course?.title?.slice(0, 10) + '...',
        lectures: course?.lectures?.length || 0
        
    })) || [];

    const enrollData = creatorCourseData?.map((course) => ({
        name: course?.title?.slice(0, 10) + '...',
        enrolled: course?.enrolledStudents?.length || 0

    })) || [];


    const totalEarning = creatorCourseData?.reduce((sum, course) => {
        const studentCount = course?.enrolledStudents?.length || 0;
        const courseRevenue = course?.price ? course?.price * studentCount : 0;

        return sum + courseRevenue;
    }, 0) || 0;

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <IoIosArrowRoundBack className='w-8 h-8 absolute top-[10%] left-[10%] cursor-pointer ' onClick={() => navigate('/')}/>

            <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
                {/* Main Section */}
                <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
                    {userData?.user?.photoUrl ? (
                        <img 
                            src={userData.user.photoUrl} 
                            alt="Profile" 
                            className='w-28 h-28 rounded-full object-cover border-4 border-black shadow-md'
                        />
                    ) : (
                        <div className='w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold border-4 border-black shadow-md'>
                            {firstLetter}
                        </div>
                    )}

                    <div className='text-center md:text-left space-y-1'>
                        <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData?.user.name || 'Educator'} 👋</h1>
                        <h1 className='text-xl font-semibold text-gray-800'>Total Earning: ₹{totalEarning}/-</h1>
                        <p className='text-sm text-gray-600'>{userData?.user.description || 'Start Creating Courses'}</p>
                        <h1 className='px-2.5 text-center py-2.5 border bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={() => navigate('/courses')}>Create Courses</h1>
                    </div>
                </div>

                {/* Graph Section */}
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>

                    {/* Course Progress Graph */}
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <h2 className='text-lg font-semibold mb-4'>Course Progress (Lectures)</h2>
                        
                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart data={courseProgressData}>
                                <CartesianGrid strokeDasharray='3 3'/>
                                <XAxis dataKey='name'/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey='lectures' fill='black' radius={[10, 10, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Enrolled data Graph */}
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <h2 className='text-lg font-semibold mb-4'>Students Enrolled</h2>
                        
                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart data={enrollData}>
                                <CartesianGrid strokeDasharray='3 3'/>
                                <XAxis dataKey='name'/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey='enrolled' fill='black' radius={[10, 10, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
