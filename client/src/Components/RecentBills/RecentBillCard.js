import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BillSponsorCard from './BillSponsorCard';
import RelevantSubjects from './RelevantSubjects';
import VoteList from './VoteList';
import { addBookmarkedBill, removeBookmarkedBill } from '../../redux/billsSlice';
import axios from 'axios';

export default function RecentBillCard({ bill }) {
    const dispatch = useDispatch();
    const bookmarkedBills = useSelector(state => state.bills.bookmarkedBills);
    const [hide, setHide] = useState(false);
    const [showFullTitle, setShowFullTitle] = useState(false);
    const [showVotes, setShowVotes] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const bookmarkedIds = bookmarkedBills.map(bill => {return bill.bill_id});
    const isBookmarked = bookmarkedIds.includes(bill.bill_id);


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

    const handleBookmark = () => {
        dispatch(addBookmarkedBill(bill));
        console.log('bill', bill)
        try {
            axios({
                method: "PATCH",
                data: {bill: bill},
                withCredentials: true,
                url: `http://localhost:4000/userData/bookmarkBill`
            }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err)
        }
    };

    const handleRemoveBookmark = () => {
        dispatch(removeBookmarkedBill(bill));
        try {
            axios({
                method: "DELETE",
                data: {bill: bill},
                withCredentials: true,
                url: `http://localhost:4000/userData/unbookmarkBill`
            }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err)
        }
    }

    const equalTitleLength = bill.title === bill.short_title;

    return (
        <div className="recentBillCard">
            <div className="cardHeading">
                <div className="cardTitleDiv">
                    <h3>{bill.number} {(showFullTitle) ? bill.title : bill.short_title} {(!equalTitleLength) && <span style={{color: 'red'}} onClick={() => setShowFullTitle(!showFullTitle)}>{(showFullTitle) ? " (Less)" : " (More)" } </span>}</h3>
                </div>
                <div className="headingButtons">
                    {(isBookmarked) ?
                    <button onClick={handleRemoveBookmark}>Remove Bookmark</button> :
                    <button onClick={handleBookmark}>Bookmark</button>
                    }
                    {(hide) ? <button onClick={handleShow}>Show</button> : <button onClick={handleHide}>Hide</button> }
                </div>    
            </div>

            <div style={(hide) ? {display: 'none'} : {display: 'block'}}>
                <p>Latest Major Action: {bill.latest_major_action_date} - {bill.latest_major_action}</p> 
                <p>Introduced on {bill.introduced_date}.</p>
                <div className="sponsors">
                    <div>
                        
                        <h4>Sponsor:</h4>
                        <BillSponsorCard item={sponsorInfo} />
                    </div>
                    <div style={{marginLeft: '10px'}}>
                        <h4>Cosponsors by Party:</h4>
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
                    <RelevantSubjects bill={bill} />    
                </div>
                
                <div>
                    {(bill.summary) ? <button onClick={() => {setShowSummary(!showSummary)}}>{(showSummary) ? "Hide Summary" : "Show Summary"}</button> : <span style={{color: 'red'}}>No bill summary found in database.</span>}
                    <div style={(showSummary) ? {display: 'block'} : {display: 'none'}}>
                        <p>{bill.summary}</p>
                    </div>
                </div>
                
                <div>
                    {(bill.votes.length > 0) ?
                        <button onClick={() => {setShowVotes(!showVotes)}}>{(showVotes) ? "Hide Votes" : "Show Votes"}</button> :
                        <p style={{color: 'red'}}>Bill does not currently have any votes.</p>}
                    {(showVotes) && <VoteList votes={bill.votes} />}
                </div>
            </div>       
        </div>
    )
}
