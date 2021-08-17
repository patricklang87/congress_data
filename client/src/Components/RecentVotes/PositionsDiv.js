import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PositionsDiv({ voteData }) {
    const positions = voteData.positions;
    const [showAll, setShowAll] = useState(false);
   
    const houseTracked = useSelector(state => state.interests.legislators.congresspeople);
    const senateTracked = useSelector(state => state.interests.legislators.senators);
    const allTracked = [...houseTracked, ...senateTracked];

    const allTrackedIds = allTracked.map(item => item.id);

    let positionsList = positions;
    if (!showAll) positionsList = positions.filter(item => {
        return allTrackedIds.includes(item.member_id);
    });



    

    const positionDisplay = positionsList.map(item => {
        let posStyle;
        if (item.vote_position === "Yes") posStyle = {backgroundColor: 'lightgreen'};
        if (item.vote_position === "No") posStyle = {backgroundColor: 'pink'};     


        return (
            <div className="positionDatum" >
                <p>
                    {item.name}, {item.party}, {item.state}-{item.district}:
                     <span style={posStyle}>
                        {item.vote_position}
                    </span>
                </p>
            </div>
        );
    });



    return (
        <div>
            <div>
                <button
                    onClick={() => { setShowAll(!showAll)}}>{(showAll) ? "Show Tracked" : "Show All" }
                </button>
            </div>
            <div className="positionsList">
                {positionDisplay}
            </div>
        </div>
        
    )
}
