import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';
import { IoPersonCircle } from "react-icons/io5";
import { FiLogOut, FiUser, FiBookOpen, FiGrid } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { serverURL } from '../App';
import axios from 'axios';
import { setUserData } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { userData } = useSelector((state) => state.user);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleSignout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
      setShowDropdown(false);
      setShowMobileMenu(false);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message || 'Error logging out');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/all-courses' },
    { name: 'About', path: '/' },
  ];

  const userMenuItems = [
    { 
      name: 'My Profile', 
      icon: <FiUser className="mr-2" />, 
      onClick: () => navigate('/profile') 
    },
    { 
      name: 'My Courses', 
      icon: <FiBookOpen className="mr-2" />, 
      onClick: () => navigate('/myEnrolled-courses') 
    },
    ...(userData?.user?.role === 'Educator' ? [{
      name: 'Dashboard', 
      icon: <FiGrid className="mr-2" />, 
      onClick: () => navigate('/dashboard')
    }] : [])
  ];

  const renderUserAvatar = () => (
    userData?.user?.photoUrl ? (
      <img
        src={userData.user.photoUrl}
        alt="Profile"
        className="h-10 w-10 rounded-full border-2 border-white object-cover"
      />
    ) : (
      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
        {userData?.user?.name?.charAt(0).toUpperCase()}
      </div>
    )
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src={logo} 
              alt="Logo" 
              className="h-12 w-12 rounded-lg border-2 border-white" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {userData ? (
              <div 
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                  {renderUserAvatar()}
                  <span className={`${scrolled ? 'text-gray-800' : 'text-white'}`}>
                    {userData.user?.name?.split(' ')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              item.onClick();
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                          >
                            {item.icon}
                            {item.name}
                          </button>
                        ))}
                        <button
                          onClick={handleSignout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
                        >
                          <FiLogOut className="mr-2" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/signin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    scrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white hover:text-blue-200'
                  } transition-colors cursor-pointer`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-gray-800' : 'text-white'
              } hover:text-blue-600 focus:outline-none cursor-pointer`}
            >
              {showMobileMenu ? (
                <RxCross2 className="h-6 w-6" />
              ) : (
                <RxHamburgerMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.name}
                </Link>
              ))}

              {userData ? (
                <>
                  <div className="px-3 py-2 flex items-center space-x-3 border-t border-gray-100 mt-2">
                    <div className="flex-shrink-0">
                      {renderUserAvatar()}
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {userData.user?.name}
                    </div>
                  </div>
                  
                  {userMenuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.onClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  ))}
                  <button
                    onClick={handleSignout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <FiLogOut className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-2 pt-2">
                  <button
                    onClick={() => {
                      navigate('/signin');
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
