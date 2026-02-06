import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { MoonLoader } from 'react-spinners';

const CreateCourses = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [category, setcategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post(`${serverURL}/api/course/create-course`, { title, category }, {
                withCredentials: true
            });
            console.log(result.data);
            setLoading(false);
            toast.success('Course Created Successfully');
            navigate('/courses');

        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response.data.message);

        }
    };
    
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
        <div className='max-w-xl w-150 mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>
            <IoIosArrowRoundBack className='w-8 h-8 absolute top-[8%] left-[5%] cursor-pointer ' onClick={() => navigate('/courses')}/>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Create Course</h2>

            <form className='space-y-5'>
                <div>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
                    <input type="text" name="title" id="title" placeholder='Enter Course Title' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black' onChange={(e) => setTitle(e.target.value)} value={title} required/>
                </div>
                
                <div>
                    <label htmlFor="cat" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
                    <select id="cat" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black' onChange={(e) => setcategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="App Development">App Development</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="AI Tools">AI Tools</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                        <option value="UI/UX Designing">UI/UX Designing</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <button className='w-full bg-black text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition cursor-pointer flex items-center justify-center gap-3' disabled={loading}  onClick={handleCreateCourse}>
                {loading ? (
                    <>
                        <MoonLoader size={20} color="#ffffff" />
                        <span>Creating...</span>
                    </>
                ) : 'Create'}
                </button>

            </form>
        </div>
    </div>
  )
}

export default CreateCourses
