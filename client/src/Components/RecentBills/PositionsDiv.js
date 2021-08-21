import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PositionsDiv({ voteDetails }) {
    const positions = voteDetails.positions;
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


    let backgroundColor = 'white';
    if (item.party === "D") backgroundColor = "rgb(61, 250, 250)";
    if (item.party === "R") backgroundColor = "rgb(252, 90, 90)";

        return (
            <div className="positionDatum" style={{backgroundColor: backgroundColor}} >
                <p>
                    {item.name} ({item.party}-{item.state}):{' '}
                     <span style={posStyle}>
                        {' ' + item.vote_position + ' '}
                    </span>
                </p>
            </div>
        );
    });



    return (
        <div>
            <div>
                <h4>{(showAll) ? "All Legislator Positions " : "Tracked Legislator Positions "}
                <span><button
                    onClick={() => { setShowAll(!showAll)}}>{(showAll) ? "Show Tracked" : "Show All" }
                </button></span></h4>
            </div>
            <div className="positionsList">
                {positionDisplay}
            </div>
        </div>
        
    )
}
