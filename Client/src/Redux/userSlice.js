import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        updateUserData: (state, action) => {
            state.userData = {
                ...state.userData,
                ...action.payload,
                user: {
                    ...state.userData?.user,
                    ...action.payload?.user,
                    enrolledCourses: action.payload?.user?.enrolledCourses || state.userData?.user?.enrolledCourses || []
                }
            };
        }
    }
});

export const { setUserData, updateUserData } = userSlice.actions;
export default userSlice.reducer;