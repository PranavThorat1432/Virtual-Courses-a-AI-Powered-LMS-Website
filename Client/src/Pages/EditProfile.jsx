import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../App';
import { setUserData } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';


const EditProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userData} = useSelector((state) => state.user);

    const [name, setName] = useState(userData.user.name || '');
    const [description, setDescription] = useState(userData.user.description || '');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(false);


    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('photoUrl', photoUrl);


    const handleEditProfile = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverURL}/api/user/update-profile`, formData, {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
            setLoading(false);
            navigate('/profile');
            toast.success('Profile Updated Successfully');
            
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
            <IoIosArrowRoundBack className='absolute top-[5%] left-[5%] w-8 h-8 cursor-pointer ' onClick={() => navigate('/profile')}/>

            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Profile</h2>

            <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
                <div className='flex flex-col items-center text-center'>
                    {userData?.user.photoUrl ? <img src={userData?.user.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black' alt="" /> 
                    : (
                        <div className='w-24 h-24 rounded-full text-white border-2 border-white bg-black flex items-center justify-center text-[30px]'>
                        {userData.user.name.slice(0, 1).toUpperCase()}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="image" className='text-sm font-medium text-gray-700'>Select Avatar</label>
                    <input id='image' type="file" name='photoUrl' accept='image/*' placeholder='PhotoUrl' className='w-full px-4 py-2 border rounded-md text-sm cursor-pointer' onChange={(e) => setPhotoUrl(e.target.files[0])} />
                </div>

                <div>
                    <label htmlFor="name" className='text-sm font-medium text-gray-700'>Username</label>
                    <input id='name' type="text" placeholder={userData.user.name} className='w-full px-4 py-2 border rounded-md text-sm' onChange={(e) => setName(e.target.value)} value={name}/>
                </div>

                <div>
                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</label>
                    <input id='email' readOnly name='email' type="text" placeholder={userData.user.email} className='w-full px-4 py-2 border rounded-md text-sm'/>
                </div>

                <div>
                    <label htmlFor="description" className='text-sm font-medium text-gray-700'>Bio</label>
                    <textarea id='description' name='description' type="text" placeholder='Tell us about yourself...' rows={3} className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring focus:ring-black text-sm' onChange={(e) => setDescription(e.target.value)} value={description}/>
                </div>

                <button className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer flex items-center justify-center gap-3' disabled={loading} onClick={handleEditProfile}>
                    {loading ? (
                        <>
                            <MoonLoader size={20} color="#ffffff" />
                            <span>Saving Changes...</span>
                        </>
                    ) : 'Save Changes'}
                </button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile
