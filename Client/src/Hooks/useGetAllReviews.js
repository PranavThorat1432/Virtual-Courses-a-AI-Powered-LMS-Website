import axios from 'axios';
import React, { useEffect } from 'react'
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setReviewData } from '../Redux/reviewSlice';

const useGetAllReviews = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/review/get-reviews`, {
                    withCredentials: true
                });
                console.log(result.data)
                dispatch(setReviewData(result.data));
                
            } catch (error) {
                console.log(error);
                dispatch(setReviewData(null));
            }
        }
        fetchReviews();

    }, []);
}

export default useGetAllReviews;
