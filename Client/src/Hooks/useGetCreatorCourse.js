import axios from 'axios';
import React, { useEffect } from 'react'
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatorCourseData } from '../Redux/courseSlice';

const useGetCreatorCourse = () => {
    const dispatch = useDispatch();

    const {userData} = useSelector((state) => state.user);
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/course/get-creator-courses`, {
                    withCredentials: true
                });
                console.log(result.data)
                dispatch(setCreatorCourseData(result.data));
                
            } catch (error) {
                console.log(error);
                dispatch(setCreatorCourseData(null));
            }
        }
        fetchCourses();

    }, [dispatch, userData]);


}

export default useGetCreatorCourse
