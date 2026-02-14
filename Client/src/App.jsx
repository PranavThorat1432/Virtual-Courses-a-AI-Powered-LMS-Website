import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import SignIn from './Pages/SignIn'
import { ToastContainer } from 'react-toastify';
import useGetCurrentUser from './Hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile'
import ForgotPassword from './Pages/ForgotPassword'
import EditProfile from './Pages/EditProfile'
import Dashboard from './Pages/Educator/Dashboard'
import Courses from './Pages/Educator/Courses'
import EditCourse from './Pages/Educator/EditCourse'
import CreateCourses from './Pages/Educator/CreateCourses'
import useGetCreatorCourse from './Hooks/useGetCreatorCourse'
import useGetPublishedCourse from './Hooks/useGetPublishedCourse'
import AllCourses from './Pages/AllCourses'
import CreateLecture from './Pages/Educator/CreateLecture'
import EditLecture from './Pages/Educator/EditLecture'
import ViewCourse from './Pages/ViewCourse'
import ScrollToTop from './Components/ScrollToTop'
import ViewLectures from './Pages/ViewLectures'
import MyEnrolledCourses from './Pages/MyEnrolledCourses'
import useGetAllReviews from './Hooks/useGetAllReviews'
import SearchWithAI from './Pages/SearchWithAI'

export const serverURL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  useGetCurrentUser();
  useGetCreatorCourse();
  useGetPublishedCourse();
  useGetAllReviews();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />
      <ScrollToTop/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData?.user ? <Signup/> : <Navigate to={'/'}/>}/>
        <Route path='/signin' element={!userData?.user ? <SignIn/> : <Navigate to={'/'}/>}/>
        <Route path='/profile' element={userData?.user ? <Profile/> : <Navigate to={'/signin'}/>}/>
        <Route path='/forgot-password' element={!userData?.user ? <ForgotPassword/> : <Navigate to={'/'}/>}/>
        <Route path='/edit-profile' element={userData?.user ? <EditProfile/> : <Navigate to={'/signin'}/>}/>
        <Route path='/dashboard' element={userData?.user?.role === 'Educator' ? <Dashboard/> : <Navigate to={'/signin'}/>}/>
        <Route path='/courses' element={userData?.user?.role === 'Educator' ? <Courses/> : <Navigate to={'/signin'}/>}/>
        <Route path='/create-courses' element={userData?.user?.role === 'Educator' ? <CreateCourses/> : <Navigate to={'/signin'}/>}/>
        <Route path='/edit-course/:courseId' element={userData?.user?.role === 'Educator' ? <EditCourse/> : <Navigate to={'/signin'}/>}/>
        <Route path='/all-courses' element={userData?.user ? <AllCourses/> : <Navigate to={'/signin'}/>}/>
        <Route path='/create-lecture/:courseId' element={userData?.user?.role === 'Educator' ? <CreateLecture/> : <Navigate to={'/signin'}/>}/>
        <Route path='/edit-lecture/:courseId/:lectureId' element={userData?.user?.role === 'Educator' ? <EditLecture/> : <Navigate to={'/signin'}/>}/>
        <Route path='/view-course/:courseId' element={userData?.user ? <ViewCourse/> : <Navigate to={'/signin'}/>}/>
        <Route path='/view-lectures/:courseId' element={userData?.user ? <ViewLectures/> : <Navigate to={'/signin'}/>}/>
        <Route path='/myEnrolled-courses' element={userData?.user ? <MyEnrolledCourses/> : <Navigate to={'/signin'}/>}/>
        <Route path='/search' element={userData?.user ? <SearchWithAI/> : <Navigate to={'/signin'}/>}/>
      </Routes>
    </>
  )
}

export default App
