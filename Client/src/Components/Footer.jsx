import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState({
        quickLinks: false,
        categories: false
    });

    const toggleMobileMenu = (menu) => {
        setMobileMenuOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <img 
                                src={logo} 
                                alt="Virtual Courses Logo" 
                                className="h-12 w-12 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300 cursor-pointer"
                                onClick={() => navigate('/')}
                            />
                            <h2 className="text-2xl font-bold text-white">Virtual Courses</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            AI-Powered learning platform to help you grow smarter, Learn anything, anytime, anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-10">
                        <div 
                            className="flex justify-between items-center md:block cursor-pointer md:cursor-auto"
                            onClick={() => toggleMobileMenu('quickLinks')}
                        >
                            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                                Quick Links
                                <span className="ml-2 md:hidden">
                                    {mobileMenuOpen.quickLinks ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </h3>
                        </div>
                        <ul className={`space-y-3 ${mobileMenuOpen.quickLinks ? 'block' : 'hidden'} md:block`}>
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'All Courses', path: '/all-courses' },
                                { name: 'Login', path: '/signin' },
                                { name: 'My Profile', path: '/profile' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group cursor-pointer"
                                    >
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <div 
                            className="flex justify-between items-center md:block cursor-pointer md:cursor-auto"
                            onClick={() => toggleMobileMenu('categories')}
                        >
                            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                                Categories
                                <span className="ml-2 md:hidden">
                                    {mobileMenuOpen.categories ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </h3>
                        </div>
                        <ul className={`space-y-3 ${mobileMenuOpen.categories ? 'block' : 'hidden'} md:block`}>
                            {['Web Development', 'App Development', 'AI/ML', 'UI/UX Designing'].map((category, index) => (
                                <li key={index}>
                                    <div className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group cursor-pointer">
                                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        {category}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">✉️</span>
                                <span className="text-sm text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                                    support@virtualcourses.com
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">📞</span>
                                <span className="text-sm text-gray-400">+1 (123) 456-7890</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">📍</span>
                                <span className="text-sm text-gray-400">123 Education St, Learning City</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Virtual Courses. All rights reserved.
                    </p>
                    <div className="flex justify-center space-x-6 mt-4">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                            <span 
                                key={index} 
                                className="text-xs text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
