import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdOutlineCastForEducation,
  MdOutlineSupportAgent,
  MdOutlineGroups
} from "react-icons/md";
import { 
  SiOpenaccess,
  SiOpenbadges
} from "react-icons/si";
import { 
  FaUsers,
  FaChalkboardTeacher,
  FaCertificate,
  FaMobileAlt
} from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";


const features = [
  {
    icon: <MdOutlineCastForEducation className="w-8 h-8" />,
    title: "20k+ Online Courses",
    description: "Access a vast library of high-quality courses",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50"
  },
  {
    icon: <SiOpenaccess className="w-8 h-8" />,
    title: "Life-time Access",
    description: "Learn at your own pace, forever",
    color: "from-purple-500 to-pink-600",
    bg: "bg-purple-50"
  },
  {
    icon: <FaSackDollar className="w-8 h-8" />,
    title: "Value for Money",
    description: "Premium quality at affordable prices",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50"
  },
  {
    icon: <MdOutlineSupportAgent className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Dedicated assistance whenever you need it",
    color: "from-amber-500 to-orange-600",
    bg: "bg-orange-50"
  },
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: "Community",
    description: "Join a network of passionate learners",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const Logos = () => {
  return (
    <div className="w-full py-12 md:py-16 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Our Platform</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best learning experience with top-notch features
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${feature.bg} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100`}
              variants={item}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaChalkboardTeacher className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Expert Instructors</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <SiOpenbadges className="w-7 h-7 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Certification</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaMobileAlt className="w-7 h-7 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Mobile Friendly</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCertificate className="w-7 h-7 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Accredited</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
