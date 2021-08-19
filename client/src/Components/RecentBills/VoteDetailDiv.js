import React from 'react';
import PositionsDiv from './PositionsDiv';

export default function VoteDetailDiv({voteDetails}) {
    return (
        <div>
            <div>
                <p style={{textDecoration: 'underline', marginTop: '5px'}}>{voteDetails.question_text}</p>
                <p style={{padding: '10px'}}>{voteDetails.description}</p>
            </div>
            <PositionsDiv voteDetails={voteDetails} />
        </div>

    )
}
