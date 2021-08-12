import React from 'react';
import './Dashboard.css';
import DashNav from './DashNav';
import { useDispatch, useSelector } from 'react-redux';
import LegislatorsList from '../SeachComponents/FindLegislators/LegislatorsList';
import MyLegislators from '../MyComponents/MyLegislators/MyLegislators';
import axios from 'axios';


const isAuth = async () => {
    let res = await axios.get('http://localhost:4000/auth/protected-route');
    console.log(res);
}

export default function Dashboard() {
    const currentDashFolder = useSelector(state => state.views.dashFolder);

    return (
        
        <div className="Dashboard">     
        
        <div className="dashnav">
        <button onClick={isAuth}>Is Auth?</button>
            <DashNav />
        </div>      
            <div className="dash-table">
                {(currentDashFolder === 'Find Legislators') && <LegislatorsList />}
                {(currentDashFolder === 'My Legislators') && <MyLegislators />}
            </div>
        </div>
    )
}
