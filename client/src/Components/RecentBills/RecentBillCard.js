import React, {useState} from 'react';
import LegisSearchCard from '../SeachComponents/FindLegislators/LegisSearchCard';
import VoteList from './VoteList';

export default function RecentBillCard({ bill }) {
    const [hide, setHide] = useState(false);
    const [showFullTitle, setShowFullTitle] = useState(false);
    const [showVotes, setShowVotes] = useState(false);


    const sponsorNames = bill.sponsor.split(' ');
    const sponsorFirstName = sponsorNames[0];
    const sponsorLastName = sponsorNames[sponsorNames.length -1];
    const sponsorInfo = {
        id: bill.sponsor_id,
        first_name: sponsorFirstName,
        last_name: sponsorLastName,
        party: bill.sponsor_party,
        state: bill.sponsor_state
    }

    const handleHide = () => {
        setShowFullTitle(false);
        setHide(true);
    }

    const handleShow = () => {
        setHide(false);
    }

    const equalTitleLength = bill.title === bill.short_title;

    return (
        <div className="recentBillCard">
            <div className="cardHeading">
                <div className="cardTitleDiv">
                    <p>{bill.number} {(showFullTitle) ? bill.title : bill.short_title} {(!equalTitleLength) && <span style={{color: 'red'}} onClick={() => setShowFullTitle(!showFullTitle)}>{(showFullTitle) ? " (Less)" : " (More)" } </span>}</p>
                </div>
                <div>
                    <button>Bookmark</button>
                    <button>Hide</button>
                </div>    
            </div>
            <div className="sponsors">
                <div>
                    <p>Introduced on: {bill.introduced_date} </p>
                    <p>Sponsored By:</p>
                    <LegisSearchCard item={sponsorInfo} />
                </div>
                <div>
                    <p>Cosponsors by party</p>
                    <table>
                        <tbody>
                            <tr>
                                <th>D:</th>
                                <td>{(bill.cosponsors_by_party.D) ? bill.cosponsors_by_party.D : 0}</td>
                            </tr>
                            <tr>
                                <th>R:</th>
                                <td>{(bill.cosponsors_by_party.R) ? bill.cosponsors_by_party.R : 0}</td>
                            </tr>
                            <tr>
                                <th>I:</th>
                                <td>{(bill.cosponsors_by_party.I) ? bill.cosponsors_by_party.I : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            <div>
                {(bill.summary) ? bill.summary : <p style={{color: 'red'}}>No bill summary found in database.</p>}
            </div>
            <div>
                {(bill.votes.length > 0) ?
                    <button onClick={() => {setShowVotes(!showVotes)}}>{(showVotes) ? "Hide Votes" : "Show Votes"}</button> :
                    <p style={{color: 'red'}}>Bill does not currently have any votes.</p>}
                {(showVotes) && <VoteList votes={bill.votes} />}
            </div>
        </div>
    )
}
