import React, { useState } from 'react';
import VoteCard from './VoteCard';

export default function VoteList({ votes }) {
    

    let votesDisplay = votes.map((vote) => {
        return (
            <VoteCard vote={vote} />
        )
    });

    return (
        <div>
            {votesDisplay}
        </div>
    )
}
