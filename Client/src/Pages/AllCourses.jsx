import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import { useSelector } from 'react-redux';
import Card from '../Components/Card';


const AllCourses = () => {

    const navigate = useNavigate();
    const {courseData} = useSelector((state) => state.course);

    const [category, setCategory] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleCategory = async (e) => {
        if(category.includes(e.target.value)) {
            setCategory(prev => prev.filter(c => c !== e.target.value));
        
        } else {
            setCategory(prev => [...prev, e.target.value]);
        } 
    };

    const applyFilter = () => {
        let courseCopy = courseData?.slice();
        if(category?.length > 0) {
            courseCopy = courseCopy?.filter((c) => category?.includes(c.category));
        }
        setFilterCourses(courseCopy);
    };

    useEffect(() => {
        setFilterCourses(courseData)
    }, [courseData]);

    useEffect(() => {
        applyFilter()
    }, [category]);


    return (
        <div className='flex min-h-screen bg-gray-50'> 
            <Navbar/>

            <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hiddenborder border-black sm:hidden' onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
                {isSidebarVisible ? 'Hide' : 'Show'} Filters
            </button>

            {/* Sidebar */}
            <aside className={`w-65 h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-32.5 border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:block md:translate-x-0`}>
                
                <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'>
                    <IoIosArrowRoundBack className='w-8 h-8 cursor-pointer' onClick={() => navigate('/')}/>
                    Filter by Category
                </h2>

                <form className='space-y-4 text-sm bg-gray-600 border-white text-white border p-5 rounded-2xl' onSubmit={(e) => e.preventDefault()}>
                    <button className='px-2.5 py-2.5 bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={() => navigate('/search')}>
                        Search with AI
                        <img
                            src={ai1}
                            alt=""
                            className="w-6.5 h-6.5 rounded-full "
                        />{" "}
                    </button>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'App Development'}/> App Development
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'AI/ML'}/> AI/ML
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'AI Tools'}/> AI Tools
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Data Science'}/> Data Science
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Data Science'}/> Data Science
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Ethical Hacking'}/> Ethical Hacking
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'UI/UX Designing'}/> UI/UX Designing
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Web Development'}/> Web Development
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Others'}/> Others
                    </label>
                </form>
            </aside>

            <main className='w-full transition-all duration-300 py-32.5 md:pl-75 px-2.5'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filterCourses?.map((course, index) => (
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
            </main>
        </div>
    )
}

export default AllCourses
