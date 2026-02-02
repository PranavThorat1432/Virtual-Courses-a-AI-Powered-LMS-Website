import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard';

const ReviewPage = () => {

  const {reviewData} = useSelector((state) => state.review);
  const [latestReview, setLatestReview] = useState(null);

  useEffect(() => {
    setLatestReview(reviewData?.slice(0, 6));
  }, [reviewData]);


  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-7 px-5'>Real Review for Real Courses</h1>

      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-7 mb-7 px-5'>
        Discover how our Virtual Courses is transforming learning experiences through real feedback from students and professionals worldwide.
      </span>

      <div className='w-full flex items-center justify-center flex-wrap gap-12 lg:p-12 md:p-7 p-2.5 mb-10'>
        {
          latestReview?.map((review, index) => (
            <ReviewCard key={index} comment={review?.comment} rating={review?.rating} photoUrl={review?.user.photoUrl} name={review?.user.name} description={review?.user.description} courseTitle={review?.course?.title}/>
          ))
        }
      </div>
    </div>
  )
}

export default ReviewPage
