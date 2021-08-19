import React, { useState } from 'react';
// import PositionsDiv from './PositionsDiv';
import RecentVoteBillDetails from './RecentVoteBillDetails';

export default function RecentVoteCard({ vote }) {
    const [mainHidden, setMainHidden] = useState(false);
    const voteData = vote.results.votes.vote;

    let cardMainStyle;
    if (mainHidden) cardMainStyle = {display: "none"};
    else cardMainStyle = {display: "block"};

    return (
        <div className="recentVoteCard" >
            <div className="cardHeading">
                <div className="cardShortTitleDiv">
                    <p>{voteData.bill.number} {voteData.bill.short_title}</p>
                </div>
                 <div>
                     <button>Bookmark</button>
                     <button onClick={() => setMainHidden(!mainHidden)}>{(mainHidden) ? "Show" : "Hide"}</button>
                 </div>
                 
            </div>
            <div className="cardMain" style={cardMainStyle}>
                <div className="cardContent">
                    <div className="cardLongTitleDiv">
                        <p>{voteData.chamber} {voteData.congress} {voteData.date}</p>
                        <RecentVoteBillDetails voteData={voteData} />
                        <p>Question: {voteData.question}</p>
                    </div>
                    <div className="cardResultsDiv"> 
                        <p>Result: {voteData.result}</p>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Party</th>
                                    <th>Yea</th>
                                    <th>Nay</th>
                                </tr>
                                <tr>
                                    <th>Democratic</th>
                                    <td>{voteData.democratic.yes}</td>
                                    <td>{voteData.democratic.no}</td>
                                </tr>
                                <tr>
                                    <th>Republican</th>
                                    <td>{voteData.republican.yes}</td>
                                    <td>{voteData.republican.no}</td>
                                </tr>
                                <tr>
                                    <th>Independent</th>
                                    <td>{voteData.independent.yes}</td>
                                    <td>{voteData.independent.no}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    {/* <PositionsDiv voteData={voteData} /> */}
                </div>
            </div>
            
            
            
        </div>
    )
}
