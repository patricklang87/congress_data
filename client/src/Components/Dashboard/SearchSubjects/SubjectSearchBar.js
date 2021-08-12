import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubjectSearch } from '../../../redux/searchSlice';

export default function SubjectSearchBar() {
    let [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addSubjectSearch(searchTerm));
        //here you'll submit an axios request
    }

    return (
        <div>
            <p><strong>Find A Subject</strong></p>
            <input onChange={(e) => {setSearchTerm(e.target.value)}} name='subjectSearch' type='text' placeholder='Subject Search' />
            <button onClick={handleClick}>Find Subjects</button>
        </div>
    )
}
