import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setRecentUserEmail, setCurrentUser, setAuthorized } from '../../redux/authSlice';
import axios from 'axios';


export default function Logout() {
    const dispatch = useDispatch();
    const currentUserEmail = useSelector(state => state.auth.currentUserEmail);


    const logout = async () => {

        try {
            let response = await axios.get('http://localhost:4000/auth/logout');
            console.log(response);
            dispatch(setRecentUserEmail(currentUserEmail));
            dispatch(setCurrentUser({currentUser: null, currentUserEmail: null}));
            dispatch(setAuthorized(false));
            return <Redirect to="/authentication" />;
        } catch (err) {
            console.log(err);
        }
    }

    return (
            <span onClick={logout}>Log Out</span>
    )
}
