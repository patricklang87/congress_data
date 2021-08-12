import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthBox from './AuthBox';
import './Authentication.css';

export default function Authentication() {
    let currentUser = useSelector(state => state.auth.currentUser);
    
    if (currentUser) {
        return <Redirect to="/dashboard" />
    }

    return (       
        <div className="Authentication">
            <div className="welcome">
                <h2><i>LegisTracker</i> helps you follow bills, legislators and legislative subjects that matter to you.</h2>
            </div>
            <div className="authDiv">
                <AuthBox />
            </div>
        </div>
    );
}
