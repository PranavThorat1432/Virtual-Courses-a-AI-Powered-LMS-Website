import React, { useState } from 'react';
import { SiGoogledataproc, SiOpenaigym, SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut, MdSearch, MdStar, MdStarBorder } from 'react-icons/md';
import { FaHackerrank } from 'react-icons/fa6';
import { AiFillOpenAI, AiOutlineArrowRight } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const courseCategories = [
  { 
    id: 1, 
    name: 'Web Development', 
    icon: <TbDeviceDesktopAnalytics className='w-8 h-8' />,
    count: 42,
    color: 'from-blue-500 to-blue-400',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  { 
    id: 2, 
    name: 'UI/UX Design', 
    icon: <LiaUikit className='w-8 h-8' />,
    count: 28,
    color: 'from-purple-500 to-purple-400',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-500'
  },
  { 
    id: 3, 
    name: 'App Development', 
    icon: <MdAppShortcut className='w-8 h-8' />,
    count: 35,
    color: 'from-green-500 to-green-400',
    bg: 'bg-green-50',
    iconColor: 'text-green-500'
  },
  { 
    id: 4, 
    name: 'Ethical Hacking', 
    icon: <FaHackerrank className='w-8 h-8' />,
    count: 19,
    color: 'from-red-500 to-red-400',
    bg: 'bg-red-50',
    iconColor: 'text-red-500'
  },
  { 
    id: 5, 
    name: 'AI/ML', 
    icon: <AiFillOpenAI className='w-8 h-8' />,
    count: 27,
    color: 'from-orange-500 to-orange-400',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-500'
  },
  { 
    id: 6, 
    name: 'Data Science', 
    icon: <SiGoogledataproc className='w-8 h-8' />,
    count: 31,
    color: 'from-indigo-500 to-indigo-400',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-500'
  },
  { 
    id: 7, 
    name: 'Data Analytics', 
    icon: <BsClipboardData className='w-8 h-8' />,
    count: 23,
    color: 'from-cyan-500 to-cyan-400',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-500'
  },
  { 
    id: 8, 
    name: 'AI Tools', 
    icon: <SiOpenaigym className='w-8 h-8' />,
    count: 15,
    color: 'from-pink-500 to-pink-400',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-500'
  }
];


const ExploreCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCategories = courseCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<MdStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<MdStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<MdStarBorder key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className='w-full bg-linear-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Explore Our <span className='bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>Courses</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Discover a wide range of high-quality courses designed to help you achieve your learning goals and advance your career.
          </p>
          
          {/* Search Bar */}
          <div className='mt-8 max-w-2xl mx-auto relative'>
            <div className='relative flex items-center'>
              <MdSearch className='absolute left-4 text-gray-400 text-2xl' />
              <input
                type='text'
                placeholder='Search for courses...'
                className='w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className='absolute right-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center cursor-pointer'
                onClick={() => navigate('/all-courses')}
              >
                Search
                <AiOutlineArrowRight className='ml-2' />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer'>
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              className={`${category.bg} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100`}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              onClick={() => navigate(`/courses?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <div className={`w-16 h-16 rounded-lg bg-linear-to-r ${category.color} flex items-center justify-center mb-4`}>
                <div className='text-white'>{category.icon}</div>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>{category.name}</h3>
              <div className='flex items-center text-sm text-gray-600 mb-3'>
                <span className='mr-2'>{category.count}+ Courses</span>
                <span className='mx-2'>•</span>
                <div className='flex'>{renderStars(4.5)}</div>
              </div>
              <button className='text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center transition-colors cursor-pointer'>
                View all courses
                <AiOutlineArrowRight className='ml-1' />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white'>
          <h3 className='text-2xl md:text-3xl font-bold mb-4'>Ready to start learning?</h3>
          <p className='text-blue-100 max-w-2xl mx-auto mb-6'>
            Join thousands of students already learning with us. Start your learning journey today and unlock your potential.
          </p>
          <button 
            className='bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto cursor-pointer'
            onClick={() => navigate('/all-courses')}
          >
            Browse All Courses
            <SiViaplay className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
