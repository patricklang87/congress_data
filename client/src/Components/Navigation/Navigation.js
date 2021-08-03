import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './Navigation.css';

export default function Navigation() {
    const currentUser = useSelector(state => state.auth.currentUser);
    

    return (
        <div className="navBar">
            <div className="logo">
                <h3><i>LegisTracker</i></h3>
                
            </div>
            <nav>
                {currentUser ? <span><i>Welcome, <strong>{currentUser}</strong>!</i></span> : <span>Logged Out</span>}
                <Link to="/dashboard">Dashboard</Link>
                {currentUser ? <Logout /> : <Link to="/">Log In</Link>}
            </nav>   
        </div>
    )
}
