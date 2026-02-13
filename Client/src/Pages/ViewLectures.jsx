import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { serverURL } from '../App';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { FaLock, FaPlayCircle } from 'react-icons/fa';

const ViewLectures = () => {

    
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {courseData} = useSelector((state) => state.course);
    const {userData} = useSelector((state) => state.user);
    const selectedCourse = courseData?.find((course) => course._id === courseId);
    
    const [creatorData, setCreatorData] = useState(null);
    const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lectures[0] || null);

    const firstLetter = creatorData?.name?.charAt(0)?.toUpperCase() || '';

    useEffect(() => {
        const handleCreator = async () => {
            if(selectedCourse?.creator) {
                try {
                    const result = await axios.post(`${serverURL}/api/course/get-creator`, {userId: selectedCourse?.creator}, {
                        withCredentials: true
                    });
                    console.log(result.data);
                    setCreatorData(result.data);
                    
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handleCreator();

    }, [selectedCourse]);


  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6'>
        {/* Left or Top */}
        <div className='w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold flex items-center justify-start gap-5 text-gray-800'>
                    <IoIosArrowRoundBack
                        className="w-8 h-8 text-black cursor-pointer "
                        onClick={() => navigate(-1)}
                    />
                    {selectedCourse?.title}
                </h2>
                
                <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium'>
                    <span>Category: {selectedCourse?.category}</span>
                    <span>Level: {selectedCourse?.level}</span>
                </div>
            </div>

            {/* Video Player */}
            <div className='aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300'>
                {selectedLecture?.videoUrl ? (
                    <video 
                        src={selectedLecture?.videoUrl} 
                        className='w-full h-full object-cover'
                        controls
                    />
                ) : (
                    <div className='flex justify-center items-center h-full text-white'>
                        Select a Preview Lecture to watch.
                    </div>
                )}
            </div>

            <div className='mt-2 '>
                <h2 className='text-xl font-semibold text-gray-800'>{selectedLecture?.lectureTitle}</h2>
            </div>
        </div>

        {/* Right or Bottom */}
        <div className='w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>All Lectures</h2>

            <div className='flex flex-col gap-3 mb-6'>
                {selectedCourse?.lectures?.length > 0 ? (
                    (selectedCourse?.lectures?.map((lecture, index) => (
                        <button 
                            className={`flex items-center justify-between p-3 rounded-lg border transition text-left cursor-pointer ${selectedLecture?._id === lecture._id ? 'bg-gray-200 border-gray-500' : 'hover:bg-gray-50 border-gray-300'}`} 
                            key={index} 
                            // disabled={!lecture?.isPreviewFree}
                            onClick={() => {setSelectedLecture(lecture)}
                        }>
                            <h2 className='text-sm font-semibold text-gray-800'>
                                {lecture?.lectureTitle}
                            </h2>
                            <FaPlayCircle className='text-lg text-black'/>
                        </button>
                    )))
                ) : (
                    <p className='text-gray-50'>No Lectures Available.</p>
                )}
            </div>

            {/* Educator's Info */}
            {creatorData && 
                <div className='mt-4 border-t pt-4 '>
                    <h3 className='text-md font-semibold text-gray-700 mb-3'> 
                        Educator
                    </h3>

                    <div className='flex items-center gap-4'>
                        {creatorData?.photoUrl ? (
                            <img src={creatorData?.photoUrl} alt="" className='w-14 h-14 rounded-full object-cover border '/>)
                        : (
                            <div className='w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold shadow-md'>
                                {firstLetter}
                            </div>
                        )}

                        <div>
                            <h2 className='text-base font-medium text-gray-800'>{creatorData?.name}</h2>
                            <p className='text-sm text-gray-600 text-[11px]'>{creatorData?.description}</p>
                            <p className='text-sm text-gray-600 text-[11px]'>{creatorData?.email}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default ViewLectures
