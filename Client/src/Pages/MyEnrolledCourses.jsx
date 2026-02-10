import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const MyEnrolledCourses = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const { courseId } = useParams();

    return (
        <div className='min-h-screen w-full px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center mb-8'>
                    <button 
                        onClick={() => navigate('/')}
                        className='flex items-center text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer group'
                    >
                        <IoIosArrowRoundBack className='w-8 h-8 mr-1 group-hover:-translate-x-1 transition-transform duration-200' />
                        <span className='font-medium'>Back to Home</span>
                    </button>
                </div>

                <h1 className='text-4xl font-bold text-gray-800 mb-12 text-center'>
                    My Enrolled <span className='text-blue-600'>Courses</span>
                </h1>

                {userData?.user?.enrolledCourses?.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {userData?.user?.enrolledCourses?.map((course, index) => (
                            <div 
                                key={index}
                                className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer'
                                onClick={() => navigate(`/view-lectures/${course?._id}`)}
                            >
                                <div className='relative h-48 overflow-hidden'>
                                    <img 
                                        src={course?.thumbnail} 
                                        alt={course?.title} 
                                        className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Thumbnail';
                                        }}
                                    />
                                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8'>
                                        <span className='inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full'>
                                            {course?.level}
                                        </span>
                                    </div>
                                </div>

                                <div className='p-5'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <h2 className='text-lg font-bold text-gray-800 line-clamp-2 h-14'>
                                            {course?.title}
                                        </h2>
                                    </div>
                                    <div className='flex items-center text-sm text-gray-600 mb-4'>
                                        <span className='inline-block px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium'>
                                            {course?.category}
                                        </span>
                                    </div>
                                    <button 
                                        className='w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/view-lectures/${course?._id}`);
                                        }}
                                    >
                                        Continue Learning
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-16 bg-white rounded-xl shadow-sm'>
                        <div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>No courses enrolled yet</h3>
                        <p className='text-gray-500 max-w-md mx-auto mb-6'>
                            You haven't enrolled in any courses yet. Explore our courses to get started on your learning journey!
                        </p>
                        <button 
                            onClick={() => navigate('/courses')}
                            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer inline-flex items-center'
                        >
                            Browse Courses
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
  )
}

export default MyEnrolledCourses
