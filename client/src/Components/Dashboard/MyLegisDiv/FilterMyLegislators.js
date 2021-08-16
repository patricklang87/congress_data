import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLegislatorFilterTerm } from '../../../redux/interestsSlice';

export default function FilterMyLegislators() {
    const dispatch = useDispatch();
    const filterTerm = useSelector(state => state.interests.legislatorFilterTerm);

//potential house and senate members should be dealt with through redux

const handleChange = (e) => {
    dispatch(setLegislatorFilterTerm(e));
}

const handleClear = () => {
    dispatch(setLegislatorFilterTerm(''));
}

//Show or hide search options:
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
        height: "20px",
        opacity: 1
    }

    return (
        <div>
            <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Filter Legislators</strong></span>
            </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                <input type="text" onChange={(e) => {handleChange(e.target.value)} } placeholder="Filter term" value={filterTerm} />
                <button onClick={handleClear}>X</button>
            </div>
        </div>
    );
}