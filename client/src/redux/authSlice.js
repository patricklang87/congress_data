import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authorized: false,
        recentUserEmail: null,
        currentUserEmail: null,
        currentUser: null
    },
    reducers: {
        setAuthorized: (state, action) => {
            state.authorized = action.payload;
        },
        setRecentUserEmail: (state, action) => {
            state.recentUserEmail = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.username;
            state.currentUserEmail = action.payload.email;
        }
    }
});

export const { setAuthorized, setRecentUserEmail, setCurrentUser } = authSlice.actions;
export default authSlice.reducer