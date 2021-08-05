import React, { useState } from 'react';
import SearchLegislators from './SearchLegislators';

export default function DashNav() {
    const [navVisible, setNavVisible] = useState(true);

    const toggleNavVisible = () => {
        let newToggleValue = !navVisible;
        setNavVisible(newToggleValue);
    }

    const notVisible = {
        height: "0px",
        opacity: 0,
        overflow: "hidden",
        // transition: "height 250ms ease-in-out"
    }

    const visible = {
        height: "110px",
        opacity: 1,
        // transition: "height 250ms ease-in-out"
    }

    return (
        <div className="dashNavBar">
            <div>
                <h1><strong>Dashboard</strong></h1>
            </div>    
            <div>
                <div>
                    <div onClick={toggleNavVisible}>
                        <span style={{display: "inline", fontSize: "20px", transform: "rotate(90deg)"}}>&#10148;</span><span><strong> Navigation</strong></span>
                    </div> 
                </div>
                <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                    <p>Current</p>
                    <p>My Legislators</p>
                    <p>My Subjects</p>
                    <p>Find Legislators</p>
                    <p>Find Subjects</p>
                </div>
                <div>
                    <SearchLegislators />
                </div>
            </div>
        </div>
    )
}
