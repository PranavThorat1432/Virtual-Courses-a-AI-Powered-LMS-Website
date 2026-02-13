import React, { useEffect, useState, useCallback } from 'react'
import { IoIosArrowRoundBack, IoMdStar } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedCourse } from '../Redux/courseSlice';
import { updateUserData } from '../Redux/userSlice';
import empty from '../assets/empty.jpg';
import { FaPlayCircle } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import axios from 'axios';
import { serverURL } from '../App';
import Card from '../Components/Card';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

const ViewCourse = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {courseData, selectedCourse} = useSelector((state) => state.course);
    const {userData} = useSelector((state) => state.user);

    const [selectedLecture, setSelectedLecture] = useState(null);
    const [creatorData, setCreatorData] = useState(null);
    const [creatorCourses, setCreatorCourses] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    
    const firstLetter = creatorData?.name?.charAt(0)?.toUpperCase() || '';


    const fetchCourseData = async () => {
        courseData?.map((course) => {
            if(course._id === courseId) {
                dispatch(setSelectedCourse(course));
                console.log(selectedCourse);

                return null;
            }
        });
    };


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


    const checkEnrollment = useCallback(async () => {
        if (!courseId || !userData?.user) return;
        
        try {
            // Reset enrollment state when checking a new course
            setIsEnrolled(false);
            
            // First check local user data
            const isEnrolledInLocal = userData.user.enrolledCourses?.some(c => 
                (typeof c === 'string' ? c : c._id)?.toString() === courseId.toString()
            );

            if (isEnrolledInLocal) {
                setIsEnrolled(true);
                return;
            }

            // If not found in local data, verify with the server
            const response = await axios.post(
                `${serverURL}/api/course/check-enrollment`, 
                { courseId },
                { withCredentials: true }
            );
            
            if (response.data.isEnrolled) {
                setIsEnrolled(true);
                // Update local user data if needed
                if (!userData.user.enrolledCourses?.includes(courseId)) {
                    const updatedUser = {
                        ...userData,
                        user: {
                            ...userData.user,
                            enrolledCourses: [...(userData.user.enrolledCourses || []), courseId]
                        }
                    };
                    dispatch(updateUserData(updatedUser));
                }
            } else {
                setIsEnrolled(false);
            }
        } catch (error) {
            console.error('Error checking enrollment:', error);
            // If there's an error, default to the local check
            const isEnrolledInLocal = userData?.user?.enrolledCourses?.some(c => 
                (typeof c === 'string' ? c : c._id)?.toString() === courseId?.toString()
            );
            setIsEnrolled(!!isEnrolledInLocal);
        }
    }, [courseId, userData, dispatch]);

    useEffect(() => {
        // Reset enrollment state when courseId changes
        setIsEnrolled(false);
        fetchCourseData();
    }, [courseId]);

    useEffect(() => {
        if (courseId && userData?.user) {
            checkEnrollment();
        }
    }, [courseId, userData, checkEnrollment]);

    useEffect(() => {
        if(creatorData?._id && courseData?.length > 0) {
            const creatorCourse = courseData?.filter((course) => course?.creator === creatorData?._id && course?.id !== courseId)
            setCreatorCourses(creatorCourse);
        }
    }, [creatorData, courseData]);


    const handleEnroll = async (userId, courseId) => {
        try {
            const orderData = await axios.post(`${serverURL}/api/order/razorpay-order`, {userId, courseId}, {
                withCredentials: true
            });
            console.log(orderData.data);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.data.amount,
                currency: 'INR',
                name: 'Virtual Courses',
                description: 'Course Enrollement Payment',
                order_id: orderData.data.id,
                handler: async (response) => {
                    console.log('Razorpay Response: ', response);
                    
                    try {
                        const verifyPayment = await axios.post(`${serverURL}/api/order/verify-payment`, {
                            ...response,
                            courseId,
                            userId
                        }, {
                            withCredentials: true
                        });
                        
                        // Update local state
                        setIsEnrolled(true);
                        
                        // Update user data in Redux store
                        if (userData?.user) {
                            const updatedUser = {
                                ...userData,
                                user: {
                                    ...userData.user,
                                    enrolledCourses: [...(userData.user.enrolledCourses || []), courseId]
                                }
                            };
                            // Update user data in Redux store if you have a user slice
                            dispatch(updateUserData(updatedUser));
                        }
                        
                        toast.success('Payment Verified, and Enrolled Successfully!');
                        
                    } catch (error) {
                        console.log(error);
                        toast.error(error.response?.data.message);
                    }
                },
            };

            const rzpPortal = new window.Razorpay(options);
            rzpPortal.open(); 

        } catch (error) {
            console.log(error);
        }
    };

    
    const handleReview = async () => {
        setLoading(true);

        try {
            const result = await axios.post(`${serverURL}/api/review/create-review`, {
                rating,
                comment,
                courseId,
                userId: userData?.user?.id
            }, {
                withCredentials: true
            });
            setLoading(false);
            toast.success('Review Added');
            console.log(result.data);
            setRating(0);
            setComment('');
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data.message);
            setRating(0);
            setComment('');
        }
    };

    const calculateAvgReview = (reviews) => {
        if(!reviews || reviews?.length === 0) {
            return 0;
        }
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avg = total / reviews?.length;
        return avg.toFixed(1);
    };

    const avgRating = calculateAvgReview(selectedCourse?.reviews);


  return (
    <div className='min-h-screen bg-gray-50 p-6'>
        <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
            {/* Top Section */}
            <div className='flex flex-col md:flex-row gap-6'>

                {/* Thumbnail */}
                <div className='w-full md:w-1/2'>
                    <IoIosArrowRoundBack
                        className="w-8 h-8 text-black cursor-pointer "
                        onClick={() => navigate('/')}
                    />

                    {selectedCourse?.thumbnail ? (
                        <img src={selectedCourse?.thumbnail} alt="" className='rounded-xl w-full object-cover'/>
                    ) : (
                        <img src={empty} alt="" className='rounded-xl w-full object-cover'/>
                    )}
                </div>

                {/* Course Info */}
                <div className='flex-1 space-y-2 mt-5'>
                    <h2 className='text-2xl font-bold '>{selectedCourse?.title}</h2>
                    <p className='text-gray-600'>{selectedCourse?.subTitle}</p>

                    <div className='flex items-start flex-col justify-start gap-1'>
                        <div className='text-yellow-500 font-medium flex gap-2'>
                            <span className='flex items-center justify-start gap-1'><IoMdStar className='text-yellow-500'/>{avgRating}</span>
                            <span className='text-gray-400'>{`(${selectedCourse?.reviews?.length} Reviews)`}</span>
                        </div>

                        <div className='flex gap-3 items-center justify-center'>
                            <span className='text-lg font-semibold text-black'>₹{selectedCourse?.price}/-</span>{'  '}
                            <span className='line-through text-sm text-gray-400'>₹599/-</span>
                        </div>

                        <ul className='text-sm text-gray-700 space-y-1 pt-2'> 
                            <li>✔  10+ hours of video contents</li>
                            <li>✔  Lifetime access to course materials</li>
                        </ul>

                        {!isEnrolled ? (
                            <button className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer' onClick={() => handleEnroll(userData?.user?._id, courseId)}>
                                Enroll Now
                            </button>
                        ) : (
                            <button className='bg-green-100 text-green-500 px-6 py-2 rounded hover:bg-green-200 mt-3 cursor-pointer' onClick={() => navigate(`/view-lectures/${courseId}`)}>
                                Watch Now
                            </button>
                        )}
                    </div>
                </div>
            </div>



            {/* Middle Section */}
            <div>
                <h2 className='text-xl font-semibold mb-2'>What You'll Learn?</h2>
                <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                    <li>Learn {selectedCourse?.category} from beginning.</li>
                </ul>
            </div>

            <div>
                <h2 className='text-xl font-semibold mb-2'>Who this course is for?</h2>
                <p className='text-gray-700'>Beginner, Aspiring developers, and Professional looking to upgrade skills.</p>
            </div>



            {/* Lecture Section */}
            <div className='flex flex-col md:flex-row gap-6'>
                <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
                    <h2 className='text-xl font-bold mb-1 text-gray-800'>
                        Course Curriculum
                    </h2>
                    <p className='text-sm text-gray-500 mb-4'>
                        {selectedCourse?.lectures && 
                            (selectedCourse?.lectures?.length === 1 ? 
                                `${selectedCourse?.lectures?.length} Lecture` 
                                : `${selectedCourse?.lectures?.length} Lectures`
                            )
                        }
                    </p>

                    <div className='flex flex-col gap-3'>
                        {selectedCourse?.lectures?.map((lecture, index) => (
                            <button 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture?.isPreviewFree ? 'hover:bg-gray-100 cursor-pointer border-gray-300' : 'cursor-not-allowed opacity-600 border-gray-200 text-gray-600'} ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? 'bg-gray-100 border-gray-400' : ''}`} 
                                key={index} 
                                disabled={!lecture?.isPreviewFree}
                                onClick={() => {if(lecture?.isPreviewFree) {
                                    setSelectedLecture(lecture);
                                }}
                            }>
                                <span className='text-lg text-gray-700'>
                                    {lecture?.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                                </span>
                                <span className='text-sm font-medium text-gray-800'>
                                    {lecture?.lectureTitle}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
                    <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
                        {selectedLecture?.videoUrl ? (
                            <video src={selectedLecture?.videoUrl} 
                            controls
                            className='w-full h-full object-cover '></video>
                        ) : (
                            <span className='text-white text-sm'>Select a Preview Lecture to watch.</span>
                        )}
                    </div>
                </div>
            </div>

            
            {/* Review Section */}
            <div className='mt-8 border-t pt-6'>
                <h2 className='text-xl font-semibold mb-2'>
                    Write a Review
                </h2>
                <div className='mb-4'>
                    <div className='flex gap-1 mb-2'>
                        {
                            [1, 2, 3, 4, 5].map((star) => (
                                <IoMdStar 
                                    key={star} 
                                    onClick={() => setRating(star)}
                                    className={star <= rating ? 'text-yellow-400' : 'text-gray-400'}
                                />
                            ))
                        }
                    </div>

                    <textarea 
                        required
                        className='w-full border border-gray-300 rounded-lg p-2' 
                        placeholder='Write your review here...'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        rows={3}
                    />

                    <button className='bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800 cursor-pointer flex items-center justify-center gap-3' onClick={handleReview} disabled={loading}>
                        {loading ? (
                                <>
                                    <MoonLoader size={20} color="white" />
                                    <span>Submitting Review...</span>
                                </>
                            ) : 'Submit Review'
                        }
                    </button>

                    
                </div>
            </div>

            {/* For Creator Info */}
            <div className='flex items-center gap-4 pt-4 border-t'>
                {creatorData?.photoUrl ? (
                    <img src={creatorData?.photoUrl} alt="" className='w-16 h-16 rounded-full object-cover border '/>)
                : (
                    <div className='w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-3xl font-semibold shadow-md'>
                        {firstLetter}
                    </div>
                )}


                <div>
                    <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
                    <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.description}</p>
                    <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.email}</p>
                </div>
            </div>

            <div className="w-full py-5">
                <h2 className='text-xl font-semibold mb-4'>Other Published Courses by the Educator</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {creatorCourses?.map((course, index) => (
                        <div key={index} className='w-full'>
                            <Card 
                                thumbnail={course?.thumbnail} 
                                id={course?._id} 
                                price={course?.price} 
                                title={course?.title} 
                                category={course?.category}
                                reviews={course?.reviews || []}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewCourse
