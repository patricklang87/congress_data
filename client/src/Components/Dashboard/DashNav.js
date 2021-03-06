import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchLegislators from './SearchLegisDiv/SearchLegislators';
import SearchSubjects from './SearchSubjects/SearchSubjects';
import MyLegisDiv from './MyLegisDiv/MyLegisDiv';
import MySubjectsDiv from './MySubjectsDiv/MySubjectsDiv';
import RecentBillsDiv from './RecentBillsNav/RecentBillsDiv';
import { setDashFolder } from '../../redux/viewsSlice';

export default function DashNav() {
    const dispatch = useDispatch();
    const currentDashFolder = useSelector(state => state.views.dashFolder);
    const dashNavVisible = useSelector(state => state.views.navVisible);
    
    //change dash folder

    const handleSelect = (item) => {
        dispatch(setDashFolder(item))
    }


    //handle navigation visibility
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
        height: "110px",
        opacity: 1
    }

    const barVis = {
        right: '0px'
    }

    const barNotVis = {
        right: '-201px'
    }

    return (
        <div className="dashNavBar" style={(dashNavVisible) ? barVis : barNotVis}>    
            <div>
                <div>
                    <h3>
                        {currentDashFolder}
                    </h3>
                </div>

                <div>
                    <div onClick={toggleNavVisible}>
                        <span style={{display: "inline", fontSize: "20px" }}>&#10148;</span><span><strong> Navigation</strong></span>
                    </div> 
                </div>
                <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                    <p onClick={() => handleSelect('Recent Bills')}>Recent Bills</p>
                    <p onClick={() => handleSelect('My Legislators')} >My Legislators</p>
                    <p onClick={() => handleSelect('My Subjects')}>My Subjects</p>
                    <p onClick={() => handleSelect('Find Legislators')} >Find Legislators</p>
                    <p onClick={() => handleSelect('Find Subjects')}>Find Subjects</p>
                </div>
                <div>
                    {(currentDashFolder === 'Find Legislators') && <SearchLegislators />}
                    {(currentDashFolder === 'Find Subjects') && <SearchSubjects />}
                    {(currentDashFolder === 'My Legislators') && <MyLegisDiv />}
                    {(currentDashFolder === 'My Subjects') && <MySubjectsDiv />}
                    {(currentDashFolder === 'Recent Bills') && <RecentBillsDiv />}
                    {(currentDashFolder === 'My Bills') && <RecentBillsDiv />}
                </div>
            </div>
        </div>
    )
}
