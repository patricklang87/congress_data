import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSubjectFilterTerm } from '../../../redux/interestsSlice';

export default function FilterMySubjects() {
    const dispatch = useDispatch();

    const handleChange = (i) => {
        dispatch(setSubjectFilterTerm(i))
    }

     ///Change visibility for get district option

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
         height: "25px",
         opacity: 1
     }

    return (
        <div>
             <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Filter Subjects</strong></span>
            </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                <input type="text" placeholder="Filter Term" onChange={(e) => {handleChange(e.target.value)}} />
                <button onClick={() => {handleChange('')}}>X</button>
            </div>
        </div>
    )
}
