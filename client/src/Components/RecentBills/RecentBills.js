import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecentVoteCard from './RecentVoteCard';
import './RecentVotes.css';
import BeatLoader from 'react-spinners/BeatLoader';

export default function RecentBills() {
    const [recentVotes, setRecentVotes] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            // withCredentials: true,
            url: "http://localhost:4000/propublica/recentVotes"
          }).then((res) => {
            console.log(res.data);
            setLoading(false);
            setRecentVotes(res.data);
            
          }).catch((err) => {
              console.log(err);
          }); 

    }, []);

    const recentVotesDisplay = recentVotes.map(vote => {
        return <RecentVoteCard vote={vote} key={vote.results.votes.vote.bill.number + '_' + vote.results.votes.vote.date + '_' + vote.results.votes.vote.question} />
    })

    const Loader = () => {
        return (
            <div style={{top: '200px', position: "relative"}}>
                <BeatLoader loading={loading} top={150} color="darkred" size={100} />
            </div>
        )
    }

    return (
        <div>
            {(loading) ? <Loader /> : recentVotesDisplay}
        </div>

    )
}