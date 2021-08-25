import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setByTrackedSubjects } from '../../../redux/billsSlice';
import { setDashFolder } from '../../../redux/viewsSlice';



export default function RecentBillsNav() {
    const dispatch = useDispatch();
    const byTrackedSubjects = useSelector(state => state.bills.byTrackedSubjects);
    const trackedSubjects = useSelector(state => state.interests.subjects);
    const dashFolder = useSelector(state => state.views.dashFolder);

    const handleClick = (input) => {
        dispatch(setDashFolder('Recent Bills'));
        dispatch(setByTrackedSubjects(input));
    }


    const [navVisible, setNavVisible] = useState(true);

    const toggleNavVisible = () => {
        let newToggleValue = !navVisible;
        setNavVisible(newToggleValue);
    }

    const notVisible = {
        height: "0px",
        opacity: 0,
        overflow: "hidden"
    }

    const visible = {
        height: "60px",
        opacity: 1
    }

    const underlined = {
        textDecoration: 'underline'
    }

    return (
        <div>
             <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Select Set</strong></span>
             </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                {(trackedSubjects.length > 0) && 
                    <p style={(dashFolder === 'Recent Bills' && byTrackedSubjects) ? underlined : {}} onClick={() => handleClick(true)}>Tracked Subjects</p>
                }
                <p style={(dashFolder === 'Recent Bills' && !byTrackedSubjects) ? underlined : {}} onClick={() => handleClick(false)}>All Recent</p>
                <p style={(dashFolder === 'My Bills') ? underlined : {}} onClick={() => dispatch(setDashFolder('My Bills'))}>Bookmarked</p>
            </div>
        </div>
    );
}
