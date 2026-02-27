import React from 'react';
import { FiSearch, FiBookOpen, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NoCourseFound = ({ onResetFilter, selectedCategories }) => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-100 px-4 py-12">
      {/* Illustration Section */}
      <div className="relative mb-8">
        {/* Main Circle */}
        <div className="w-32 h-32 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <FiSearch className="w-12 h-12 text-blue-500" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-300 rounded-full opacity-40"></div>
      </div>

      {/* Content Section */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          No Courses Found!
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {selectedCategories?.length > 0 
            ? `We couldn't find any courses in ${selectedCategories.join(', ')}. 
               Try adjusting your filters or browse other categories.`
            : "We couldn't find any courses matching your criteria. Try adjusting your filters or browse all courses."
          }
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onResetFilter}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <FiRefreshCw className="w-4 h-4" />
            Clear Filters
          </button>
          
          <button
            onClick={() => navigate('/search')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <FiBookOpen className="w-4 h-4" />
            Search with AI
          </button>
        </div>
      </div>

      {/* Additional Suggestions */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4 max-w-md w-full">
        <h3 className="font-semibold text-gray-700 mb-2">💡 Suggestions:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Try broader search terms</li>
          <li>• Browse different categories</li>
          <li>• Check back later for new courses</li>
          <li>• Use our AI-powered search for recommendations</li>
        </ul>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default NoCourseFound;
