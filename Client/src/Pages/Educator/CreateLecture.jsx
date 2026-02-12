import React, { useEffect } from 'react'
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverURL } from '../../App';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';
import { setLectureData } from '../../Redux/lectureSlice';
import { BiSolidEdit } from 'react-icons/bi';

const CreateLecture = () => {

    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [lectureTitle, setLectureTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const { lectureData } = useSelector((state) => state.lecture);

    const handleCreateLecture = async () => {
        if (!lectureTitle.trim()) {
            toast.error('Please enter a lecture title');
            return;
        }
        
        setLoading(true);

        try {
            const result = await axios.post(
                `${serverURL}/api/course/create-lecture/${courseId}`, 
                { lectureTitle }, 
                { withCredentials: true }
            );
            
            // Ensure lectureData is an array before spreading
            const updatedLectures = Array.isArray(lectureData) 
                ? [...lectureData, result.data?.lecture]
                : [result.data?.lecture];
                
            dispatch(setLectureData(updatedLectures));
            setLectureTitle('');
            toast.success('Lecture Created!');
            
        } catch (error) {
            console.error('Error creating lecture:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create lecture';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getCourseLecture = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/course/course-lecture/${courseId}`, {
                    withCredentials: true
                });
                console.log(result.data)
                dispatch(setLectureData(result.data?.lectures));

            } catch (error) {
                console.log(error);
            }
        }
        getCourseLecture();
    }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
        <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
            {/* Header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
                    Let's Add a Lecture
                </h1>
                <p className='text-sm text-gray-500'>
                    Enter the Title and add your video lectures to enhance your course content.
                </p>
            </div>

            {/* Input Area */}
            <input 
                type="text" 
                className='w-full border border-gray-400 rounded-md p-3 text-sm focus:outline-none focus:ring focus:ring-blue-400 mb-4' 
                placeholder='e.g., Introduction to Programming' 
                required 
                onChange={(e) => setLectureTitle(e.target.value)} 
                value={lectureTitle} 
            />

            {/* Button */}
            <div className='flex gap-4 mb-6'>
                <button className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium cursor-pointer' onClick={() => navigate(`/edit-course/${courseId}`)}>
                    <IoArrowBack/> Back to Course
                </button>

                <button className='px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition-all text-sm font-medium shadow cursor-pointer flex items-center justify-center gap-3' disabled={loading} onClick={handleCreateLecture}>
                    {loading ? (
                        <>
                            <MoonLoader size={15} color="#ffffff" />
                            <span>Creating Lecture...</span>
                        </>
                    ) : '+ Create Lecture'}
                </button>
            </div>
            
            {/* Lectures List */}
            <div className='space-y-2'>
                {lectureData?.map((lecture, index) => (
                    <div className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700' key={index}>
                        <span>Lecture - {index + 1} : {lecture?.lectureTitle}</span>
                        <BiSolidEdit 
                            className="text-gray-600 hover:text-blue-600 cursor-pointer w-5 h-5" 
                            onClick={() => navigate(`/edit-lecture/${courseId}/${lecture?._id}`)}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CreateLecture
