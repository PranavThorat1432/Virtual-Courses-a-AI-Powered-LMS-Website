import React from 'react'
import { IoMdStar, IoMdStarOutline } from 'react-icons/io'

const ReviewCard = ({comment, rating, photoUrl, name, description, courseTitle}) => {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full'>
      <div className='flex items-center mb-3 text-yellow-400 text-sm'>
        {
          Array(5).fill(0)?.map((_, i) => (
            <span key={1}>
              {i < rating ? <IoMdStar/> : <IoMdStarOutline/>}
            </span>
          ))
        }
      </div>

      <p className='text-gray-700 text-sm'>Review For {courseTitle}</p>
      <p className='text-gray-700 text-sm mb-5'>{comment}</p>

      <div className='flex items-center gap-3'>
        {photoUrl ? (
          <img src={photoUrl} alt="" className='w-10 h-10 rounded-full object-cover'/>
        ) : (
          <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[15px] font-semibold'>
            {name.slice(0, 1).toUpperCase()}
          </div>
        )}

        <div>
          <h2 className='font-semibold text-gray-800 text-sm'>{name}</h2>
          <p className='text-xs text-gray-500'>{description}</p>
        </div>

      </div>


    </div>
  )
}

export default ReviewCard
