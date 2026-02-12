import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { serverURL } from '../../App';
import { setLectureData } from '../../Redux/lectureSlice';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

const EditLecture = () => {

    const {courseId, lectureId} = useParams();
    const {lectureData} = useSelector((state) => state.lecture);
    const selectedLecture = lectureData?.find((lecture) => lecture?._id === lectureId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || '');
    const [videoFile, setVideoFile] = useState(null);
    const [isPreviewFree, setIsPreviewFree] = useState(selectedLecture?.isPreviewFree || false);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const handleEditLecture = async () => {
        if (!lectureTitle) {
            toast.error('Please provide a lecture title');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('lectureTitle', lectureTitle);
        formData.append('isPreviewFree', isPreviewFree);
        
        // Only append video file if a new one is selected
        if (videoFile) {
            formData.append('videoUrl', videoFile);
        }

        try {
            const result = await axios.post(
                `${serverURL}/api/course/edit-lecture/${lectureId}`, 
                formData, 
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            // Update the lecture in the Redux store
            const updatedLectures = lectureData.map(lecture => 
                lecture._id === lectureId ? result.data : lecture
            );
            
            dispatch(setLectureData(updatedLectures));
            toast.success('Lecture updated successfully!');
            navigate(`/create-lecture/${courseId}`);
        } catch (error) {
            console.error('Error updating lecture:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update lecture';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveLecture = async () => {
        setLoading1(true);
        try {
            const result = await axios.delete(`${serverURL}/api/course/remove-lecture/${lectureId}`, {
                withCredentials: true
            });
            console.log(result.data);
            setLoading1(false);
            navigate(`/create-lecture/${courseId}`);
            toast.success('Lecture Removed!');
            
        } catch (error) {
            setLoading1(false);
            console.log(error);
            toast.error(error.response?.data.message);
        }
    };
    
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
        <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>
            {/* Header */}
            <div className='flex items-center gap-2 mb-2'>
                <IoIosArrowRoundBack
                    className="w-7 h-7 text-gray-600 cursor-pointer "
                    onClick={() => navigate(`/create-lecture/${courseId}`)}
                />
                <h2 className='text-xl font-semibold text-gray-800'>Update Lecture</h2>
            </div>

            <button className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all cursor-pointer text-sm flex items-center justify-center gap-3' disabled={loading1} onClick={handleRemoveLecture}>
                {loading1 ? (
                        <>
                            <MoonLoader size={15} color="white" />
                            <span>Removing Lecture...</span>
                        </>
                    ) : 'Remove Lecture'
                }
            </button>

            <div className='space-y-4'>
                <div >
                    <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title *</label>
                    <input type="text" className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring focus:ring-black focus:outline-none' required onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle}/>
                </div>

                <div >
                    <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Video *</label>
                    <input 
                        type="file" 
                        className='w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500 cursor-pointer' 
                        accept='video/*' 
                        onChange={(e) => e.target.files[0] && setVideoFile(e.target.files[0])}
                    />
                    {selectedLecture?.videoUrl && !videoFile && (
                        <p className='text-sm text-gray-500 mt-1'>Current video: {selectedLecture.videoUrl.split('/').pop()}</p>
                    )}
                </div>

                <div className='flex items-center gap-3'>
                    <input 
                        type="checkbox"  
                        className='accent-black h-4 w-4' 
                        id='isFree' 
                        checked={isPreviewFree}
                        onChange={() => setIsPreviewFree(!isPreviewFree)}
                    />
                    <label htmlFor="isFree" className='text-sm text-gray-700'>Is this Video Free?</label>
                </div>

                {loading ? <p>Uploading Video... Please wait!</p> : ''}
            </div>
            
            <div className='pt-4'>
                <button className='w-full bg-black text-white rounded-md py-3 text-sm font-medium hover:bg-gray-700 transition cursor-pointer flex items-center justify-center gap-3' disabled={loading} onClick={handleEditLecture}>
                    {loading ? (
                        <>
                            <MoonLoader size={15} color="white" />
                            <span>Updating Lecture...</span>
                        </>
                        ) : 'Update Lecture'
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default EditLecture
