import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerms, clearSearchTerms } from '../../redux/searchSlice';
import axios from 'axios';
import { loadPotentialSenators, removePotentialSenator, loadPotentialCongresspeople, removePotentialCongressperson } from '../../redux/searchSlice';


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
                console.log("results: ", results.data.house);
                dispatch(loadPotentialCongresspeople(results.data.house));
                dispatch(loadPotentialSenators(results.data.senate));
            });
    } catch (err) {
        console.log(err);
    }
}


    return (
        <div className="searchWithinLegislators">
            <p><strong>Search Legislators</strong></p>
            <input type="text" name="name" onChange={handleChange}  placeholder="Name" value={nameSearchTerm} /> <br />
            <input type="text" name="state" onChange={handleChange}  placeholder="State" value={stateSearchTerm} /> <br />
            <input type="text" name="district" onChange={handleChange} placeholder="District" value={districtSearchTerm} /> <br />
            <button onClick={handleGetAll}>Get Legislators</button> <br /> 
            <button onClick={handleClearFields}>Clear Fields</button>
        </div>
    )
}