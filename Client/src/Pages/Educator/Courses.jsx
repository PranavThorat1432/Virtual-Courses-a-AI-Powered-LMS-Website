import React from "react";
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import empty from '../../assets/empty.jpg'
import { BiSolidEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import useGetCreatorCourse from "../../Hooks/useGetCreatorCourse";


const Courses = () => {

    const navigate = useNavigate();
    const {creatorCourseData} = useSelector((state) => state.course);

    useGetCreatorCourse();
  return (
    <div className="min-h-screen flex bg-gray-100">
        <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <div className="flex items-center justify-center gap-3">
                        <IoIosArrowRoundBack
                            className="w-8 h-8 cursor-pointer "
                            onClick={() => navigate("/dashboard")}
                        />
                        <h1 className="text-2xl font-semibold">All Created Courses</h1>
                    </div>

                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer" onClick={() => navigate('/create-courses')}>Create Course</button>
            </div>

            {/* For Large Screen Table */}
            <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-4">Courses</th>
                            <th className="text-left py-3 px-4">Price</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {creatorCourseData?.map((course, index) => (
                            <tr className="border-b hover:bg-gray-50 transition duration-200" key={index} >
                                <td className="py-3 px-4 flex items-center gap-4">
                                    {course?.thumbnail ? <img src={course?.thumbnail} alt="" className="w-25 h-14 object-cover rounded-md "/>
                                    : <img src={empty} alt="" className="w-25 h-14 object-cover rounded-md "/>
                                    }
                                    <span >{course?.title}</span>
                                </td>

                                {course?.price ? <td className="px-4 py-3">₹ {course?.price}</td> 
                                : <td className="px-4 py-3">₹ N/A</td>
                                }

                                <td className="px-4 py-3">
                                    <span className={`px-3 py-1 rounded-full ${course?.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600 '}`}>{course?.isPublished ? 'Published' : 'Draft'}</span>
                                </td>

                                <td className="px-4 py-3" onClick={() => navigate(`/edit-course/${course?._id}`)}>
                                    <BiSolidEdit className="text-gray-600 hover:text-blue-600 cursor-pointer w-6 h-6"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="text-center text-sm text-gray-400 mt-6 ">A list of your recent courses.</p>
            </div>

            {/* For Small Screen Table */}
            <div className="md:hidden space-y-4">
                {creatorCourseData?.map((course, index) => (
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3" key={index}>
                        <div className="flex gap-4 items-center">
                            {course?.thumbnail ? <img src={course?.thumbnail} alt="" className="w-16 h-16 rounded-md object-cover"/>
                                : <img src={empty} alt="" className="w-16 h-16 rounded-md object-cover"/>
                            }
                            <div className="flex-1">
                                <h2 className="font-medium text-sm">{course?.title}</h2>
                                {course?.price ? <p className="text-gray-600 text-xs mt-1">₹ {course?.price}</p>
                                : <p className="text-gray-600 text-xs mt-1">₹ N/A</p>
                                }
                            </div>

                            <BiSolidEdit className="text-gray-600 hover:text-blue-600 cursor-pointer w-6 h-6" onClick={() => navigate(`/edit-course/${course?._id}`)}/>
                        </div>

                        <span className={`w-fit px-3 text-xs py-1 rounded-full ${course?.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600 '}`}>{course?.isPublished ? 'Published' : 'Draft'}</span>
                    </div>
                ))}

                <p className="text-center text-sm text-gray-400 mt-4">A list of your recent courses.</p>
            </div>

        </div>
    </div>
  );
};

export default Courses;
