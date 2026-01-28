import React from 'react';
import { IoMdStar } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Card = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate();

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews?.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews?.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(reviews);

  return (
    <div 
      className="w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 cursor-pointer"
      onClick={() => navigate(`/view-course/${id}`)}
    >
      <div className="relative pb-[56.25%] overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate mb-1" title={title}>
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded">
            {category}
          </span>
          <div className="flex items-center space-x-1">
            <IoMdStar className="text-yellow-400 text-sm" />
            <span className="text-xs font-medium text-gray-700">{avgRating}</span>
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-600">₹{price}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
