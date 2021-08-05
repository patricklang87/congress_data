import React from 'react';
import './Dashboard.css';
import DashNav from './DashNav';
import { useDispatch, useSelector } from 'react-redux';
import LegislatorsList from '../SeachComponents/FindLegislators/LegislatorsList';


export default function Dashboard() {

    return (
        <div className="Dashboard">     
        <div className="dashnav">
            <DashNav />
        </div>      
            <div className="dash-table">
                <LegislatorsList />
            </div>
        </div>
    )
}
