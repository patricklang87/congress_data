import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthBox from './AuthBox';
import axios from 'axios';
import { setCurrentUser } from '../../redux/authSlice';
import { loadInterests } from '../../redux/interestsSlice';
import './Authentication.css';

export default function Authentication() {
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/userData/data"
          }).then((res) => {
            if (res.data.username && res.data.interests) {
                dispatch(setCurrentUser(res.data.username));
                dispatch(loadInterests(res.data.interests));
                history.push('/dashboard');
            }
          }).catch((err) => {
              console.log(err);
          }); 
    }, [dispatch, history]);


    let currentUser = useSelector(state => state.auth.currentUser);
    
    if (currentUser) {
        return <Redirect to="/dashboard" />
    }

    return (       
        <div className="Authentication">
            <div className="welcome">
                <h2><i>LegisTracker</i> helps you follow bills, legislators and legislative subjects that matter to you.</h2>
            </div> 
            <div className="photoCredit">
                <p>Photo by <a href="https://unsplash.com/@angelvela?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Louis Velazquez</a> on <a href="https://unsplash.com/s/photos/capitol-building?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
            </div>
            <div className="authDiv">
                <AuthBox />
            </div>

        </div>
    );
}
