import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setByTrackedSubjects, setTrackedSubjectBills, setAllSubjectBills, } from '../../redux/billsSlice';
import axios from 'axios';
import RecentBillCard from './RecentBillCard';
import './RecentBills.css';
import BeatLoader from 'react-spinners/BeatLoader';

export default function RecentBills() {
    const dispatch = useDispatch();
    const byTrackedSubjects = useSelector(state => state.bills.byTrackedSubjects);
    const trackedSubjectBills = useSelector(state => state.bills.trackedSubjectBills);
    const allSubjectBills = useSelector(state => state.bills.allSubjectBills);
    const [loading, setLoading] = useState(false);
    const trackedSubjects = useSelector(state => state.interests.subjects);

    let currentBillSet = (byTrackedSubjects) ? trackedSubjectBills : allSubjectBills;

    useEffect(() => {
        if (currentBillSet.length === 0) {
            fetchRecentBills();
        }
    }, []);

    const fetchEndpoint = (byTrackedSubjects) ? 'billsByTrackedSubject' : 'recentBills';

    let trackedSubjectsQuery = '';
    for (let item of trackedSubjects) {
        if (item.includes(" ")) {
            item = `"${item}"`;
            console.log(item);
        }
        trackedSubjectsQuery = trackedSubjectsQuery + item + ' ';
    }

    console.log(trackedSubjectsQuery);

    
    const fetchRecentBills = () => {
        currentBillSet = (byTrackedSubjects) ? trackedSubjectBills : allSubjectBills;
        if (byTrackedSubjects === true) {
            dispatch(setTrackedSubjectBills([]));
        } else {
            dispatch(setAllSubjectBills([]));
        }      
        setLoading(true);
        axios({
            method: "GET",
            url: `http://localhost:4000/propublica/${fetchEndpoint}`,
            params: {query: trackedSubjectsQuery}
          }).then((res) => {
            console.log(res.data);
            const bills = res.data;
            return bills;
        }).then((res) => {
                setLoading(false);
                if (byTrackedSubjects === true) {
                    dispatch(setTrackedSubjectBills(res));
                } else {
                    dispatch(setAllSubjectBills(res));
                }      
        }).catch((err) => {
              console.log(err);
          }); 
    }
    
    const handleSetToggle = () => {
        dispatch(setByTrackedSubjects(!byTrackedSubjects));
        if (currentBillSet.length === 0) {
            fetchRecentBills();
        }
    }

    const recentBillDisplay = currentBillSet.map(bill => {
        return <RecentBillCard bill={bill} key={bill.bill_id} />
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
            <button onClick={handleSetToggle}>{(byTrackedSubjects) ? "All" : "By Tracked"}</button>
            <button onClick={fetchRecentBills} >Refresh</button>
            {(loading) ? <Loader /> : recentBillDisplay}
        </div>

    )
}