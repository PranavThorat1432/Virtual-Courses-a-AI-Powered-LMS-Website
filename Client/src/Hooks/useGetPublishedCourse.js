import axios from 'axios';
import React, { useEffect } from 'react'
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Redux/userSlice';
import { setCourseData } from '../Redux/courseSlice';

const useGetPublishedCourse = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        const getCourseData = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/course/get-published-courses`, {
                    withCredentials: true
                });
                dispatch(setCourseData(result.data));
                console.log(result.data);

            } catch (error) {
                console.log(error);
                dispatch(setCourseData(null));
            }
        }
        getCourseData();

    }, [dispatch]);
}

export default useGetPublishedCourse
