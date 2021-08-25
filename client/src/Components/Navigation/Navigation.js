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
    const navVisible = useSelector(state => state.views.navVisible);
    const location = useLocation().pathname;
    
    const navVisStyle = {
        backgroundColor: 'red',
        fontColor: 'white',
        padding: '5px',
        borderRadius: '5px'

    }

    const navNotVis = {
        borderRadius: '5px',
        border: 'solid white 1px',
        padding: '5px'
    }

    return (
        <div>
            <div className="navBar">
                <div className="logo">
                    <h3><i>LegisTracker</i></h3>
                    
                </div>
                <nav>
                    {(location === '/dashboard') && <span style={(navVisible) ? navVisStyle : navNotVis} onClick={() => {dispatch(toggleNavVisible())} }>Nav</span>} 

                    {(location === '/') && <Link to="/dashboard">Dashboard</Link>}
                    {(currentUserEmail) && <Logout />}
                    {(!currentUserEmail && location === '/dashboard') && <Link to="/">Log In</Link>}
                </nav>   
            </div>

            
            {(location === '/dashboard') && 
            <div className="dashnav" >
                <DashNav />
            </div>}    
</div>

    )
}
