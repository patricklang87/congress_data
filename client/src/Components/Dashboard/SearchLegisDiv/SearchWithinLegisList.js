import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerms, clearSearchTerms } from '../../../redux/searchSlice';
import axios from 'axios';
import { loadPotentialSenators, loadPotentialCongresspeople  } from '../../../redux/searchSlice';


export default function SearchWithinLegisList() {
    const dispatch = useDispatch();
    const nameSearchTerm = useSelector(state => state.search.nameSearchTerm);
    const stateSearchTerm = useSelector(state => state.search.stateSearchTerm);
    const districtSearchTerm = useSelector(state => state.search.districtSearchTerm);

//potential house and senate members should be dealt with through redux

const handleChange = (e) => {
    const data = {
        value: e.target.value,
        field: e.target.name
    };
    dispatch(updateSearchTerms(data))
}

const handleClearFields = () => {
    dispatch(clearSearchTerms());
}

const handleGetAll = () => {
    try {
        axios.get('http://localhost:4000/propublica/all')
            .then(results => {
                dispatch(loadPotentialCongresspeople(results.data.house));
                dispatch(loadPotentialSenators(results.data.senate));
            });
    } catch (err) {
        console.log(err);
    }
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
        height: "110px",
        opacity: 1
    }

    return (
        <div>
            <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Search Legislators</strong></span>
            </div>

            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                <input type="text" name="name" onChange={handleChange}  placeholder="Name" value={nameSearchTerm} /> <br />
                <input type="text" name="state" onChange={handleChange}  placeholder="State" value={stateSearchTerm} /> <br />
                <input type="text" name="district" onChange={handleChange} placeholder="District" value={districtSearchTerm} /> <br />
                <button onClick={handleGetAll}>Get Legislators</button> <br /> 
                <button onClick={handleClearFields}>Clear Fields</button>
            </div>
        </div>
    );
}