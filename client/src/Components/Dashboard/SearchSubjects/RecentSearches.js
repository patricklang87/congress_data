import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSubjectSearch } from '../../../redux/searchSlice';


export default function RecentSearches() {
    const dispatch = useDispatch();
    const subjectSearches = useSelector(state => state.search.subjectSearches);

    const handleRemove = (i) => {
        console.log(i);
        dispatch(removeSubjectSearch(i));
    }

    let list = subjectSearches.map(term => {
        return (
            <div key={term + '_recent'} className="listTerm">
                <div>
                     <p>{term}</p>
                </div>
                <div>
                    <p onClick={() => handleRemove(term)}>X</p>
                </div>
                
            </div>                  
        );
    });

    ///Change visibility for get district option

    const [navVisible, setNavVisible] = useState(false);

    const toggleNavVisible = () => {
        let newToggleValue = !navVisible;
        setNavVisible(newToggleValue);
    }

    const notVisible = {
        minHeight: "0px",
        maxHeight: "0px",
        opacity: 0,
        overflow: "hidden",
        border: "none",
        marginRight: "30px"
    }

    const visible = {
        minHeight: "120px",
        maxHeight: "240px",
        opacity: 1,
        border: "solid 1px grey",
        marginRight: "30px",
        overflow: "auto"
    }


    return (
        <div>
            <div onClick={toggleNavVisible}>
                <span style={{display: "inline"}} >&#10148;</span><span><strong> Recent Searches</strong></span>
            </div>
            <div className="dashNavOptions" style={(!navVisible) ? notVisible : visible}>
                {list}
            </div>
        </div> 
    )
}
