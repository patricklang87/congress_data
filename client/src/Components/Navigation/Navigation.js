import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './Navigation.css';
import DashNav from '../Dashboard/DashNav'
import { toggleNavVisible } from '../../redux/viewsSlice';

export default function Navigation() {
    const dispatch = useDispatch();
    const currentUserEmail = useSelector(state => state.auth.currentUserEmail);
    const location = useLocation().pathname;
    
    console.log(location);

    return (
        <div>
            <div className="navBar">
                <div className="logo">
                    <h3><i>LegisTracker</i></h3>
                    
                </div>
                <nav>
                    <span onClick={() => {dispatch(toggleNavVisible())} }>Nav</span>

                    {(location === '/') && <Link to="/dashboard">Dashboard</Link>}
                    {(currentUserEmail) && <Logout />}
                    {(!currentUserEmail && location === '/dashboard') && <Link to="/">Log In</Link>}
                </nav>   
            </div>

            <div className="dashnav" >
                <DashNav />
            </div>    
</div>

    )
}
