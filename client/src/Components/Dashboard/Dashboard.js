import React, { useEffect } from 'react';
import './Dashboard.css';
import DashNav from './DashNav';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/authSlice';
import { loadInterests } from '../../redux/interestsSlice';
import LegislatorsList from '../SeachComponents/FindLegislators/LegislatorsList';
import MyLegislators from '../MyComponents/MyLegislators/MyLegislators';
import SubjectsList from '../SeachComponents/FindSubjects/SubjectsList';
import MySubjects from '../MyComponents/MySubjects/MySubjects';
import RecentBills from '../RecentBills/RecentBills';
import MyBills from '../MyComponents/MyBills/MyBills';
import axios from 'axios';


const isAuth = () => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/auth/protected-route"
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/userData/data"
          }).then((res) => {
            if (res.data.username && res.data.interests) {
                dispatch(setCurrentUser(res.data.username));
                dispatch(loadInterests(res.data.interests));
            }
          }).catch((err) => {
              console.log(err);
          }); 
    }, [dispatch]);



    const currentDashFolder = useSelector(state => state.views.dashFolder);

    return (
        
        <div className="Dashboard">     
        
        <div className="dashnav">
        <button onClick={isAuth}>Is Auth?</button>
            <DashNav />
        </div>      
            <div className="dash-table">
                {(currentDashFolder === 'Recent Bills') && <RecentBills />}
                {(currentDashFolder === 'My Bills') && <MyBills />}
                {(currentDashFolder === 'Find Legislators') && <LegislatorsList />}
                {(currentDashFolder === 'My Legislators') && <MyLegislators />}
                {(currentDashFolder === 'Find Subjects') && <SubjectsList />}
                {(currentDashFolder === 'My Subjects') && <MySubjects />}
            </div>
        </div>
    )
}
