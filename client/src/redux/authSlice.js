import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        recentUserEmail: null,
        currentUserEmail: null,
        authMessage: null
    },
    reducers: {
        setRecentUserEmail: (state, action) => {
            state.recentUserEmail = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUserEmail = action.payload;
        },
        setAuthMessage: (state, action) => {
            state.authMessage = action.payload;
        }
    }
});

export const { setRecentUserEmail, setCurrentUser, setAuthMessage } = authSlice.actions;
export default authSlice.reducer