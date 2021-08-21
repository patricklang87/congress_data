import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './Navigation.css';
import DashNavTwo from './DashNavTwo';

export default function Navigation() {
    const currentUserEmail = useSelector(state => state.auth.currentUserEmail);
    const [showNav, setShowNav] = useState(false);
    const location = useLocation().pathname;
    
    console.log(location);

    return (
        <div>
            <div className="navBar">
                <div className="logo">
                    <h3><i>LegisTracker</i></h3>
                    
                </div>
                <nav>
                    {/* {currentUserEmail ? <span><i>Welcome, <strong>{currentUserEmail}</strong>!</i></span> : <span>Logged Out</span>} */}
                    <span onClick={() => {setShowNav(!showNav)}}>Nav</span>

                    {(location === '/') && <Link to="/dashboard">Dashboard</Link>}
                    {(currentUserEmail) && <Logout />}
                    {(!currentUserEmail && location === '/dashboard') && <Link to="/">Log In</Link>}
                </nav>   
            </div>
            <div style={(showNav) ? {display: "block"} : {display: "none"}}>
                <DashNavTwo />
            </div>
</div>

    )
}
