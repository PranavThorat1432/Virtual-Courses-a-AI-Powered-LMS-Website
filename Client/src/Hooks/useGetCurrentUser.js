import axios from 'axios';
import React, { useEffect } from 'react'
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Redux/userSlice';

const useGetCurrentUser = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/user/get-current`, {
                    withCredentials: true
                });
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null));
            }
        }
        fetchUser();

    }, [dispatch]);


}

export default useGetCurrentUser
