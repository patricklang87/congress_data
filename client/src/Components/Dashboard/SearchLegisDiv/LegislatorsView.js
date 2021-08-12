import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLegislatorView } from '../../../redux/viewsSlice';


export default function LegislatorsView() {
    const dispatch = useDispatch();

    const handleClick = (view) => {
        dispatch(setLegislatorView(view));
    }


    const [navVisible, setNavVisible] = useState(false);

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

    return (
        <div>
             <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Select View</strong></span>
             </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                <p onClick={() => handleClick('house')}>House First</p>
                <p onClick={() => handleClick('senate')}>Senate First</p>
                <p onClick={() => handleClick('sideBySide')}>Side-by-Side</p>
            </div>
        </div>
    );
}
