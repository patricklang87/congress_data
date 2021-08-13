import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './Navigation.css';

export default function Navigation() {
    const currentUserEmail = useSelector(state => state.auth.currentUserEmail);
    

    return (
        <div className="navBar">
            <div className="logo">
                <h3><i>LegisTracker</i></h3>
                
            </div>
            <nav>
                {currentUserEmail ? <span><i>Welcome, <strong>{currentUserEmail}</strong>!</i></span> : <span>Logged Out</span>}
                <Link to="/dashboard">Dashboard</Link>
                {currentUserEmail ? <Logout /> : <Link to="/">Log In</Link>}
            </nav>   
        </div>
    )
}
