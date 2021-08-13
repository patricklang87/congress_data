import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { setRecentUserEmail, setCurrentUser, setAuthMessage } from '../../redux/authSlice';
import { removeInterests } from '../../redux/interestsSlice';
import axios from 'axios';


export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserEmail = useSelector(state => state.auth.currentUserEmail);


    const logout = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/logout"
        }).then((res) => {
            dispatch(setRecentUserEmail(currentUserEmail));
            dispatch(setCurrentUser(null));
            dispatch(setAuthMessage(res.data.msg));
            dispatch(removeInterests());
            
            history.push('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
            <span onClick={logout}>Log Out</span>
    )
}
