import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const CardPage = () => {
    const { courseData } = useSelector((state) => state.course);
    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
        setPopularCourses(courseData?.slice(0, 6));
    }, [courseData]);

    return (
        <div className='w-full py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto text-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                    Our Popular Courses
                </h1>
                <p className='text-gray-600 max-w-3xl mx-auto mb-10'>
                    Explore Top-rated courses designed to boost your Skills, enhance careers, and unlock opportunities in tech, AI, Business, and beyond.
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {popularCourses?.map((course, index) => (
                        <div key={index} className='w-full'>
                            <Card 
                                thumbnail={course?.thumbnail} 
                                title={course?.title} 
                                category={course?.category} 
                                price={course?.price} 
                                id={course?._id} 
                                reviews={course?.reviews}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardPage;
