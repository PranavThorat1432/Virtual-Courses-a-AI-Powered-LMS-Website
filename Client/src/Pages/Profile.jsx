import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";


const Profile = () => {

  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
          <IoIosArrowRoundBack className='absolute top-[8%] left-[5%] w-8 h-8 cursor-pointer ' onClick={() => navigate('/')}/>

        <div className='flex flex-col items-center text-center'>
          {userData?.user.photoUrl ? <img src={userData?.user.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black' alt="" /> 
          : (
            <div className='w-24 h-24 rounded-full text-white border-2 border-white bg-black flex items-center justify-center text-[30px]'>
              {userData.user.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <h2 className='text-2xl font-bold mt-4 text-gray-800'>{userData?.user.name}</h2>
          <p className='text-sm text-gray-500'>{userData?.user.role}</p>
        </div>

        <div className='mt-6 space-y-4'>
          <div className='text-sm flex items-center justify-start gap-1'>
            <span className='font-semibold text-gray-700'>Email:</span>
            <span>{userData.user.email}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-1'>
            <span className='font-semibold text-gray-700'>Bio:</span>
            <span>{userData.user.description}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-1'>
            <span className='font-semibold text-gray-700'>Enrolled Courses:</span>
            <span>{userData?.user?.enrolledCourses?.length}</span>
          </div>
        </div>

        <div className='mt-6 flex justify-center gap-4'>
          <button className='px-5 py-2 rounded bg-black text-white active:bg-[#4b4b4b] cursor-pointer transition' onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
