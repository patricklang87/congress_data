import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        recentUserEmail: null,
        currentUserEmail: null
    },
    reducers: {
        setRecentUserEmail: (state, action) => {
            state.recentUserEmail = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUserEmail = action.payload.email;
        }
    }
});

export const { setRecentUserEmail, setCurrentUser } = authSlice.actions;
export default authSlice.reducer