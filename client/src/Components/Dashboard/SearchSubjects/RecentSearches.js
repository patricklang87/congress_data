import React from 'react';
import { useSelector } from 'react-redux'


export default function RecentSearches() {
    const subjectSearches = useSelector(state => state.search.subjectSearches);

    let list = subjectSearches.map(term => {
        return (
            <div className="listTerm">
                <p>{term}</p><p>X</p> 
            </div>                  
        );
    })


    return (
        <div>
            {list}
        </div>
    )
}
