import React, { useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import VoteDetailDiv from './VoteDetailDiv';

export default function VoteCard({ vote }) {
    const [voteDetails, setVoteDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDetails = () => {
        const url = vote.api_url;
        console.log('url', url)
        setLoading(true);
        try {
            axios({
                method: "GET",
                params: {url: url},
                url: `http://localhost:4000/propublica/voteDetails`
            }).then((res) => {
                let results = res.data;
                return results;
            }).then((res) => {
                console.log(res);
                setVoteDetails(res);
                setLoading(false);
            });
        } catch (err) {
            console.log(err)
        }
    }

    const Loader = () => {
        return (
            <div>
                <BeatLoader loading={loading} color="darkred" size={50} />
            </div>
        )
    }




    return (
        <div className="voteCard">
            <div className="voteHeading"> 
                <div >
                    <p style={{textDecoration: 'underline'}}>{vote.chamber} Roll Call {vote.roll_call} on {vote.date} </p>
                    <p>Result: {vote.result}</p> 
                </div>
                <div>
                    <button onClick={fetchDetails}>Show Details</button>
                </div>
            </div>
            <div>
                <Loader />
                {(voteDetails) && <VoteDetailDiv voteDetails={voteDetails.results.votes.vote} />}
            </div>          
        </div>
    )
}
