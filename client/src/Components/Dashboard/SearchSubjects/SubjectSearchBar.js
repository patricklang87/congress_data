import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubjectSearch, loadPotentialSubjects, clearPotentialSubjects } from '../../../redux/searchSlice';
import axios from 'axios';

export default function SubjectSearchBar() {
    let [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addSubjectSearch(searchTerm));
        const data = searchTerm;
        axios.get('http://localhost:4000/propublica/subjects', { params: data })
            .then(response => {
                let subjects = response.data.results[0].subjects;
                return subjects; 
            }).then(subjs => {
                dispatch(loadPotentialSubjects(subjs));
            }).catch((err) => {
                console.log(err);
        });
    }

    const handleClear = () => {
        dispatch(clearPotentialSubjects());
    }

       ///Change visibility for get district option

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
           height: "70px",
           opacity: 1,
       }
    

    return (
        <div>
            <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Find a Subject</strong></span>
            </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                <input onChange={(e) => {setSearchTerm(e.target.value)}} name='subjectSearch' type='text' placeholder='Subject Search' />
                <button onClick={handleClick}>Find Subjects</button><br />
                <button onClick={handleClear}>Clear Results</button>
            </div>
        </div>
    )
}
