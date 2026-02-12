import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import image from '../../assets/empty.jpg'
import axios from "axios";
import { serverURL } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { setCourseData } from "../../Redux/courseSlice";

const EditCourse = () => {
  const navigate = useNavigate();
  const thumb = useRef();
  const {courseId} = useParams();
  const dispatch = useDispatch();
  const {courseData} = useSelector((state) => state.course);

  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [frontendImage, setFrontendImage] = useState(image);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/course/get-course/${courseId}`, {
        withCredentials: true
      });
      console.log(result.data);
      setSelectCourse(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(selectCourse) {
      setTitle(selectCourse?.title || '');
      setSubTitle(selectCourse?.subTitle || '');
      setDescription(selectCourse?.description || '');
      setCategory(selectCourse?.category || '');
      setLevel(selectCourse?.level || '');
      setPrice(selectCourse?.price || '');
      setFrontendImage(selectCourse?.thumbnail || image);
      setIsPublished(selectCourse?.isPublished || '');
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, []);


  const handleEditCourse = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('level', level);
    formData.append('price', price);
    formData.append('thumbnail', backendImage);
    formData.append('isPublished', isPublished);

    try {
      const result = await axios.post(`${serverURL}/api/course/edit-course/${courseId}`, formData, {
        withCredentials: true
      });
      console.log(result.data);

      const updateData = result.data;
      if(updateData?.isPublished) {
        const updateCourses = courseData?.map((course) => course._id === courseId ? updateData : course);

        if(!courseData.some((course) => course._id === courseId)) {
          updateCourses.push(updateData)
        }
        dispatch(setCourseData(updateCourses));

      } else {
        const filterCourses = courseData?.filter((course) => course._id !== courseId);
        dispatch(setCourseData(filterCourses));
      }

      setLoading(false);
      navigate('/courses');
      toast.success('Course Updated!');
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  
  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(`${serverURL}/api/course/remove-course/${courseId}`, {
        withCredentials: true
      });
      console.log(result.data);

      const filterCourses = courseData?.filter((course) => course._id !== courseId);
      dispatch(setCourseData(filterCourses));

      setLoading1(false);
      navigate('/courses');
      toast.success('Course Removed!');

    } catch (error) {
      console.log(error);
      setLoading1(false);
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-center gap-5 md:justify-between flex-col md:flex-row mb-6 relative">
        <IoIosArrowRoundBack
          className="w-7 h-7 absolute top-[-20%] md:top-[20%] left-[0%] md:left-[2%] cursor-pointer "
          onClick={() => navigate("/courses")}
        />

        <h2 className="text-xl font-semibold md:pl-15">
          Add Detail Information Regarding the Course
        </h2>

        <div className="space-y-2 space-x-2">
          <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => navigate(`/create-lecture/${courseId}`)}>
            Goto Lectures
          </button>
        </div>
      </div>

      {/* Form Details*/}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>

        <div className="space-y-2 space-x-2 mb-4">
          {!isPublished ? (
            <button className="bg-green-100 text-green-600 px-4 py-2 rounded-md border cursor-pointer hover:bg-green-200" onClick={() => setIsPublished(!isPublished)}>
              Click to Publish
            </button>
          ) : (
            <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer hover:bg-red-200" onClick={() => setIsPublished(!isPublished)}>
              Click to Unpublish
            </button>
          )}
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer hover:bg-red-200" onClick={handleRemoveCourse}>
            Remove Course
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" id="title" className="w-full border px-4 py-2 rounded-md" placeholder="Course Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
          </div>
          
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">SubTitle</label>
            <input type="text" id="subtitle" className="w-full border px-4 py-2 rounded-md" placeholder="Course Subtitle" onChange={(e) => setSubTitle(e.target.value)} value={subTitle}/>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea type="text" rows={3} id="description" className="w-full border px-4 py-2 rounded-md h-24 resize-none" placeholder="Course Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* Categories */}
            <div className="flex-1">
              <label htmlFor="cat" className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select id="cat" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black' onChange={(e) => setCategory(e.target.value)} value={category} required>
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Level */}
            <div className="flex-1">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
              <select id="level" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black' onChange={(e) => setLevel(e.target.value)} value={level} required>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Course Price (INR)</label>
              <input type="number" id="price" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black" placeholder="₹" onChange={(e) => setPrice(e.target.value)} value={price}/>
            </div>
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
            <input type="file" name="thumbnail" id="thumbnail" hidden ref={thumb} accept="image/*" onChange={handleThumbnail}/>
          </div>
          <div className="relative w-75 h-42.5 ">
            <img src={frontendImage} className="w-full h-full border border-black rounded-[5px] " alt="" onClick={() => thumb.current.click()}/>
          </div>

          <div className="flex items-center justify-start gap-3.75">
            <button className="bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-4 py-2 rounded-md" onClick={() => navigate('/courses')}>Cancel</button>

            <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer flex items-center justify-center gap-3' disabled={loading} onClick={handleEditCourse}>
              {loading ? (
                  <>
                      <MoonLoader size={20} color="#ffffff" />
                      <span>Saving...</span>
                  </>
              ) : 'Save'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCourse;
